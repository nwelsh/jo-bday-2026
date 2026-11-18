
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
      "FASHION",
      "LOVE",
    ],
  },
  {
    id: "friends",
    title: "Friends",
    subtitle: "Our friends",
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
    id: "partiful",
    title: "People on your Partiful",
    subtitle: "These are the girlies on your bday partiful",
    words: [
      "ESSENCE",
      "JESSENIA",
      "SARAH",
      "MICAYLA",
      "MARIA",
      "MADDY",
      "SAMI",
      "MEG",
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
  {
    id: "artists",
    title: "Artists",
    subtitle: "Art history for you!",
    words: [
      "KAHLO",
      "OKEEFFE",
      "MONET ",
      "DEGAS",
      "DALI",
      "MATISSE",
      "POLLOCK",
      "WARHOL",
    ],
  },
];
