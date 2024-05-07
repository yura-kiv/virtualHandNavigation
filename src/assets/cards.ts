export type Card = {
  id: number;
  img: string;
  title: string;
  description: string;
  additionalInfo: {
    category: string;
    date: string;
  };
};

export const cards: Card[] = [
  {
    id: 1,
    img: "/imgs/cards/card1.jpg",
    title: "Card 1",
    description: "This is the description for card 1.",
    additionalInfo: {
      category: "Category 1",
      date: "05/01/2024",
    },
  },
  {
    id: 2,
    img: "/imgs/cards/card2.jpg",
    title: "Card 2",
    description: "This is the description for card 2.",
    additionalInfo: {
      category: "Category 2",
      date: "05/02/2024",
    },
  },
  {
    id: 3,
    img: "/imgs/cards/card3.jpg",
    title: "Card 3",
    description: "This is the description for card 3.",
    additionalInfo: {
      category: "Category 1",
      date: "05/03/2024",
    },
  },
  {
    id: 4,
    img: "/imgs/cards/card4.jpg",
    title: "Card 4",
    description: "This is the description for card 4.",
    additionalInfo: {
      category: "Category 2",
      date: "05/04/2024",
    },
  },
  {
    id: 5,
    img: "/imgs/cards/card5.jpg",
    title: "Card 5",
    description: "This is the description for card 5.",
    additionalInfo: {
      category: "Category 1",
      date: "05/05/2024",
    },
  },
  {
    id: 6,
    img: "/imgs/cards/card6.jpg",
    title: "Card 6",
    description: "This is the description for card 6.",
    additionalInfo: {
      category: "Category 2",
      date: "05/06/2024",
    },
  },
  {
    id: 7,
    img: "/imgs/cards/card7.jpg",
    title: "Card 7",
    description: "This is the description for card 7.",
    additionalInfo: {
      category: "Category 1",
      date: "05/07/2024",
    },
  },
  {
    id: 8,
    img: "/imgs/cards/card8.jpg",
    title: "Card 8",
    description: "This is the description for card 8.",
    additionalInfo: {
      category: "Category 2",
      date: "05/08/2024",
    },
  },
];
