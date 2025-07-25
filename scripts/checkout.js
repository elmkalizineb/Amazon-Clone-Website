import { cart, removeFromCart } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';

// console.log("Script is running ✅");
// console.log("Cart array:", cart);
// console.log("Products array:", products);

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
                    <button class="update-product-btn">Update</button>
                    <button class="delete-product-btn" data-product-id="${matchingProduct.id}">Delete</button>
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

document.querySelectorAll('.delete-product-btn').forEach((btn) => {
    btn.addEventListener('click', () => {

        const productId = btn.dataset.productId;
        removeFromCart(productId);
        // console.log(cart);

       const container=  document.querySelector(`.product-${productId}`);
        console.log(container);
       // remove the element from html page 
       container.remove();

    });
});