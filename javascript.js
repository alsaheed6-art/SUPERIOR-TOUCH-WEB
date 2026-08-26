/* ==========================================
   SUPERIOR TOUCH LUXURY ECOMMERCE
   JavaScript
========================================== */

// Hide Loader
window.addEventListener("load", () => {
    document.getElementById("loader").style.display = "none";
});

// ----------------------
// Product Database
// ----------------------

const products = [

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

function renderProducts(list){

    productGrid.innerHTML="";

    list.forEach(product=>{

        productGrid.innerHTML += `

        <div class="product-card">

            <img src="${product.image}" alt="${product.name}">

            <h3>${product.name}</h3>

            <p>₦${product.price.toLocaleString()}</p>

            <button onclick="addToCart('${product.name}',${product.price})">

                Order Now

            </button>

        </div>

        `;

    });

}

renderProducts(products);

// ----------------------
// Live Search
// ----------------------

const searchBox=document.getElementById("searchBox");

searchBox.addEventListener("keyup",()=>{

    const value=searchBox.value.toLowerCase();

    const filtered=products.filter(item=>

        item.name.toLowerCase().includes(value) ||

        item.category.toLowerCase().includes(value)

    );

    renderProducts(filtered);

});

// ----------------------
// Shopping Cart
// ----------------------

let cart=[];
let total=0;

function addToCart(name,price){

    cart.push({name,price});

    total+=price;

    document.getElementById("cartCount").innerText=cart.length;

    alert(`${name} added to cart`);

}

// ----------------------
// Dark Mode
// ----------------------

const themeBtn=document.getElementById("themeBtn");

themeBtn.addEventListener("click",()=>{

    document.body.classList.toggle("dark");

});

// ----------------------
// Mobile Menu
// ----------------------

const menuBtn=document.getElementById("menuBtn");
const navMenu=document.getElementById("navMenu");

menuBtn.addEventListener("click",()=>{

    if(navMenu.style.display==="flex"){

        navMenu.style.display="none";

    }else{

        navMenu.style.display="flex";

    }

});

// ----------------------
// Gallery Lightbox
// ----------------------

const galleryImages=document.querySelectorAll(".gallery-grid img");

const lightbox=document.createElement("div");

lightbox.id="lightbox";

lightbox.style.cssText=`

position:fixed;
top:0;
left:0;
width:100%;
height:100%;
background:rgba(0,0,0,.9);
display:none;
justify-content:center;
align-items:center;
z-index:99999;

`;

const lightboxImg=document.createElement("img");

lightboxImg.style.maxWidth="90%";
lightboxImg.style.maxHeight="90%";
lightboxImg.style.borderRadius="15px";

lightbox.appendChild(lightboxImg);

document.body.appendChild(lightbox);

galleryImages.forEach(img=>{

    img.addEventListener("click",()=>{

        lightbox.style.display="flex";

        lightboxImg.src=img.src;

    });

});

lightbox.addEventListener("click",()=>{

    lightbox.style.display="none";

});

// ----------------------
// Smooth Scroll
// ----------------------

document.querySelectorAll("a[href^='#']").forEach(link=>{

    link.addEventListener("click",function(e){

        e.preventDefault();

        document.querySelector(this.getAttribute("href"))
        .scrollIntoView({behavior:"smooth"});

    });

});

// ----------------------
// Floating WhatsApp Button
// ----------------------

const whatsapp=document.createElement("a");

whatsapp.href="https://wa.me/2340000000000";

whatsapp.target="_blank";

whatsapp.innerHTML="💬";

whatsapp.style.cssText=`

position:fixed;
right:25px;
bottom:25px;
width:65px;
height:65px;
background:#25D366;
color:white;
font-size:34px;
display:flex;
justify-content:center;
align-items:center;
border-radius:50%;
text-decoration:none;
box-shadow:0 10px 30px rgba(0,0,0,.3);
z-index:9999;

`;

document.body.appendChild(whatsapp);