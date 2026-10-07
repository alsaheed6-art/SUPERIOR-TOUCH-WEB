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
    const hasBackendId=isValidProductId(product.id);
    orderButton.textContent=hasBackendId?"Add to Cart":"Unavailable for online order";
    orderButton.disabled=!hasBackendId;
    orderButton.title=hasBackendId?"Add this item to your cart":"This catalog item has no backend product ID";
    if(hasBackendId){
      orderButton.addEventListener("click",()=>addToCart(product));
    }

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

async function apiRequest(path,options={}){

  const response=await fetch(`${API_BASE_URL}${path}`,{
    ...options,
    headers:{"Accept":"application/json",...(options.headers||{})}
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

function isValidProductId(value){
  return typeof value==="string"&&/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
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

      const normalized={
        id:isValidProductId(apiProduct?.id)?apiProduct.id:undefined,
        name,
        price,
        category,
        image
      };
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

function addToCart(product){
  if(!product||!isValidProductId(product.id)){
    setCartMessage("This item is not available for online ordering.");
    return;
  }

  cart.push({
    productId:product.id,
    name:product.name,
    price:Number(product.price),
    image:product.image,
    quantity:1
  });
  renderCart();
  setCartMessage(`${product.name} added to your cart.`);
}

const currencyFormatter=new Intl.NumberFormat("en-NG",{
  style:"currency",
  currency:"NGN",
  maximumFractionDigits:2
});

function formatNaira(value){
  return currencyFormatter.format(Number(value)||0);
}

function escapeHtml(value){
  return String(value??"").replace(/[&<>"']/g,character=>({
    "&":"&amp;",
    "<":"&lt;",
    ">":"&gt;",
    '"':"&quot;",
    "'":"&#39;"
  })[character]);
}

function setCartMessage(message,isError=false){
  const element=document.getElementById("cartMessage");
  if(!element) return;
  element.textContent=message;
  element.classList.toggle("is-error",isError);
}

function updateCartCount(){
  const count=document.getElementById("cartCount");
  const panelCount=document.getElementById("cartPanelCount");
  if(count) count.textContent=cart.reduce((total,item)=>total+item.quantity,0);
  if(panelCount) panelCount.textContent=`(${cart.reduce((total,item)=>total+item.quantity,0)})`;
}

function renderCart(){
  const itemsElement=document.getElementById("cartItems");
  const summaryElement=document.getElementById("orderSummaryItems");
  const placeOrderButton=document.getElementById("placeOrderBtn");
  const subtotalElement=document.getElementById("cartSubtotal");
  const totalElement=document.getElementById("cartEstimatedTotal");
  const invalidItem=cart.some(item=>!isValidProductId(item.productId));
  const subtotal=cart.reduce((total,item)=>total+(Number(item.price)||0)*item.quantity,0);

  updateCartCount();

  if(itemsElement){
    if(cart.length===0){
      itemsElement.innerHTML='<p class="cart-empty">Your cart is empty. Browse the collection to add an item.</p>';
    }else{
      itemsElement.innerHTML=cart.map((item,index)=>`
        <article class="cart-item">
          <img class="cart-item-image" src="${escapeHtml(item.image||"")}" alt="">
          <div class="cart-item-copy">
            <h4>${escapeHtml(item.name)}</h4>
            <p>Qty ${item.quantity} · ${formatNaira(item.price)} each</p>
            ${isValidProductId(item.productId)?"":'<span class="cart-item-warning">Unavailable for online order</span>'}
          </div>
          <button class="remove-cart-item" type="button" data-cart-index="${index}" aria-label="Remove ${escapeHtml(item.name)}">Remove</button>
        </article>
      `).join("");
    }
  }

  if(summaryElement){
    summaryElement.innerHTML=cart.length
      ?cart.map(item=>`<div class="summary-item"><span>${escapeHtml(item.name)} <small>× ${item.quantity}</small></span><strong>${formatNaira((Number(item.price)||0)*item.quantity)}</strong></div>`).join("")
      :'<p class="summary-empty">Items will appear here.</p>';
  }

  if(subtotalElement) subtotalElement.textContent=formatNaira(subtotal);
  if(totalElement) totalElement.textContent=formatNaira(subtotal);
  if(placeOrderButton) placeOrderButton.disabled=cart.length===0||invalidItem||cart.some(item=>!isValidProductId(item.productId));

  if(invalidItem){
    setCartMessage("Remove items without a valid backend product ID before placing your order.",true);
  }else if(cart.length===0){
    setCartMessage("");
  }
}

function showCart(){
  const panel=document.getElementById("cartPanel");
  const backdrop=document.getElementById("cartBackdrop");
  if(!panel||!backdrop) return;
  panel.classList.add("show");
  backdrop.classList.add("show");
  panel.setAttribute("aria-hidden","false");
  backdrop.setAttribute("aria-hidden","false");
  document.body.classList.add("cart-open");
}

function hideCart(){
  const panel=document.getElementById("cartPanel");
  const backdrop=document.getElementById("cartBackdrop");
  if(!panel||!backdrop) return;
  panel.classList.remove("show");
  backdrop.classList.remove("show");
  panel.setAttribute("aria-hidden","true");
  backdrop.setAttribute("aria-hidden","true");
  document.body.classList.remove("cart-open");
}

function renderOrderConfirmation(order){
  const confirmation=document.getElementById("orderConfirmation");
  const cartContent=document.getElementById("cartContent");
  if(!confirmation||!cartContent) return;

  const createdAt=new Date(order.createdAt);
  const dateText=Number.isNaN(createdAt.getTime())?"Date unavailable":createdAt.toLocaleString("en-NG",{dateStyle:"long",timeStyle:"short"});
  confirmation.innerHTML=`
    <div class="confirmation-heading">
      <span class="confirmation-check" aria-hidden="true">✓</span>
      <p class="cart-kicker">ORDER RECEIVED</p>
      <h2>Thank you for your order</h2>
      <p>Your order has been sent to Superior Touch.</p>
    </div>
    <div class="confirmation-order-meta">
      <div><span>Order number</span><strong>${escapeHtml(order.id)}</strong></div>
      <div><span>Date</span><strong>${escapeHtml(dateText)}</strong></div>
      <div><span>Status</span><strong class="confirmation-status">${escapeHtml(order.status)}</strong></div>
    </div>
    <section class="confirmation-section">
      <h3>Customer information</h3>
      <p>${escapeHtml(order.customerName)}</p>
      <p>${escapeHtml(order.customerPhone)}</p>
      ${order.customerEmail?`<p>${escapeHtml(order.customerEmail)}</p>`:""}
    </section>
    <section class="confirmation-section">
      <h3>Delivery information</h3>
      <p>${escapeHtml(order.deliveryAddress)}</p>
      <p>${escapeHtml(order.deliveryCity)}, ${escapeHtml(order.deliveryState)}</p>
      ${order.deliveryInstructions?`<p>${escapeHtml(order.deliveryInstructions)}</p>`:""}
    </section>
    <section class="confirmation-section">
      <h3>Items</h3>
      ${(Array.isArray(order.items)?order.items:[]).map(item=>`
        <div class="confirmation-item">
          <div><strong>${escapeHtml(item.productName)}</strong><small>Qty ${Number(item.quantity)||0} · ${formatNaira(item.unitPrice)} each</small></div>
          <strong>${formatNaira(item.lineTotal)}</strong>
        </div>
      `).join("")}
    </section>
    <dl class="confirmation-totals">
      <div><dt>Subtotal</dt><dd>${formatNaira(order.subtotal)}</dd></div>
      <div><dt>Delivery fee</dt><dd>${formatNaira(order.deliveryFee)}</dd></div>
      <div><dt>Discount</dt><dd>−${formatNaira(order.discount)}</dd></div>
      <div class="confirmation-grand-total"><dt>Total</dt><dd>${formatNaira(order.totalAmount)}</dd></div>
    </dl>
    <button id="continueShoppingBtn" class="place-order-btn" type="button">Continue Shopping</button>
  `;

  cartContent.hidden=true;
  confirmation.hidden=false;
  document.getElementById("continueShoppingBtn")?.addEventListener("click",()=>{
    cart=[];
    updateCartCount();
    document.getElementById("orderForm")?.reset();
    cartContent.hidden=false;
    confirmation.hidden=true;
    confirmation.innerHTML="";
    setCartMessage("");
    renderCart();
    hideCart();
  });
}

async function submitOrder(event){
  event.preventDefault();
  if(cart.length===0||cart.some(item=>!isValidProductId(item.productId))){
    setCartMessage("Add orderable products with valid backend IDs before continuing.",true);
    return;
  }

  const form=document.getElementById("orderForm");
  const submitButton=document.getElementById("placeOrderBtn");
  if(!(form instanceof HTMLFormElement)||!form.reportValidity()) return;

  const formData=new FormData(form);
  const quantitiesByProductId=new Map();
  cart.forEach(item=>{
    quantitiesByProductId.set(item.productId,(quantitiesByProductId.get(item.productId)||0)+item.quantity);
  });

  const payload={
    customerName:String(formData.get("customerName")||"").trim(),
    customerPhone:String(formData.get("customerPhone")||"").trim(),
    deliveryAddress:String(formData.get("deliveryAddress")||"").trim(),
    deliveryCity:String(formData.get("deliveryCity")||"").trim(),
    deliveryState:String(formData.get("deliveryState")||"").trim(),
    items:Array.from(quantitiesByProductId,([productId,quantity])=>({productId,quantity}))
  };
  const customerEmail=String(formData.get("customerEmail")||"").trim();
  const deliveryInstructions=String(formData.get("deliveryInstructions")||"").trim();
  if(customerEmail) payload.customerEmail=customerEmail;
  if(deliveryInstructions) payload.deliveryInstructions=deliveryInstructions;

  if(submitButton){
    submitButton.disabled=true;
    submitButton.textContent="Placing order…";
  }
  setCartMessage("");

  try{
    const order=await apiRequest("/orders",{
      method:"POST",
      headers:{"Accept":"application/json","Content-Type":"application/json"},
      body:JSON.stringify(payload)
    });
    renderOrderConfirmation(order);
  }catch(error){
    setCartMessage(error instanceof Error?error.message:"Your order could not be placed. Please try again.",true);
  }finally{
    if(submitButton){
      submitButton.disabled=cart.length===0||cart.some(item=>!isValidProductId(item.productId));
      submitButton.textContent="Place Order";
    }
  }
}

function addCartItemRemovalHandler(){
  document.getElementById("cartItems")?.addEventListener("click",event=>{
    const button=event.target.closest("[data-cart-index]");
    if(!button) return;
    const index=Number(button.dataset.cartIndex);
    if(!Number.isInteger(index)||index<0||index>=cart.length) return;
    cart.splice(index,1);
    renderCart();
  });
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
const cartBackdrop=document.getElementById("cartBackdrop");
const closeCartBtn=document.getElementById("closeCartBtn");
const orderForm=document.getElementById("orderForm");

cartBtn?.addEventListener("click",()=>{
  if(cartPanel?.classList.contains("show")) hideCart();
  else showCart();
});

closeCartBtn?.addEventListener("click",hideCart);
cartBackdrop?.addEventListener("click",hideCart);
orderForm?.addEventListener("submit",submitOrder);
addCartItemRemovalHandler();
renderCart();

document.addEventListener("keydown",event=>{
  if(event.key==="Escape") hideCart();
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
z-index:2999;
`;

document.body.appendChild(whatsapp);