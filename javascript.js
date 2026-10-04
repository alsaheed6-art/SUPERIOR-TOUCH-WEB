/* ==========================================
   SUPERIOR TOUCH LUXURY ECOMMERCE
   COMPLETE SCRIPT (LOADER FIXED)
========================================== */

// ----------------------
// Loader (Never Freeze)
// ----------------------

document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loader");

  if (loader) {
    setTimeout(() => {
      loader.style.opacity = "0";
      loader.style.visibility = "hidden";
      loader.style.pointerEvents = "none";

      setTimeout(() => {
        loader.style.display = "none";
      }, 300);

    }, 500);
  }
});

window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (loader) loader.style.display = "none";
});

// ----------------------
// Product Database
// ----------------------

let products = [

  // AGBADA
  {name:"Premium Agbada", price:150000, category:"Agbada", image:"images/IMG-20260826-WA0011.jpg"},
  {name:"Luxury Agbada", price:150000, category:"Agbada", image:"images/IMG-20260826-WA0012.jpg"},
  {name:"Royal Agbada", price:150000, category:"Agbada", image:"images/IMG-20260826-WA0013.jpg"},
  {name:"Classic Agbada", price:150000, category:"Agbada", image:"images/IMG-20260826-WA0014.jpg"},
  {name:"Blue Agbada", price:150000, category:"Agbada", image:"images/IMG-20260826-WA0015.jpg"},
  {name:"Black Agbada", price:150000, category:"Agbada", image:"images/IMG-20260826-WA0016.jpg"},
  {name:"White Agbada", price:150000, category:"Agbada", image:"images/IMG-20260826-WA0054.jpg"},

  // KAFTAN
  {name:"Premium Kaftan", price:50000, category:"Kaftan", image:"images/IMG-20260826-WA0024.jpg"},
  {name:"Luxury Kaftan", price:50000, category:"Kaftan", image:"images/IMG-20260826-WA0025.jpg"},
  {name:"Purple Kaftan", price:50000, category:"Kaftan", image:"images/IMG-20260826-WA0028.jpg"},
  {name:"White Kaftan", price:50000, category:"Kaftan", image:"images/IMG-20260826-WA0036.jpg"},

  // AREWA CAPS
  {name:"Premium Arewa Cap", price:50000, category:"Cap", image:"images/IMG-20260826-WA0004.jpg"},
  {name:"Blue Arewa Cap", price:50000, category:"Cap", image:"images/IMG-20260826-WA0005.jpg"},
  {name:"Gold Arewa Cap", price:50000, category:"Cap", image:"images/IMG-20260826-WA0006.jpg"},
  {name:"Black Arewa Cap", price:50000, category:"Cap", image:"images/IMG-20260826-WA0007.jpg"},
  {name:"Luxury Arewa Cap", price:50000, category:"Cap", image:"images/IMG-20260826-WA0008.jpg"},

  // ASO OKE CAPS
  {name:"Aso Oke Cap", price:8000, category:"Cap", image:"images/IMG-20260826-WA0047.jpg"},
  {name:"Purple Aso Oke Cap", price:8000, category:"Cap", image:"images/IMG-20260826-WA0048.jpg"},
  {name:"Multi Aso Oke Cap", price:8000, category:"Cap", image:"images/IMG-20260826-WA0049.jpg"},
  {name:"Brown Aso Oke Cap", price:8000, category:"Cap", image:"images/IMG-20260826-WA0050.jpg"},
  {name:"Navy Aso Oke Cap", price:8000, category:"Cap", image:"images/IMG-20260826-WA0009.jpg"},
  {name:"Gold Aso Oke Cap", price:8000, category:"Cap", image:"images/IMG-20260826-WA0010.jpg"},

  // BAGGY PANTS
  {name:"Khaki Baggy Pant", price:15000, category:"Pant", image:"images/IMG-20260826-WA0019.jpg"},
  {name:"White Baggy Pant", price:15000, category:"Pant", image:"images/IMG-20260826-WA0020.jpg"},
  {name:"Grey Baggy Pant", price:15000, category:"Pant", image:"images/IMG-20260826-WA0023.jpg"}

];

// ----------------------
// Render Products
// ----------------------

const productGrid = document.getElementById("productGrid");
const searchBox = document.getElementById("searchBox");

function renderProducts(list){

  if(!productGrid) return;

  productGrid.innerHTML="";

  list.forEach(product=>{

    const card=document.createElement("div");
    card.className="product-card";

    const image=document.createElement("img");
    image.src=product.image;
    image.alt=product.name;

    const name=document.createElement("h3");
    name.textContent=product.name;

    const price=document.createElement("p");
    price.textContent=`₦${Number(product.price).toLocaleString()}`;

    const orderButton=document.createElement("button");
    orderButton.textContent="Order Now";
    orderButton.addEventListener("click",()=>{
      addToCart(product.name,product.price);
    });

    card.append(image,name,price,orderButton);
    productGrid.appendChild(card);

  });

}

renderProducts(products);

// ----------------------
// Search
// ----------------------

if(searchBox){

searchBox.addEventListener("input",()=>{

const value=searchBox.value.toLowerCase();

const filtered=products.filter(item=>

item.name.toLowerCase().includes(value)||

item.category.toLowerCase().includes(value)

);

renderProducts(filtered);

});

}

// ----------------------
// Optional API Catalog
// ----------------------

const API_BASE_URL=(window.SUPERIOR_TOUCH_CONFIG?.apiBaseUrl||"").replace(/\/+$/ ,"");

