import { cart, calculateCartQuantity, removeFromCart } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
// dayjs external libairie (ESM version)
// ESM = module +  js External libairie 
import { deliveryOptions , dateToString } from '../data/deliveryOptions.js';

// console.log("Script is running ✅");
console.log("Cart array:", cart);
// console.log("Products array:", products);

document.querySelector('.items-text').innerHTML = ` ( ${calculateCartQuantity()} )`;

let cartSummaryHtml = '';

cart.forEach((cartItem, index) => {
  //   console.log(`⏳ Processing cart item ${index}:`, cartItem);

  const productId = cartItem.productId;
  const matchingProduct = products.find(product => product.id === productId);

  //   if (!matchingProduct) {
  //     console.warn(`⚠️ No matching product for ID: ${productId}`);
  //     return;
  //   }

  //   console.log(`✅ Found product: ${matchingProduct.name}`);

   // get the  delivery option selected  
   const deliveryOptionId = cartItem.deliveryOptionsId;
   let deliveryOption;

   deliveryOptions.forEach((option) => {
    if(option.id === deliveryOptionId){
      deliveryOption = option;
    }
   })

   const dateString = deliveryOption ? dateToString(deliveryOption) : 'No date available';

  cartSummaryHtml += `
     <div class="product-${matchingProduct.id}">
            <div class="product-delivery-date">
              <div class="delivery-date-text">Delivery Date  : ${dateString}</div>
              <div class="product-info">
                <div class="product-img">
                  <img
                    src="${matchingProduct.image}"
                    alt=""
                  />
                </div>
                <div id="desc-container">
                  <div class="product-description">
                    ${matchingProduct.name}
                  </div>
                  <div class="product-price">$${formatCurrency(matchingProduct.priceCents)}</div>
                  <div class="product-quantity">
                    <div id="text">Quantity: ${cartItem.quantity}</div>
                      <a class="update-product-btn"  data-product-id="${matchingProduct.id}" >Update</a>
                      <input  class="quantity-input" type="number" name="newQuantity" >
                      <a class="save-quantity-link"  data-product-id="${matchingProduct.id}" >Save</a>
                      <a class="delete-product-btn" data-product-id="${matchingProduct.id}">Delete</a>
                  </div>
                </div>
              </div>
              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div> 
                ${deliveryOptionsHTML(matchingProduct,cartItem)}
              </div>
            </div>
          </div>
  `;

});

function deliveryOptionsHTML(matchingProduct , cartItem) {
  let deliveryHTML =``;

  deliveryOptions.forEach((deliveryOption) => {

    console.log('Delivery Option:', deliveryOption); // ✅ Debugging
    console.log('Delivery Days:', deliveryOption.deliveryDays); // ✅ Should be a number
    
    
   const dateString = deliveryOption ? dateToString(deliveryOption) : 'No date available';

    const priceString = deliveryOption.priceCents === 0
      ? 'FREE'
      : `$${formatCurrency(deliveryOption.priceCents)} - `;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

     deliveryHTML +=
     ` <div class="delivery-option">
                  <input
                    type="radio"
                    ${isChecked ? 'checked' : ''}
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}"
                  />
                  <div>
                    <div class="delivery-option-date">${dateString}</div>
                    <div class="delivery-option-price"> ${priceString} Shipping</div>
                  </div>
                </div> `;
  });

  return deliveryHTML;
}

document.querySelector('.products').innerHTML = cartSummaryHtml;

// console.log("✅ Final cartSummaryHtml:", cartSummaryHtml);

// delete update 
document.querySelectorAll('.delete-product-btn').forEach((btn) => {
  btn.addEventListener('click', () => {

    const productId = btn.dataset.productId;
    removeFromCart(productId);
    // console.log(cart);

    const container = document.querySelector(`.product-${productId}`);
    console.log(container);
    // remove the element from html page 
    container.remove();
    document.querySelector('.items-text').innerHTML = ` ( ${calculateCartQuantity()} )`;


  });
});

// update button 

document.querySelectorAll('.update-product-btn').forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
    //  console.log(productId);
    const container = document.querySelector(`.product-${productId}`);
    container.classList.add('is-editing-quantity');

  })

});

document.querySelectorAll('.save-quantity-link').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();

    const productId = link.dataset.productId;
    const container = document.querySelector(`.product-${productId}`);
    const newQuantity = Number(container.querySelector('.quantity-input').value2``);

    if (newQuantity > 0) {
      const cartItem = cart.find(item => item.productId === productId);
      if (cartItem) {
        cartItem.quantity = newQuantity;
      }
    }
    localStorage.setItem('cart', JSON.stringify(cart)); // save updated cart 
    container.classList.remove('is-editing-quantity');

    //update displayed quantity 
    container.querySelector('#text').textContent = `Quantity : ${newQuantity}`;
    document.querySelector('.items-text').innerHTML = `( ${calculateCartQuantity()})`;

  })

});

