# StampIQ translation guide

This guide covers every StampIQ text that exists in more than one language: the landing site and legal pages (`src/i18n/translations.json`, `src/i18n/translations-legal.json`), the Flutter app, store listings, newsletters and transactional emails. It records the rules and the per-language decisions that came out of the September 2026 native-speaker review of all ten non-English languages (RO, CS, SK, HU, DA, PL, NL, IT, FR, DE).

The review found the same failure in every language: text that is grammatical and correct in the dictionary but that no native writer would produce, because it follows the English word by word. Example: Romanian „Anunță-mă când ajunge StampIQ” is correct Romanian, but „ajunge” is the English "arrives"; a Romanian writes „Anunță-mă când StampIQ devine disponibil”. A second, less frequent failure was meaning drift: a rewrite that sounds native but drops or changes a fact. Both have to be checked for, separately.

## 1. Principles

1. Write the text as a native copywriter or legal drafter would write it for this purpose. Do not translate sentence by sentence. The English is a specification of what to say, never of how to say it.
2. Grammatical correctness is not enough. A string passes only if a native writer would have chosen these words.
3. Keep the meaning exactly. Every fact, number, limit, condition, feature, country and tier in the English must be in the translation, and nothing may be added. Enumerations are checked item by item.
4. Do not invent slogans. A marketing line is rewritten into natural language with the same message; it does not get a new idea (rejected in review: IT „L'app che un collezionista avrebbe voluto avere”, FR „L'app qu'un collectionneur aurait voulu avoir” for "Built by collectors, for collectors").
5. No idioms from other domains unless the English text already implies them, and none from sports („à domicile”, „Heimspiel” were removed).
6. One term per concept per language, across site, app, legal pages and emails. When a term is decided, it goes into the tables in section 4 and is used everywhere.

## 2. Writing the English source

Most translation defects start in the English. Rules for anyone writing new English strings:

- Give every string context. The `section/location` field must say where the text appears and what kind of element it is ("Waitlist page – main heading", "Pricing card – CTA button"). In the Flutter ARB files use the `@key` `description` for the same purpose. The reviewers work from this field only; without it they guess.
- Avoid idioms and marketing formulas that do not exist in other languages: "meet us in person", "built by X, for X", "a better way", "building the future", "powered by", "on home ground", "check back soon", "whichever comes first", "including but not limited to", "represent and warrant". If the English needs one, the translator is told to rewrite it, but plain English is cheaper.
- Do not build sentences from fragments (a sentence split across two keys, or a key that is completed by a link in another key). Word order differs between languages.
- Placeholders (`{platform}`, `{count}`) must be usable in every language. Hungarian cannot attach a suffix to a placeholder and Slovak cannot decline it, so the translator phrases around it („v službe {platform}”). Counts use ICU plural syntax; never "1 scan(s)".
- Legal English must be internally consistent before it is translated. Two known contradictions are still in the English and therefore in every language: the ODR clause (`terms.s15_3_p1`) and consent versus legitimate interest for scan images (`privacy.s4_1_p2` against `privacy.s4_table`).
- Feature names are fixed in the English and listed in section 4. Do not rename a feature in one string ("Personal Collection History" versus a description that talks about scans caused a mismatch in German).

## 3. Rules that apply to every language

### Product and brand

- Product names stay as they are: StampIQ, SigiVision, SigiSpot, Sigi, App Store, Google Play, Premium, Professional, ™.
- The tagline "Keep collecting smarter" is English in every language on purpose.
- Official store badge wording is Apple's and Google's, not ours; do not edit it.
- Quoted press titles stay in the original language as printed. A press title that is itself a translation (for example the Polish Filatelista headline shown in other languages) may be translated, and keeps its original noun („compagno”, „Begleiter”, „metgezel”), with only typography fixed.
- Developer terms stay in English in every language: "stack trace", "breadcrumbs", "SDK". Calques such as „ślad stosu”, „traces de pile”, „tracce delle azioni” are wrong.

### Concepts with a fixed translation

| English | Rule |
|---|---|
| companion / digital companion | the language's word for "assistant" (see section 4); never the word for "companion" |
| match (recognition result) | the language's word for "result"; never "match", „Treffer”, „corrispondenza”, „correspondance” |
| Free (tier) | a native word for free version/plan; never the English word "Free" |
| plan (tier) | the native term (see section 4); several languages do not use "plan" |
| collection insights | "collection analyses" in the native form (section 4); never "insights"/„Einblicke”/„approfondimenti” |
| proprietary | "own / self-developed" unless the language has an established native use (FR „propriétaire” is fine; PL „zastrzeżony”, CS „proprietární”, NL „propriëtair” are not) |
| waitlist: "when StampIQ arrives" | always "when StampIQ becomes available"; never the verb "arrive/come" |
| FAQ in headings | native phrase (section 4); short nav/footer links may keep "FAQ" where that is normal |
| locale | language and region, both; never only "language" |
| variations (stamps) | the philatelic term for variants in that language |
| bulk scan | one fixed name per language, used on pricing, FAQ, legal and press text alike |

### Status texts

Headings shown while something loads (`promo.title`, `promoSub.title`) describe what is happening. They are not commands to the visitor.

### Form of address

The site, app and emails address the user informally in every language that has the distinction. The legal pages use the formal or third-person form listed in section 4. A string that mixes forms is a defect; this was the most frequent single error (Italian legal text mixed „voi”, „tu” and „l'utente”; Czech, French and Italian site strings had leftover formal forms).

## 4. Per-language decisions

### Address and core product terms

| Lang | Site/app address | Legal address | Assistant | Tier word | Free tier | FAQ heading |
|---|---|---|---|---|---|---|
| DE | du | Sie | Assistent | Tarif / Abo (never „Plan”) | Gratis / kostenlose Version | Häufige Fragen |
| FR | tu | vous | assistant | formule / abonnement | formule gratuite | Questions fréquentes |
| IT | tu | l'Utente (third person, capitalised) | assistente | piano / abbonamento | piano gratuito / Gratis | Domande frequenti |
| NL | je/jij | u | assistent | abonnement | gratis versie / Gratis | Veelgestelde vragen |
| PL | ty | Użytkownik (third person, capitalised) | asystent | plan | plan darmowy | Najczęściej zadawane pytania |
| RO | tu | dumneavoastră | asistent | abonament | abonament gratuit | FAQ |
| CS | ty | vy | asistent | předplatné (never „plán”) | bezplatná verze / zdarma | Časté dotazy |
| SK | ty | vy | asistent | predplatné (never „plán”) | bezplatná verzia / zadarmo | Časté otázky |
| HU | te | Ön | asszisztens | csomag | ingyenes csomag | GYIK |
| DA | du | du | assistent | abonnement (never „plan”) | gratisversionen / Gratis | Ofte stillede spørgsmål |

### Terms used in legal text

| Lang | Privacy page | Terms page | Collection insights | Cancel subscription / close account |
|---|---|---|---|---|
| DE | Datenschutzerklärung | Nutzungsbedingungen | Sammlungsanalysen | kündigen / Konto schließen, sperren, löschen |
| FR | Politique de confidentialité | Conditions d'utilisation | analyses de la collection | résilier / clôturer le compte |
| IT | Informativa sulla privacy | Termini di servizio | analisi della collezione | disdire (disdetta) / chiudere l'account; „cancellazione” only for GDPR erasure |
| NL | Privacybeleid | Gebruiksvoorwaarden | inzichten in de verzameling (native Dutch, kept on purpose) | opzeggen / account beëindigen |
| PL | Polityka prywatności | Regulamin | analizy kolekcji | anulować subskrypcję / zamknąć konto |
| RO | Politica de confidențialitate | Termeni și condiții | analize ale colecției | anula abonamentul / închide contul |
| CS | Zásady ochrany osobních údajů | Podmínky používání | analýzy sbírky | zrušit předplatné / zrušit účet |
| SK | Zásady ochrany osobných údajov | Podmienky používania | analýzy zbierky | zrušiť predplatné / zrušiť účet |
| HU | Adatvédelmi tájékoztató | Általános Szerződési Feltételek (ÁSZF) | gyűjteményelemzések | előfizetés felmondása / fiók megszüntetése |
| DA | Privatlivspolitik | Brugervilkår | samlingsanalyser | opsige / lukke kontoen |

### GDPR citations and authorities

Use the official GDPR terminology of each language (controller, processor, data subject, legitimate interest, legal basis, portability, restriction, erasure, rectification, standard contractual clauses) exactly as in the official translation of Regulation (EU) 2016/679. Never cite "Art. 6(1)(b)".

| Lang | Citation form | Swiss law / authority | Local authority example |
|---|---|---|---|
| DE | Art. 6 Abs. 1 lit. b DSGVO | DSG / EDÖB | Datenschutzaufsichtsbehörde des Bundeslandes (DE), Datenschutzbehörde (AT) |
| FR | art. 6, par. 1, point b), RGPD | LPD / PFPDT | la CNIL (France) |
| IT | art. 6, par. 1, lett. b), GDPR | nLPD / IFPDT | Garante per la protezione dei dati personali |
| NL | artikel 6, lid 1, onder b, AVG | nDSG / EDÖB/PFPDT | Autoriteit Persoonsgegevens (AP) |
| PL | art. 6 ust. 1 lit. b RODO | nDSG / EDÖB/PFPDT | Prezes UODO |
| RO | art. 6 alin. (1) lit. b) | nDSG / PFPDT/EDÖB | ANSPDCP |
| CS | čl. 6 odst. 1 písm. b) | nDSG / EDÖB/PFPDT | ÚOOÚ |
| SK | čl. 6 ods. 1 písm. b) | nDSG / EDÖB/PFPDT | Úrad na ochranu osobných údajov SR |
| HU | 6. cikk (1) bekezdés b) pont | nDSG / EDÖB/PFPDT | NAIH |
| DA | artikel 6, stk. 1, litra b | nDSG / EDÖB/PFPDT | Datatilsynet |

