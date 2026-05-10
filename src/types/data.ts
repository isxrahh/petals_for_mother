

export interface GiftItem {
  id: number;
  title: string;
  price: number;
  icon: string;
}

export interface Memory {
  id: number;
  title: string;
  date: string;
  imageUrl: string;
}

const giftData: Record<Category, { description: string; items: GiftItem[] }> = {
  "The Nurturer": {
    description: "For the mom who always puts others first",
    items: [
      { id: 1, title: "Spa Day Package", price: 150, icon: "🧖‍♀️" },
      { id: 2, title: "Silk Robe & Slippers", price: 89, icon: "👘" },
      { id: 3, title: "Aromatherapy Set", price: 45, icon: "🕯️" },
      { id: 10, title: "Memory Foam Pillow", price: 65, icon: "☁️" },
      { id: 11, title: "Handheld Massager", price: 55, icon: "💆‍♀️" },
      { id: 12, title: "Luxury Bath Bombs", price: 30, icon: "🛁" },
    ],
  },
  "The Creative": {
    description: "For the mom with an artist's soul",
    items: [
      { id: 4, title: "Premium Pottery Kit", price: 75, icon: "🏺" },
      { id: 5, title: "Digital Art Tablet", price: 299, icon: "🎨" },
      { id: 13, title: "Calligraphy Set", price: 40, icon: "✒️" },
      { id: 14, title: "Instax Mini Camera", price: 85, icon: "📸" },
      { id: 15, title: "Knitting Essentials", price: 50, icon: "🧶" },
      { id: 16, title: "Jewelry Making Kit", price: 35, icon: "📿" },
    ],
  },
  "The Adventurer": {
    description: "For the mom who loves to explore",
    items: [
      { id: 6, title: "Weekend Getaway Voucher", price: 500, icon: "✈️" },
      { id: 7, title: "Outdoor Picnic Set", price: 120, icon: "🧺" },
      { id: 17, title: "Hydration Hiking Pack", price: 70, icon: "🎒" },
      { id: 18, title: "Portable Espresso Maker", price: 90, icon: "☕" },
      { id: 19, title: "National Parks Pass", price: 80, icon: "🏞️" },
      { id: 20, title: "Polarized Sunglasses", price: 110, icon: "🕶️" },
    ],
  },
  "The Homebody": {
    description: "For the mom who loves her sanctuary",
    items: [
      { id: 8, title: "Weighted Blanket", price: 110, icon: "🛌" },
      { id: 9, title: "Smart Garden Kit", price: 95, icon: "🪴" },
      { id: 21, title: "Gourmet Tea Sampler", price: 35, icon: "🍵" },
      { id: 22, title: "E-Reader Paperwhite", price: 130, icon: "📖" },
      { id: 23, title: "Scented Soy Candles", price: 25, icon: "✨" },
      { id: 24, title: "Plush Velvet Throw", price: 60, icon: "🛋️" },
    ],
  },
};

export default giftData; 


export const memories: Memory[] = [
  { id: 1, title: "Memory 1", date: "2026", imageUrl: "./images/image1.jpg" },
  { id: 2, title: "Memory 2", date: "2025", imageUrl: "./images/image2.png" },
  { id: 3, title: "Memory 3", date: "2025", imageUrl: "./images/image3.png" },
  { id: 4, title: "Memory 4", date: "2025", imageUrl: "./images/image4.jpg" },
  { id: 5, title: "Memory 5", date: "2023", imageUrl: "./images/image5.JPG" },
  { id: 6, title: "Memory 6", date: "2020", imageUrl: "./images/image6.png"},
  { id: 7, title: "Memory 7", date: "2012", imageUrl: "./images/image7.jpg" },
  { id: 8, title: "Memory 8", date: "2011", imageUrl: "./images/image8.jpg" },
  { id: 9, title: "Memory 9", date: "2010", imageUrl: "./images/image9.JPG" },
  { id: 10, title:"Memory 10", date: "2009", imageUrl:"./images/image10.jpg" },
];

export const STICKERS = [ "❤️", "🌸", "🌷", "💐", "🦋", "✨", "💝", "🌺", "🎀", "👑", "☀️", "🌈",];

export const FRAMES = [
  { name: "None", src: null },
  { name: "Floral Border 1", src: "./frames/frame1.webp" },
  { name: "Floral Border 2", src: "./frames/frame2.png" },
  { name: "Heart Frame", src: "./frames/frame5.png" },
  { name: "Classic Gold", src: "./frames/frame3.png" },
  { name: "Vintage Lace", src: "./frames/frame4.png" },
];
