import fs from 'fs';

let content = fs.readFileSync('src/routes/_authenticated.gallery.tsx', 'utf8');

// Replace everything from const U = ... to the end of const ITEMS = [...];
const itemsRegex = /const U = [\s\S]*?(?=function GalleryPage)/;

const replacement = `const LOCAL_ASSETS = import.meta.glob('@/assets/*.{jpg,png,jpeg,avif,webp}', { eager: true, import: 'default' }) as Record<string, string>;
const allKeys = Object.keys(LOCAL_ASSETS);

const ITEMS: { src: string; cat: Exclude<Cat, "All"> }[] = [
  { src: LOCAL_ASSETS['/src/assets/interior.jpg'] || LOCAL_ASSETS[allKeys[0]], cat: 'Restaurant' },
  { src: LOCAL_ASSETS['/src/assets/hero-restaurant.jpg'] || LOCAL_ASSETS[allKeys[1]], cat: 'Restaurant' },
  { src: LOCAL_ASSETS['/src/assets/bg-reservations.jpg'] || LOCAL_ASSETS[allKeys[2]], cat: 'Restaurant' },
  
  { src: LOCAL_ASSETS['/src/assets/gallery-1.jpg'] || LOCAL_ASSETS[allKeys[3]], cat: 'Food' },
  { src: LOCAL_ASSETS['/src/assets/gallery-2.jpg'] || LOCAL_ASSETS[allKeys[4]], cat: 'Food' },
  { src: LOCAL_ASSETS['/src/assets/gallery-3.jpg'] || LOCAL_ASSETS[allKeys[5]], cat: 'Food' },
  { src: LOCAL_ASSETS['/src/assets/dish-1.jpg'] || LOCAL_ASSETS[allKeys[6]], cat: 'Food' },
  { src: LOCAL_ASSETS['/src/assets/dish-2.jpg'] || LOCAL_ASSETS[allKeys[7]], cat: 'Food' },
  { src: LOCAL_ASSETS['/src/assets/dish-3.jpg'] || LOCAL_ASSETS[allKeys[8]], cat: 'Food' },
  
  { src: LOCAL_ASSETS['/src/assets/chef.jpg'] || LOCAL_ASSETS[allKeys[9]], cat: 'Chef' },
  
  { src: LOCAL_ASSETS['/src/assets/bg-contact.jpg'] || LOCAL_ASSETS[allKeys[10]], cat: 'Events' },
  
  { src: LOCAL_ASSETS['/src/assets/bg-about.jpg'] || LOCAL_ASSETS[allKeys[11]], cat: 'Kitchen' },
];

const extraPhotos = allKeys.filter(k => k.includes('/photo-') || k.includes('/istockphoto-'));
let idx = 0;
while (ITEMS.length < 30 && idx < extraPhotos.length) {
  const cats: Exclude<Cat, "All">[] = ["Food", "Restaurant", "Events", "Kitchen", "Chef"];
  ITEMS.push({ src: LOCAL_ASSETS[extraPhotos[idx]], cat: cats[idx % 5] });
  idx++;
}

`;

content = content.replace(itemsRegex, replacement);

fs.writeFileSync('src/routes/_authenticated.gallery.tsx', content, 'utf8');
console.log('Done modifying _authenticated.gallery.tsx');
