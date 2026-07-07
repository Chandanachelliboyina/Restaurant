import crispycornImage from "@/assets/premium_photo-1680118540055-aa9f6ce1d93d.avif";

const harabharakebabImage = "/istockphoto-1024552618-612x612.jpg";

export type Category =
  | "Starters"
  | "Soups"
  | "Pizza"
  | "Burgers"
  | "Biryani"
  | "Chinese"
  | "South Indian"
  | "North Indian"
  | "Desserts"
  | "Beverages"
  | "Ice Cream";

export const CATEGORIES: Category[] = [
  "Starters",
  "Soups",
  "Pizza",
  "Burgers",
  "Biryani",
  "Chinese",
  "South Indian",
  "North Indian",
  "Desserts",
  "Beverages",
  "Ice Cream",
];

export interface Dish {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  rating: number;
  calories: number;
  cookTime: number; // minutes
  category: Category;
  ingredients: string[];
  veg: boolean;
  popular?: boolean;
}

// Curated stable Unsplash photo IDs by cuisine
const IMG = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=800&q=80`;

// Public-hosted asset paths (ensure files exist under `public/assets` before deploy)
const IMAGES = {
  paneertikka: IMG("1666001120694-3ebe8fd207be"),
  crispycorn: crispycornImage,
  harabharakebab: harabharakebabImage
};

type Seed = {
  name: string;
  desc: string;
  price: number;
  veg: boolean;
  img: string;
  rating?: number;
};

const SEEDS: Record<Category, Seed[]> = {
  Starters: [
    { name: "Paneer Tikka", desc: "Charred paneer marinated in yogurt, ginger and warm spices.", price: 12, veg: true, img: IMG("1666001120694-3ebe8fd207be") },
    { name: "Crispy Corn Kernels", desc: "Golden fried corn tossed with bell peppers and chilli.", price: 9, veg: true, img: crispycornImage },
    { name: "Chicken Tikka", desc: "Tandoori boneless chicken chunks with smoked cumin butter.", price: 14, veg: false, img: IMG("1599487488170-d11ec9c172f0") },
    { name: "Hara Bhara Kebab", desc: "Spinach, peas & potato patties dusted with rock salt.", price: 10, veg: true, img: IMAGES.harabharakebab},
    { name: "Fish Amritsari", desc: "Ajwain-battered basa fillets fried till crisp.", price: 15, veg: false, img: IMG("1599487488170-d11ec9c172f0")  },
    { name: "Mushroom Galouti", desc: "Melt-in-mouth spiced mushroom patties on mini rumali.", price: 13, veg: true, img: IMG("1599487488170-d11ec9c172f0")  },
    { name: "Prawn Koliwada", desc: "Battered prawns with curry-leaf mayo.", price: 17, veg: false, img: IMG("1565557623262-b51c2513a641") },
    { name: "Veg Spring Rolls", desc: "Crisp rolls of cabbage, carrot and glass noodles.", price: 9, veg: true, img: IMG("1599487488170-d11ec9c172f0")},
    { name: "Chilli Paneer Dry", desc: "Indo-Chinese paneer with bell peppers in soy glaze.", price: 12, veg: true, img: IMG("1601050690597-df056fb49785") },
    { name: "Chicken 65", desc: "Fiery Chettinad-spiced fried chicken with curry leaves.", price: 14, veg: false, img: IMG("1626132647523-66f5bf380027") },
    { name: "Aloo Tikki Chaat", desc: "Potato patties layered with chutneys and yogurt.", price: 8, veg: true, img: IMG("1589301760014-d929f3979dbc") },
    { name: "Tandoori Broccoli", desc: "Charred broccoli in a hung-curd marinade.", price: 11, veg: true, img: IMG("1624462966581-bc6d768cbce5") },
  ],
  Soups: [
    { name: "Sweet Corn Veg Soup", desc: "Silky corn broth with garden vegetables.", price: 7, veg: true, img: IMG("1547592165-f1ddec4ee938") },
    { name: "Manchow Soup", desc: "Peppery Indo-Chinese broth with crispy noodles.", price: 8, veg: true, img: IMG("1541832676-9b763b0239ab") },
    { name: "Hot & Sour Chicken", desc: "Tangy-spicy broth with tender chicken shreds.", price: 9, veg: false, img: IMG("1607532941433-304659e8198a") },
    { name: "Lemon Coriander", desc: "Bright lemon-scented broth with fine vegetables.", price: 8, veg: true, img: IMG("1547592180-85f173663754") },
    { name: "Wonton Soup", desc: "Chicken wontons in a delicate ginger broth.", price: 10, veg: false, img: IMG("1534422298391-e4f8c172dddb") },
    { name: "Mulligatawny", desc: "South Indian lentil soup with curry leaves.", price: 8, veg: true, img: IMG("1603046891744-1f76eb10aec1") },
    { name: "Cream of Mushroom", desc: "Silky mushroom velouté finished with truffle oil.", price: 9, veg: true, img: IMG("1547592165-f1ddec4ee938") },
    { name: "Thukpa Noodle Soup", desc: "Himalayan hand-pulled noodles in aromatic broth.", price: 10, veg: false, img: IMG("1569718212165-3a8278d5f624") },
    { name: "Tom Yum Soup", desc: "Aromatic lemongrass broth with mushrooms, herbs and lime.", price: 9, veg: true, img: IMG("1534422298391-e4f8c172dddb") },
    { name: "Vegetable Clear Soup", desc: "Light broth with fresh vegetables and a delicate herbal finish.", price: 7, veg: true, img: IMG("1541832676-9b763b0239ab") },
  ],
  Pizza: [
    { name: "Margherita Classica", desc: "San Marzano tomato, fior di latte, basil.", price: 14, veg: true, img: IMG("1513104890138-7c749659a591") },
    { name: "Truffle Mushroom", desc: "Wild mushrooms, mozzarella and black truffle oil.", price: 19, veg: true, img: IMG("1574071318508-1cdbab80d002") },
    { name: "Diavola", desc: "Spicy salami, chilli oil and smoked mozzarella.", price: 17, veg: false, img: IMG("1628840042765-356cda07504e") },
    { name: "Quattro Formaggi", desc: "Mozzarella, gorgonzola, taleggio and parmigiano.", price: 18, veg: true, img: IMG("1593560708943-e12d7c570b4f") },
    { name: "BBQ Chicken", desc: "Slow-cooked chicken, red onion, cheddar and BBQ sauce.", price: 17, veg: false, img: IMG("1565298313-1ef546c186b5") },
    { name: "Pepperoni Reserve", desc: "Cup-and-char pepperoni over cookies and mozzarella.", price: 18, veg: false, img: IMG("1628840042765-356cda07504e") },
    { name: "Paneer Makhani Pizza", desc: "Tikka paneer, makhani sauce, red onions.", price: 16, veg: true, img: IMG("1513104890138-7c749659a591") },
    { name: "Pesto Verde", desc: "Basil pesto, cherry tomatoes, burrata.", price: 17, veg: true, img: IMG("1593560708943-e12d7c570b4f") },
    { name: "Meat Feast", desc: "Salami, sausage, ham and bacon over mozzarella.", price: 20, veg: false, img: IMG("1628840042765-356cda07504e") },
    { name: "Garden Fiesta", desc: "Roasted peppers, olives, artichoke hearts and mushrooms.", price: 15, veg: true, img: IMG("1593560708943-e12d7c570b4f") },
  ],
  Burgers: [
    { name: "Classic Cheeseburger", desc: "Aged beef patty, cheddar, lettuce, house sauce.", price: 13, veg: false, img: IMG("1568901346375-23c9450c58cd") },
    { name: "Double Smash", desc: "Twin smashed patties, American cheese, pickles.", price: 15, veg: false, img: IMG("1571091718767-18b5b1457add") },
    { name: "BBQ Bacon Burger", desc: "Beef, smoked bacon, cheddar, crispy onions.", price: 16, veg: false, img: IMG("1568901346375-23c9450c58cd") },
    { name: "Spicy Chicken Burger", desc: "Buttermilk fried chicken with chipotle mayo.", price: 13, veg: false, img: IMG("1625813506002-e5da51ee0b71") },
    { name: "Mushroom Swiss", desc: "Beef, sautéed mushrooms and molten swiss.", price: 15, veg: false, img: IMG("1568901346375-23c9450c58cd") },
    { name: "Paneer Tikka Burger", desc: "Grilled paneer patty with mint mayo.", price: 12, veg: true, img: IMG("1568901346375-23c9450c58cd") },
    { name: "Veggie Beetroot", desc: "Beetroot-quinoa patty with hummus and greens.", price: 12, veg: true, img: IMG("1625813506002-e5da51ee0b71") },
    { name: "Fish Fillet Burger", desc: "Panko-fried basa, tartar, iceberg and pickles.", price: 14, veg: false, img: IMG("1568901346375-23c9450c58cd") },
    { name: "Aloo Tikki Burger", desc: "Spiced potato patty with tangy chutney mayo.", price: 10, veg: true, img: IMG("1625813506002-e5da51ee0b71") },
  ],
  Biryani: [
    { name: "Hyderabadi Chicken Biryani", desc: "Dum-cooked basmati layered with saffron chicken.", price: 16, veg: false, img: IMG("1633945274005-3e28c7eb463c") },
    { name: "Lucknowi Mutton Biryani", desc: "Awadhi mutton in fragrant long-grain rice.", price: 19, veg: false, img: IMG("1563379091339-03b21ab4a4f8") },
    { name: "Veg Dum Biryani", desc: "Seasonal vegetables layered with saffron rice.", price: 12, veg: true, img: IMG("1633945274005-3e28c7eb463c") },
    { name: "Prawn Biryani", desc: "Delicate prawns dum-cooked with green masala.", price: 20, veg: false, img: IMG("1563379091339-03b21ab4a4f8") },
    { name: "Paneer Biryani", desc: "Marinated paneer cubes in saffron basmati.", price: 13, veg: true, img: IMG("1633945274005-3e28c7eb463c") },
    { name: "Egg Biryani", desc: "Whole eggs and fried onions on dum rice.", price: 11, veg: false, img: IMG("1563379091339-03b21ab4a4f8") },
    { name: "Kolkata Biryani", desc: "Delicate Bengali-style biryani with potato and egg.", price: 15, veg: false, img: IMG("1633945274005-3e28c7eb463c") },
    { name: "Malabar Chicken Biryani", desc: "Kaima rice, coconut and Kerala spices.", price: 16, veg: false, img: IMG("1563379091339-03b21ab4a4f8") },
    { name: "Mushroom Biryani", desc: "Button mushrooms slow-cooked in dum masala.", price: 12, veg: true, img: IMG("1633945274005-3e28c7eb463c") },
    { name: "Ambur Star Biryani", desc: "Short-grain seeraga samba with mutton.", price: 18, veg: false, img: IMG("1563379091339-03b21ab4a4f8") },
  ],
  Chinese: [
    { name: "Chilli Chicken Dry", desc: "Wok-tossed chicken in soy-chilli glaze.", price: 13, veg: false, img: IMG("1512058564366-18510a8d4347") },
    { name: "Veg Hakka Noodles", desc: "Egg-less noodles with julienned vegetables.", price: 10, veg: true, img: IMG("1585032226651-759b368d7246") },
    { name: "Kung Pao Chicken", desc: "Sichuan chicken with peanuts and dry chillies.", price: 14, veg: false, img: IMG("1512058564366-18510a8d4347") },
    { name: "Schezwan Fried Rice", desc: "Wok rice with red schezwan chilli paste.", price: 10, veg: true, img: IMG("1618449806651-7f4cf91d1e48") },
    { name: "Manchurian Balls", desc: "Crispy veg dumplings in tangy brown sauce.", price: 11, veg: true, img: IMG("1512058564366-18510a8d4347") },
    { name: "Sweet & Sour Fish", desc: "Battered fish with pineapple and peppers.", price: 16, veg: false, img: IMG("1512058564366-18510a8d4347") },
    { name: "Chow Mein Chicken", desc: "Slippery noodles wok-fried with shredded chicken.", price: 12, veg: false, img: IMG("1585032226651-759b368d7246") },
    { name: "Tofu Black Bean", desc: "Silken tofu in fermented black bean sauce.", price: 12, veg: true, img: IMG("1546069901-ba9599a7e63c") },
    { name: "Prawn Chilli Basil", desc: "Thai-style prawns with holy basil.", price: 18, veg: false, img: IMG("1565557623262-b51c2513a641") },
    { name: "Veg Dim Sum", desc: "Steamed translucent dumplings, chilli-garlic dip.", price: 11, veg: true, img: IMG("1563245372-c215247fda41") },
  ],
  "South Indian": [
    { name: "Masala Dosa", desc: "Crispy rice crepe with spiced potato filling.", price: 8, veg: true, img: IMG("1668236543090-82eba5ee5976") },
    { name: "Idli Sambar", desc: "Steamed rice cakes with lentil stew and chutneys.", price: 6, veg: true, img: IMG("1668236543090-82eba5ee5976") },
    { name: "Medu Vada", desc: "Fluffy urad-dal doughnuts with coconut chutney.", price: 6, veg: true, img: IMG("1668236543090-82eba5ee5976") },
    { name: "Rava Uttapam", desc: "Semolina pancake with onions, tomatoes and chilli.", price: 7, veg: true, img: IMG("1668236543090-82eba5ee5976") },
    { name: "Pongal", desc: "Creamy rice-lentil porridge with cracked pepper.", price: 7, veg: true, img: IMG("1668236543090-82eba5ee5976") },
    { name: "Chettinad Chicken", desc: "Fiery Tamil masala with roasted spices.", price: 14, veg: false, img: IMG("1603894584373-5ac82b2ae398") },
    { name: "Kerala Fish Curry", desc: "Kokum-tinged coconut curry with tender fish.", price: 15, veg: false, img: IMG("1519708227418-c8fd9a32b7a2") },
    { name: "Appam & Stew", desc: "Lace-edged rice hoppers with coconut vegetable stew.", price: 10, veg: true, img: IMG("1668236543090-82eba5ee5976") },
    { name: "Andhra Mutton Curry", desc: "Fiery bone-in mutton with red chilli gravy.", price: 17, veg: false, img: IMG("1603894584373-5ac82b2ae398") },
    { name: "Filter Coffee", desc: "Chicory-blend coffee frothed in dabara-tumbler.", price: 4, veg: true, img: IMG("1514432324607-a09d9b4aefdd") },
  ],
  "North Indian": [
    { name: "Butter Chicken", desc: "Tandoor chicken in silken tomato-butter gravy.", price: 15, veg: false, img: IMG("1603894584373-5ac82b2ae398") },
    { name: "Dal Makhani", desc: "Slow-cooked black lentils with cream and butter.", price: 11, veg: true, img: IMG("1546549033-d94191d84b23") },
    { name: "Paneer Butter Masala", desc: "Fresh paneer in tomato-cashew makhani.", price: 12, veg: true, img: IMG("1631452180519-c014fe946bc7") },
    { name: "Rogan Josh", desc: "Kashmiri lamb curry with hand-pounded spices.", price: 17, veg: false, img: IMG("1603894584373-5ac82b2ae398") },
    { name: "Chole Bhature", desc: "Spiced chickpeas with pillowy fried bread.", price: 10, veg: true, img: IMG("1589301760014-d929f3979dbc") },
    { name: "Tandoori Roti Basket", desc: "Assorted tandoor-baked breads.", price: 6, veg: true, img: IMG("1608686207857-c8a7e0e7a270") },
    { name: "Palak Paneer", desc: "Spinach purée with soft paneer cubes.", price: 12, veg: true, img: IMG("1631452180519-c014fe946bc7") },
    { name: "Lamb Vindaloo", desc: "Goan-style tangy chilli lamb.", price: 17, veg: false, img: IMG("1603894584373-5ac82b2ae398") },
    { name: "Malai Kofta", desc: "Paneer dumplings in creamy cashew gravy.", price: 12, veg: true, img: IMG("1546549033-d94191d84b23") },
    { name: "Amritsari Chicken Curry", desc: "Punjabi home-style chicken with garam masala.", price: 15, veg: false, img: IMG("1603894584373-5ac82b2ae398") },
  ],
  Desserts: [
    { name: "Gulab Jamun", desc: "Fried milk dumplings soaked in rose cardamom syrup.", price: 6, veg: true, img: IMG("1587314169569-42b78d227f27") },
    { name: "Rasmalai", desc: "Cottage-cheese discs in saffron pistachio milk.", price: 7, veg: true, img: IMG("1587314169569-42b78d227f27") },
    { name: "Molten Chocolate Cake", desc: "Warm chocolate lava with vanilla ice cream.", price: 9, veg: true, img: IMG("1606313564200-e75d5e30476c") },
    { name: "Tiramisu Classico", desc: "Espresso-soaked ladyfingers, mascarpone, cocoa.", price: 9, veg: true, img: IMG("1571877227200-a0d98ea607e9") },
    { name: "Cheesecake New York", desc: "Baked vanilla cheesecake with berry compote.", price: 9, veg: true, img: IMG("1533134242443-4b54a7d23a67") },
    { name: "Kulfi Falooda", desc: "Reduced-milk kulfi with rose vermicelli.", price: 7, veg: true, img: IMG("1587314169569-42b78d227f27") },
    { name: "Crème Brûlée", desc: "Vanilla custard with a crackling caramel top.", price: 8, veg: true, img: IMG("1470119693884-47d3a1d1f180") },
    { name: "Gajar Halwa", desc: "Slow-cooked carrot pudding with ghee and nuts.", price: 6, veg: true, img: IMG("1587314169569-42b78d227f27") },
    { name: "Baklava", desc: "Layered filo with pistachio and rose honey.", price: 8, veg: true, img: IMG("1519623281983-223b567d16ac") },
    { name: "Chocolate Brownie", desc: "Fudgy brownie with hot chocolate ganache.", price: 7, veg: true, img: IMG("1606313564200-e75d5e30476c") },
  ],
  Beverages: [
    { name: "Mango Lassi", desc: "Alphonso mango whisked with sweet yogurt.", price: 5, veg: true, img: IMG("1553530666-4117b34d4b9c") },
    { name: "Masala Chai", desc: "Cardamom, ginger, clove milk tea.", price: 3, veg: true, img: IMG("1576092768241-dec231879fc3") },
    { name: "Cold Coffee", desc: "Iced blended coffee with vanilla ice cream.", price: 5, veg: true, img: IMG("1461023058943-07fcbe16d735") },
    { name: "Fresh Lime Soda", desc: "Sweet-salt lime with sparkling water.", price: 4, veg: true, img: IMG("1513558161293-7d7b9ad7fdb8") },
    { name: "Watermelon Cooler", desc: "Cold-pressed watermelon with mint.", price: 5, veg: true, img: IMG("1553530666-4117b34d4b9c") },
    { name: "Virgin Mojito", desc: "Muddled mint, lime and sparkling soda.", price: 5, veg: true, img: IMG("1513558161293-7d7b9ad7fdb8") },
    { name: "Filter Coffee", desc: "South Indian chicory coffee served hot.", price: 4, veg: true, img: IMG("1514432324607-a09d9b4aefdd") },
    { name: "Rose Milk", desc: "Chilled milk with fragrant rose syrup.", price: 4, veg: true, img: IMG("1553530666-4117b34d4b9c") },
    { name: "Iced Tea Peach", desc: "Freshly brewed black tea with peach.", price: 4, veg: true, img: IMG("1513558161293-7d7b9ad7fdb8") },
    { name: "Fresh Orange Juice", desc: "Cold-pressed Valencia oranges.", price: 5, veg: true, img: IMG("1613478223719-2ab802602423") },
  ],
  "Ice Cream": [
    { name: "Kulfi Malai", desc: "Traditional slow-reduced milk ice on stick.", price: 4, veg: true, img: IMG("1490374771822-63b4b5747e70") },
    { name: "Belgian Chocolate", desc: "Dark chocolate ice cream with cocoa nibs.", price: 5, veg: true, img: IMG("1563805042-7684c849aab7") },
    { name: "Vanilla Bean", desc: "Madagascar vanilla with real bean flecks.", price: 4, veg: true, img: IMG("1570197788417-0e82375c9371") },
    { name: "Strawberry Sorbet", desc: "Bright fresh strawberry sorbet.", price: 4, veg: true, img: IMG("1490374771822-63b4b5747e70") },
    { name: "Pistachio Gelato", desc: "Sicilian pistachio slow-churned gelato.", price: 5, veg: true, img: IMG("1490374771822-63b4b5747e70") },
    { name: "Mango Sorbet", desc: "Alphonso mango sorbet with a touch of lime.", price: 5, veg: true, img: IMG("1490374771822-63b4b5747e70") },
    { name: "Cookies & Cream", desc: "Chocolate cookie shards in vanilla base.", price: 5, veg: true, img: IMG("1563805042-7684c849aab7") },
    { name: "Salted Caramel", desc: "Burnt caramel with sea salt swirl.", price: 5, veg: true, img: IMG("1563805042-7684c849aab7") },
    { name: "Butterscotch Nut", desc: "Butterscotch with candied cashews.", price: 5, veg: true, img: IMG("1490374771822-63b4b5747e70") },
    { name: "Coconut Sorbet", desc: "Creamy coconut sorbet with lime zest.", price: 4, veg: true, img: IMG("1490374771822-63b4b5747e70") },
  ],
};


const PRICE_MULTIPLIER = 60; // Convert base item values into Indian Rupees.

function buildDishes(): Dish[] {
  const out: Dish[] = [];
  let idx = 0;
  for (const cat of CATEGORIES) {
    const seeds = SEEDS[cat];
    seeds.forEach((s, i) => {
      idx += 1;
      out.push({
        id: `d${idx}`,
        name: s.name,
        description: s.desc,
        image: s.img,
        price: s.price * PRICE_MULTIPLIER,
        rating: s.rating ?? Number((4.4 + ((idx * 7) % 6) / 10).toFixed(1)),
        calories: 250 + ((idx * 37) % 500),
        cookTime: 10 + ((idx * 5) % 25),
        category: cat,
        ingredients: [],
        veg: s.veg,
        popular: i < 2,
      });
    });
  }
  return out;
}

export const DISHES: Dish[] = buildDishes();

export const POPULAR_DISHES: Dish[] = DISHES.filter((d) => d.popular).slice(0, 6);

export const TESTIMONIALS = [
  {
    name: "Isabella Moreau",
    role: "Food Critic, Le Monde",
    quote:
      "An evening at Spice Garden is theatre on a plate. Every course is a quiet revelation.",
    rating: 5,
  },
  {
    name: "James Whitford",
    role: "Travel & Leisure",
    quote:
      "The most considered fine dining experience I have had in a decade. Faultless service.",
    rating: 5,
  },
  {
    name: "Aiko Tanaka",
    role: "Chef & Author",
    quote:
      "Precision, restraint, and soul. Spice Garden honours both ingredient and guest.",
    rating: 5,
  },
];

export const TIMELINE = [
  { year: "2008", title: "The First Table", text: "A 12-seat counter opens in a converted townhouse." },
  { year: "2013", title: "First Star", text: "Awarded our first Michelin star within five years." },
  { year: "2018", title: "The Garden", text: "Our private chef's garden begins supplying the kitchen." },
  { year: "2024", title: "Three Stars", text: "Recognised among the world's fifty finest restaurants." },
];

export const FAQS = [
  {
    q: "What is your dress code?",
    a: "Smart elegant. Jackets are appreciated for gentlemen; trainers and sportswear are not permitted in the dining room.",
  },
  {
    q: "Do you accommodate dietary restrictions?",
    a: "Absolutely. Share details when booking and our chef will craft a tasting menu around you.",
  },
  {
    q: "How far in advance should I reserve?",
    a: "We release tables eight weeks in advance. Weekend service typically books within hours.",
  },
  {
    q: "Is the chef's tasting menu available daily?",
    a: "Our eleven-course chef's menu is available Tuesday through Saturday, evening service only.",
  },
];
