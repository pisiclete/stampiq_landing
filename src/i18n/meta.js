// Per-language SEO meta. Distinct from translations.json so we can tune
// title/description independently of in-page copy.
//
// Title is intentionally identical across all languages — "Keep Collecting
// Smarter" is the brand tagline and is never translated.

const TITLE = 'StampIQ — Keep Collecting Smarter';

export const META = {
  en: {
    title: TITLE,
    description: 'Scan, identify, and organize your stamps. SigiVision recognizes stamps from Switzerland, Germany, Austria, the Netherlands, Poland, and more in seconds.',
  },
  de: {
    title: TITLE,
    description: 'Scanne, erkenne und organisiere deine Briefmarken. SigiVision erkennt Marken aus der Schweiz, Deutschland, Österreich, den Niederlanden, Polen und mehr.',
  },
  fr: {
    title: TITLE,
    description: 'Scannez, identifiez et organisez vos timbres. SigiVision reconnaît les timbres de Suisse, Allemagne, Autriche, Pays-Bas, Pologne et plus en quelques secondes.',
  },
  it: {
    title: TITLE,
    description: 'Scansiona, identifica e organizza i francobolli. SigiVision riconosce francobolli di Svizzera, Germania, Austria, Paesi Bassi e Polonia in pochi secondi.',
  },
  nl: {
    title: TITLE,
    description: 'Scan, herken en organiseer je postzegels. SigiVision herkent zegels uit Zwitserland, Duitsland, Oostenrijk, Nederland, Polen en meer in seconden.',
  },
  pl: {
    title: TITLE,
    description: 'Skanuj, rozpoznawaj i organizuj znaczki. SigiVision rozpoznaje znaczki ze Szwajcarii, Niemiec, Austrii, Holandii, Polski i innych krajów w kilka sekund.',
  },

  cs: {
    title: TITLE,
    description: "Skenuj, identifikuj a uspořádej své známky. SigiVision rozpozná známky ze Švýcarska, Německa, Rakouska, Nizozemska, Polska i dalších zemí během pár sekund.",
  },
  sk: {
    title: TITLE,
    description: "Skenuj, identifikuj a usporiadaj známky. SigiVision rozpozná známky zo Švajčiarska, Nemecka, Rakúska, Holandska, Poľska a ďalších krajín za niekoľko sekúnd.",
  },
  ro: {
    title: TITLE,
    description: "Scanează, identifică și organizează timbrele. SigiVision recunoaște în câteva secunde timbre din Elveția, Germania, Austria, Țările de Jos, Polonia și altele.",
  },
  hu: {
    title: TITLE,
    description: "Szkenneld, azonosítsd és rendezd a bélyegeidet. A SigiVision másodpercek alatt felismeri a svájci, német, osztrák, holland, lengyel és más országok bélyegeit.",
  },
  da: {
    title: TITLE,
    description: "Scan, identificer og organiser dine frimærker. SigiVision genkender mærker fra Schweiz, Tyskland, Østrig, Nederlandene, Polen og flere lande på få sekunder.",
  },
};

export const metaFor = (lang) => META[lang] ?? META.en;
