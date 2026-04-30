#!/usr/bin/env node
// Codemod: convert <El data-i18n="key">text</El> → <El dangerouslySetInnerHTML={{__html: t('key')}}/>
// Handles both string-literal keys and JSXExpressionContainer keys.
// Translations may contain HTML (<sup>, <a>), so dangerouslySetInnerHTML is the
// uniform replacement — matches the legacy `el.innerHTML = value` semantics.

import { parse } from '@babel/parser';
import _traverse from '@babel/traverse';
import _generate from '@babel/generator';
import * as t from '@babel/types';
import fs from 'node:fs';
import path from 'node:path';

const traverse = _traverse.default ?? _traverse;
const generate = _generate.default ?? _generate;

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error('Usage: codemod-i18n.mjs <file.jsx> [file2.jsx ...]');
  process.exit(1);
}

let totalReplacements = 0;

for (const file of args) {
  const code = fs.readFileSync(file, 'utf8');
  const ast = parse(code, { sourceType: 'module', plugins: ['jsx'] });
  let count = 0;

  traverse(ast, {
    JSXOpeningElement(path) {
      const attrs = path.node.attributes;
      const i18nIdx = attrs.findIndex(
        a => a.type === 'JSXAttribute' && a.name.name === 'data-i18n'
      );
      if (i18nIdx === -1) return;

      const i18nAttr = attrs[i18nIdx];

      // Extract the key as an expression
      let keyExpr;
      if (i18nAttr.value.type === 'StringLiteral') {
        keyExpr = t.stringLiteral(i18nAttr.value.value);
      } else if (i18nAttr.value.type === 'JSXExpressionContainer') {
        keyExpr = i18nAttr.value.expression;
      } else {
        return;
      }

      // Build {__html: t(key)} object expression
      const tCall = t.callExpression(t.identifier('t'), [keyExpr]);
      const objExpr = t.objectExpression([
        t.objectProperty(t.identifier('__html'), tCall),
      ]);
      const newAttr = t.jsxAttribute(
        t.jsxIdentifier('dangerouslySetInnerHTML'),
        t.jsxExpressionContainer(objExpr)
      );

      // Remove data-i18n, add dangerouslySetInnerHTML
      attrs.splice(i18nIdx, 1, newAttr);

      // Make the element self-closing and clear children
      path.node.selfClosing = true;
      const parentEl = path.parentPath.node;
      if (parentEl && parentEl.type === 'JSXElement') {
        parentEl.children = [];
        parentEl.closingElement = null;
      }
      count++;
    },
  });

  if (count === 0) {
    console.log(`  ${path.basename(file)}: no data-i18n found`);
    continue;
  }

  const output = generate(ast, {
    retainLines: false,
    jsescOption: { quotes: 'single' },
  }).code;

  fs.writeFileSync(file, output);
  console.log(`  ${path.basename(file)}: ${count} replacements`);
  totalReplacements += count;
}

console.log(`\nTotal: ${totalReplacements} replacements across ${args.length} file(s)`);
