import { cart, calculateCartQuantity, removeFromCart } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';

// console.log("Script is running ✅");
// console.log("Cart array:", cart);
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

  cartSummaryHtml += `
     <div class="product-${matchingProduct.id}">
            <div class="product-delivery-date">
              <div class="delivery-date-text">Delivery : Tuesday , June 21</div>
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
                <div class="delivery-option">
                  <input
                    type="radio"
                    checked
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}"
                  />
                  <div>
                    <div class="delivery-option-date">Tuesday, June 21</div>
                    <div class="delivery-option-price">FREE Shipping</div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input
                    type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}"
                  />
                  <div>
                    <div class="delivery-option-date">Wednesday, June 15</div>
                    <div class="delivery-option-price">$4.99 - Shipping</div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input
                    type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}"
                  />
                  <div>
                    <div class="delivery-option-date">Monday, June 13</div>
                    <div class="delivery-option-price">$9.99 - Shipping</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  `;
});

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