// Get base URL from Vite
const base = import.meta.env.BASE_URL;

// ─── Chapter definitions (the Memory Tree) ─────────────────────────
// type: 'original' → uses the original Cover→Photos→Message→Valentine→Yes flow
// type: 'letter'   → a love letter with optional photos
// type: 'photos'   → a photo gallery with captions
// type: 'custom'   → fully custom JSX (defined in component)
// ────────────────────────────────────────────────────────────────────

export const chapters = [
    {
        id: 'chapter-1',
        chapterNumber: 1,
        title: 'Surpriza originală',
        emoji: '💝',
        teaser: 'Unde totul a început... prima surpriză făcută cu toată inima.',
        type: 'original',
        date: '2026-04-04',
        unlockDate: '2026-04-04',
        music: `${base}music.mp3`,
    },

];

// ─── Ambient lobby music ────────────────────────────────────────────
export const ambientMusic = `${base}ambient.mp3`;

// ─── Original surprise config (used by Chapter 1) ──────────────────
export const config = {
    // Your names
    herName: "Deniii ✨",
    myName: "Cătă",

    // Photos for the memory grid
    photos: [
        {
            src: `${base}photos/1.jpg`,
            label: "Fețe nostime 😜",
            caption: "Când suntem nebuni împreună",
            note: "Asta suntem noi - doi nebuni care nu se iau prea în serios. Îmi place că pot fi eu însumi cu tine, că putem face fețe prostești și să râdem de orice."
        },
        {
            src: `${base}photos/2.jpg`,
            label: "Răsărit la mare 🌅",
            caption: "Noaptea nebună din Vama",
            note: "Nu am dormit toată noaptea. Am plecat să ne distrăm în Costinești, și după ne-am întors în Vama să prindem răsăritul împreună. A fost magic - tu, eu, marea și soarele care răsărea. Una din cele mai frumoase amintiri."
        },
        {
            src: `${base}photos/3.jpg`,
            label: "Seară specială ✨",
            caption: "Când am strălucit împreună",
            note: "Erai atât de frumoasă în seara aia. Mă simțeam cel mai norocos că eram lângă tine. Fiecare moment cu tine e ca o petrecere."
        },
        {
            src: `${base}photos/4.jpg`,
            label: "Aproape 🥰",
            caption: "Cel mai bun loc din lume",
            note: "Așa se simte acasă pentru mine - aproape de tine, unul lângă celălalt. Nu am nevoie de nimic altceva în lume când ești lângă mine."
        },
        {
            src: `${base}photos/5.jpg`,
            label: "Surpriză 💐",
            caption: "Flori pentru suflețelul meu",
            note: "Îmi place să te surprind, să văd zâmbetul ăla pe fața ta. Meriți toate florile din lume și mai multe."
        },
        {
            src: `${base}photos/6.jpg`,
            label: "Noi doi 💕",
            caption: "Împreună, mereu",
            note: "Nu contează unde suntem sau ce facem. Important e că suntem împreună. Tu și eu, asta e tot ce contează."
        }
    ],

    // 10 reasons for the secret screen
    reasons: [
        "Felul în care zâmbești și râzi",
        "Căldura ochilor tăi în care mă pierd",
        "Iubirea pe care mi-o oferi și care mă face să mă simt iubit",
        "Blândețea din vocea ta când ești somnoroasă",
        "Cum faci ca și o zi plictisitoare să pară o aventură",
        "Răbdarea ta cu mine, mereu",
        "Felul în care îmi ții mâna fără să te gândești",
        "Glumele tale care mă fac să râd și să uit de toate",
        "Cât de în siguranță mă simt când sunt cu tine. Ești locul meu pe care am ajuns să îl numesc 'acasă'",
        "Pur și simplu pentru că ești tu, și să fii tu e de ajuns. Mai mult decât de ajuns."
    ],

    mainMessage: `
      <p>Vreau să știi ceva important, ceva de care am nevoie să auzi cu adevărat:</p>
      <p><strong>Poți să-ți iei tot timpul de care ai nevoie.</strong></p>
      <p>Nu există grabă aici. Nicio presiune. Nicio numărătoare inversă. Doar tu, mergând în ritmul tău, în timpul tău.</p>
      <p>Te iubesc enorm de mult suflețel, și această iubire nu merge nicăieri. E răbdătoare. E blândă. Așteaptă.</p>
      <p>Nu plec nicăieri. Voi fi chiar aici, iubindu-te în liniște, încurajându-te, crezând în tine chiar și atunci când tu uiți să crezi în tine.</p>
      <p>Sunt atât de mândru de tine, de 'domnișorika' minunată care ai devenit. Ai trecut prin atâtea și totuși ești aici, puternică, frumoasă, iubitoare. Meriți tot respectul și toată admirația din lume. Te iubesc enorm de mult suflețel. 💗</p>
  `,

    yesMessage: "Mă bucur enorm că ți-a plăcut mini-surpriza mea! Zâmbetul tău e tot ce îmi doresc. Te iubesc mult, suflețelul meu. 💕"
};