The local authority is always given as an example after the general reference to the authority of the user's country. Write "your country", not "your member state": EEA states such as Norway are not EU member states.

### Typography

| Lang | Dash | Quotes | 30,000 | Percent | Under one second | Other |
|---|---|---|---|---|---|---|
| DE | ` – ` | „…“ | 30.000+ | 98 % | < 1 s | standard „ß“, no Swiss „ss“ |
| FR | ` – ` | « … » with non-breaking spaces | 30 000+ | 98 % | < 1 s | non-breaking space before : ; ? ! |
| IT | ` – ` | "…" | 30.000+ | 98% | < 1 s | |
| NL | ` – ` | „…” | 30.000+ | 98% | < 1 s | compounds written as one word |
| PL | ` – ` | „…” | 30 000+ | 98% | < 1 s | |
| RO | ` — ` | „…” | 30.000+ | 98% | < 1 s | ș/ț with comma below; spaced em dash (linie de pauză) throughout |
| CS | ` – ` | „…“ | 30 000+ | 98 % | < 1 s | |
| SK | ` – ` | „…“ | 30 000+ | 98 % (noun), 98-percentný (adjective) | < 1 s | |
| HU | ` – ` | „…” | 30 000+ | 98% | < 1 mp | no suffix on placeholders |
| DA | ` – ` | «…» | 30.000+ | 98 % | < 1 sek. | |