async function apiRequest(path){

  const response=await fetch(`${API_BASE_URL}${path}`,{
    headers:{"Accept":"application/json"}
  });

  if(!response.ok){
    const messages={
      400:"The API rejected the request.",
      401:"Authentication is required for this API request.",
      403:"The API denied this request.",
      404:"The requested API resource was not found.",
      500:"The API encountered a server error."
    };
    throw new Error(messages[response.status]||`API request failed with status ${response.status}.`);
  }

  return response.json();

}

function safeImageUrl(value){

  if(typeof value!=="string"||!value.trim()) return "";

  try{
    const url=new URL(value,document.baseURI);
    return ["http:","https:"].includes(url.protocol)?value:"";
  }catch{
    return "";
  }

}

async function loadCatalogFromApi(){

  if(!API_BASE_URL) return;

  try{
    const [apiProducts,apiCategories]=await Promise.all([
      apiRequest("/products"),
      apiRequest("/categories")
    ]);

    if(!Array.isArray(apiProducts)||apiProducts.length===0) return;

    const categoryNames=new Map();
    if(Array.isArray(apiCategories)){
      apiCategories.forEach(category=>{
        if(category?.id&&category?.name) categoryNames.set(String(category.id),String(category.name));
      });
    }

    const mergedProducts=[...products];

    apiProducts.forEach(apiProduct=>{
      const name=typeof apiProduct?.name==="string"?apiProduct.name.trim():"";
      const price=Number(apiProduct?.price);
      const category=typeof apiProduct?.category==="string"
        ?apiProduct.category
        :categoryNames.get(String(apiProduct?.categoryId));

      if(!name||!Number.isFinite(price)||!category) return;

      const matchingIndex=mergedProducts.findIndex(product=>product.name.toLowerCase()===name.toLowerCase());
      const previous=matchingIndex>=0?mergedProducts[matchingIndex]:null;
      const image=safeImageUrl(apiProduct.imageUrl||apiProduct.image)||previous?.image||"";

      if(!image) return;

      const normalized={name,price,category,image};
      if(matchingIndex>=0){
        mergedProducts[matchingIndex]=normalized;
      }else{
        mergedProducts.push(normalized);
      }
    });

    products=mergedProducts;
    const searchTerm=searchBox?.value.toLowerCase()||"";
    renderProducts(searchTerm
      ?products.filter(product=>product.name.toLowerCase().includes(searchTerm)||product.category.toLowerCase().includes(searchTerm))
      :products);
  }catch(error){
    console.info("Superior Touch catalog API unavailable; showing the saved catalog.",error);
  }

}

void loadCatalogFromApi();

// ----------------------
// Cart
// ----------------------

let cart=[];

function addToCart(name,price){

cart.push({name,price});

const count=document.getElementById("cartCount");

if(count) count.textContent=cart.length;

alert(`${name} added to cart`);

}

// ----------------------
// Dark Mode
// ----------------------

const themeBtn=document.getElementById("themeBtn");

themeBtn?.addEventListener("click",()=>{

document.body.classList.toggle("dark");

});

// ----------------------
// Mobile Menu
// ----------------------

const menuBtn=document.getElementById("menuBtn");
const navMenu=document.getElementById("navMenu");

menuBtn?.addEventListener("click",()=>{

if(!navMenu) return;

navMenu.classList.toggle("show");

});

// ----------------------
// Cart Panel
// ----------------------

const cartBtn=document.getElementById("cartBtn");
const cartPanel=document.getElementById("cartPanel");

cartBtn?.addEventListener("click",()=>{

cartPanel?.classList.toggle("show");

});

// ----------------------
// Gallery Lightbox
// ----------------------

const galleryImages=document.querySelectorAll(".gallery-grid img");

if(galleryImages.length){

const lightbox=document.createElement("div");

lightbox.style.cssText=`
position:fixed;
top:0;
left:0;
width:100%;
height:100%;
background:rgba(0,0,0,.92);
display:none;
justify-content:center;
align-items:center;
z-index:99999;
`;

const img=document.createElement("img");

img.style.maxWidth="90%";
img.style.maxHeight="90%";
img.style.borderRadius="15px";

lightbox.appendChild(img);

document.body.appendChild(lightbox);

galleryImages.forEach(photo=>{

photo.addEventListener("click",()=>{

img.src=photo.src;
lightbox.style.display="flex";

});

});

lightbox.addEventListener("click",()=>{

lightbox.style.display="none";

});

}

// ----------------------
// Smooth Scroll
// ----------------------

document.querySelectorAll('a[href^="#"]').forEach(link=>{

link.addEventListener("click",e=>{

const target=document.querySelector(link.getAttribute("href"));

if(target){

e.preventDefault();

target.scrollIntoView({
behavior:"smooth"
});

}

});

});

// ----------------------
// WhatsApp Floating Button
// ----------------------

const whatsapp=document.createElement("a");

whatsapp.href="https://wa.me/2348072924900";

whatsapp.target="_blank";

whatsapp.innerHTML="💬";

whatsapp.style.cssText=`
position:fixed;
right:22px;
bottom:22px;
width:65px;
height:65px;
background:#25D366;
color:white;
font-size:32px;
display:flex;
justify-content:center;
align-items:center;
border-radius:50%;
text-decoration:none;
box-shadow:0 10px 30px rgba(0,0,0,.3);
z-index:9999;
`;

document.body.appendChild(whatsapp);