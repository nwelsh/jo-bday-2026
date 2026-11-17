
export type Puzzle = {
  id: string;
  title: string;
  subtitle: string;
  words: string[];
};

export const puzzles: Puzzle[] = [
  {
    id: "jo",
    title: "Jo Specific",
    subtitle: "These are Jo things",
    words: [
      "RUNNING",
      "MATCHA",
      "THRIFT",
      "ART",
      "READING",
      "DANCE",
      "PANDA",
      "KOALA",
    ],
  },
  {
    id: "people",
    title: "People",
    subtitle: "People you know",
    words: [
      "NICOLE",
      "MEGHAN",
      "MAIA",
      "MADDY",
      "BRIDGET",
      "SAMI",
      "JORDYN",
      "PAYTON",
    ],
  },
  {
    id: "birthday",
    title: "Birthday",
    subtitle: "Birthday party",
    words: [
      "CANDLE",
      "CAKE",
      "BALLOON",
      "GIFT",
      "CANDY",
      "PARTY",
      "CUPCAKE",
      "PRESENT",
    ],
  },
  {
    id: "flowers",
    title: "Flowers",
    subtitle: "Flowers for my flower",
    words: [
      "ROSE",
      "TULIP",
      "DAISY",
      "POPPY",
      "LILAC",
      "VIOLET",
      "PETAL",
      "ORCHID",
    ],
  },
];
