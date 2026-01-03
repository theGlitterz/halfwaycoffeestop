export type MenuItem = {
  id: string;
  name: string;
  description?: string;
  image?: string;
  tags?: string[];
  available?: boolean;
};

export type MenuCategory = {
  id: string;
  title: string;
  subtitle?: string;
  heroImage?: string;
  items: MenuItem[];
};

export const MENU: MenuCategory[] = [
  {
    id: "coffee",
    title: "Coffee",
    subtitle: "Hot & iced classics",
    heroImage: "/menu/general-coffee.jpg",
    items: [
      { id: "double-espresso", name: "Double Espresso" },
      { id: "macchiato", name: "Macchiato" },
      { id: "cortado", name: "Cortado" },
      { id: "americano", name: "Americano" },
      { id: "short-americano", name: "Short Americano" },
      { id: "cappuccino", name: "Cappuccino" },
      { id: "flat-white", name: "Flat White" },
      { id: "latte", name: "Latte" },
      { id: "mocha", name: "Mocha" },
      { id: "chai-latte", name: "Chai Latte" },
      { id: "matcha-latte", name: "Matcha Latte" },
      { id: "tea", name: "Tea" },
      { id: "iced-coffee", name: "Iced Coffee" },
      { id: "hot-chocolate", name: "Hot Chocolate", tags: ["seasonal"] },
      { id: "kids-hot-chocolate", name: "Kids Hot Chocolate", tags: ["kids"] },
      { id: "babyccino", name: "Babyccino", tags: ["kids"] },
      { id: "puppuccino", name: "Puppuccino", tags: ["dog-friendly"] },

      // Add-ons / extras (no prices)
      { id: "syrup", name: "Syrup (add-on)", tags: ["add-on"] },
      { id: "alt-milk", name: "Alternative Milk (add-on)", tags: ["add-on"] },
      { id: "cream-marshmallow", name: "Cream & Marshmallow (add-on)", tags: ["add-on"] },
      { id: "nutella", name: "Nutella (add-on)", tags: ["add-on"] },
    ],
  },

  {
    id: "cold-drinks",
    title: "Cold Drinks",
    subtitle: "Chilled and refreshing",
    heroImage: "/menu/general-cold-drinks.jpg",
    items: [
      { id: "still-water", name: "Still Water" },
      { id: "sparkling-water", name: "Sparkling Water" },
      { id: "apple-juice", name: "Apple Juice" },
      { id: "orange-juice", name: "Orange Juice" },
      { id: "coke", name: "Coke" },
      { id: "coke-zero", name: "Coke Zero" },
      { id: "fanta", name: "Fanta" },
      { id: "seven-up", name: "Seven Up" },
      { id: "fruit-shoot", name: "Fruit Shoot" },
      { id: "lucozade", name: "Lucozade" },
      { id: "monster", name: "Monster" },
      { id: "vit-hit", name: "Vit Hit" },
    ],
  },

  {
    id: "food",
    title: "Food",
    subtitle: "Grab-and-go favourites",
    heroImage: "/menu/general-food.jpg",
    items: [
  {
    id: "sandwich",
    name: "Sandwich",
    description: "Freshly made • Ask for today’s fillings",
  },
  { id: "sausage-roll", name: "Sausage Roll", description: "Buttery pastry • Warm & satisfying" },
  { id: "breakfast-blaa", name: "Breakfast Blaa", description: "Sausage & bacon • Hearty bite" },
  { id: "overnight-oats", name: "Overnight Oats", description: "Chilled • Creamy & filling" },
  { id: "protein-ball", name: "Protein Ball", description: "Energy bite • Grab & go" },
  { id: "peanut-butter-cup", name: "Peanut Butter Cup", description: "Sweet & nutty • Treat-sized" },
  { id: "homemade-snickers", name: "Homemade Snickers", description: "Caramel-style • Chocolatey" },
  { id: "cinnamon-bun", name: "Cinnamon Bun", description: "Soft swirl • Cozy cinnamon" },
  { id: "croissant", name: "Croissant", description: "Flaky & buttery • Café classic" },
  { id: "fruit-scone", name: "Fruit Scone", description: "Lightly sweet • Classic bake" },
  { id: "cookies", name: "Cookies", description: "Baked daily • Sweet crunch" },
  { id: "brownie", name: "Brownie", description: "Rich chocolate • Fudgy centre" },
  { id: "caramel-square", name: "Caramel Square", description: "Caramel layer • Sweet bite" },
  { id: "rocky-road", name: "Rocky Road", description: "Chocolatey • Marshmallow-style treat" },
],

  },

  {
    id: "snacks",
    title: "Snacks",
    subtitle: "Quick bites",
    heroImage: "/menu/general-snacks.jpg",
    items: [
      { id: "protein-bar", name: "Protein Bar" },
      { id: "chocolate-bar", name: "Chocolate Bar" },
      { id: "crisps", name: "Crisps" },
      { id: "flapjack", name: "Flapjack" },
    ],
  },
];