The em dash „—” is used only in Romanian, where the spaced em dash is the established pause dash; every other language uses the spaced en dash.

## 5. Legal text

- The legal pages are reviewed by a reviewer briefed as a native legal drafter of that jurisdiction, who knows the official GDPR text in that language and the local civil and consumer law.
- Common-law formulas are replaced by the established civil-law term, never translated word by word: "represent and warrant" (keep it a warranty, e.g. DE „zusichern“, FR „déclarer et garantir“), "indemnify and hold harmless" (DE „freistellen“, FR „garantir et indemniser“, IT „manlevare“), "as is" (FR „en l'état“, IT „nello stato in cui si trova“), "including but not limited to" (DE „insbesondere“, FR „notamment“), "whichever comes first" (restructure as "the first of the following events"), "survives termination", "fraudulent misrepresentation" (FR „dol“, DE „arglistige Täuschung“), "royalty-free" (DE „unentgeltlich“, never „lizenzfrei“).
- Three different actions get three different verbs in every language: cancelling a subscription, closing or deleting an account, and GDPR erasure of data. Mixing them changes the legal meaning.
- The withdrawal clause (`terms.s5_6_p3`, "if you have not yet accessed any paid features") means the user has not yet used a paid feature. A rendering that can be read as "does not yet have access" voids the right of withdrawal, because a paying subscriber always has access. Use the verb for "used/opened", never "accessed/got access".
- Where one clause refers to the same concept as another (the two warranty clauses `terms.s2_p2` and `terms.s7_4_p1`, the Swiss authority in privacy and terms), the wording must be identical.
- Place names: the operator address keeps "Zug". The jurisdiction clause may use the local name (FR „canton de Zoug”, IT „Cantone di Zugo”).
- Content problems in the English (section 2) are decided in the English first and then carried into all languages. A translator never fixes a legal problem in one language only.

## 6. Lists

Legal lists are rendered from arrays in `src/components/legal/Privacy.jsx`, `Terms.jsx` and `DeleteAccount.jsx`. For every list introduced by a lead-in ending in a colon:

- Each item continues the lead-in grammatically. After "you must not:" every item is an infinitive; after "if:" every item is a subordinate clause with the verb in the right position (German: verb last).
- The first letter is lowercase unless the word is a proper noun, a defined term, a capitalised pronoun of address (DE „Sie/Ihr“, HU „Ön“) or a German noun. Dutch „u/uw“ is always lowercase.
- Items end with „;”; the last item and any item containing more than one sentence end with „.”. French puts a non-breaking space before „;”.
- A bold label (`<strong>Label:</strong> text`) is followed by lowercase text under the same rule.

The per-language list-style scripts used in the review are the reference implementation: group items by render order in the components (the file order differs), then apply the rules above. The German script lowercases only function words, because a generic rule would lowercase nouns.

## 7. Process for a new language or a new batch of strings

1. Write or update the English with context for every string (section 2).
2. Add the language to the tables in section 4 before any text is written: form of address for app and legal, the fixed terms, the citation form, the local authority, typography. Decide these with a native speaker once; afterwards they are not re-debated per string.
3. Produce the first draft (human or machine) from the English and the tables.
4. Native review without the English. The reviewer gets each string with its `section/location` and the target text only, no English, so that English word order cannot leak in. The brief contains the product description, the tables, a calibration example of a calque that must be caught (the waitlist heading works in every language), and the method: for every string write your own version first, then compare, then give a verdict with a one-line reason. Every string gets a verdict; batches of about 50 strings.
5. Apply changes mechanically with checks: the current text in the result must equal the file, and HTML tags, placeholders, email addresses and ™ must be unchanged.
6. Consistency pass over the whole language at once: form of address, document names, cross-references to section numbers, the fixed terms, citations, dashes, quotes, agreement errors. Batch reviewers diverge from each other; this step brings them back together.
7. Meaning check against the English, string by string, by a reviewer who sees English, old and new text. Enumerations are compared word by word. Only real differences are fixed: facts, numbers, conditions, scope, obligations, dropped or added items, wrong feature terms, grammar errors.
8. List style (section 6) and typography normalisation.
9. Build and verify: the build succeeds, and the diff against the last commit touches only the target language field.
10. A native speaker reads the rendered pages on a phone before release. The automated review caught most defects but missed some that a person noticed at once (the Romanian waitlist heading).
11. One commit per language.

For the Flutter app the same steps apply to the ARB files, with three additions: UI strings have length limits (buttons, tab labels, badges), so the reviewer needs the maximum length or a screenshot; plurals and gender use ICU syntax and must be complete for the language's plural categories (PL, CS, SK, RO have more than two); and strings shared between app and site use the same wording.

## 8. Checklist before shipping a language

- [ ] Section 4 tables have a row for the language.
- [ ] One form of address on site/app, one on legal pages, no mixing.
- [ ] Waitlist heading says "becomes available".
- [ ] No "companion", "match", "Free", "insights" calques; bulk scan has one name.
- [ ] Withdrawal clause uses "used", not "accessed".
- [ ] Both warranty clauses use the same verb and keep the warranty.
- [ ] "locale" includes region; "variations" uses the philatelic term.
- [ ] Citations in national form; local authority named as an example after "your country".
- [ ] Dash, quotes, number and percent formats as in section 4.
- [ ] List items follow section 6.
- [ ] Build passes; diff touches only this language.
- [ ] A native speaker has read the rendered pages.
