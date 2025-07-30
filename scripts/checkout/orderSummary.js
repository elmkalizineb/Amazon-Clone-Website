import { cart, calculateCartQuantity, removeFromCart, updateDeliveryOption } from '../../data/cart.js';
import { products } from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
// dayjs external libairie (ESM version)
// ESM = module +  js External libairie 
import { deliveryOptions, dateToString } from '../../data/deliveryOptions.js';

export function renderProductsList(){

  document.querySelector('.items-text').innerHTML = ` ( ${calculateCartQuantity()} )`;

  let cartSummaryHtml = '';

  cart.forEach((cartItem, index) => {

    const productId = cartItem.productId;
    const matchingProduct = products.find(product => product.id === productId);

    // get the  delivery option selected  
    const deliveryOptionId = cartItem.deliveryOptionId;
    let deliveryOption;

    deliveryOptions.forEach((option) => {
      if (option.id === deliveryOptionId) {
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
                  ${deliveryOptionsHTML(matchingProduct, cartItem)}
                </div>
              </div>
            </div>
    `;

  });

  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let deliveryHTML = ``;

    deliveryOptions.forEach((deliveryOption) => {

      const dateString = deliveryOption ? dateToString(deliveryOption) : 'No date available';

      const priceString = deliveryOption.priceCents === 0
        ? 'FREE'
        : `$${formatCurrency(deliveryOption.priceCents)} - `;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      deliveryHTML +=
        ` <div class="delivery-option" data-product-id ="${matchingProduct.id}" data-delivery-option-id ="${deliveryOption.id}">
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
      const container = document.querySelector(`.product-${productId}`);
      container.classList.add('is-editing-quantity');

    })

  });

  document.querySelectorAll('.save-quantity-link').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();

      const productId = link.dataset.productId;
      const container = document.querySelector(`.product-${productId}`);
      const newQuantity = Number(container.querySelector('.quantity-input').value``);

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

  document.querySelectorAll(`.delivery-option`).forEach((element) => {
    element.addEventListener('click', () => {
      const productId = element.dataset.productId;
      const deliveryOptionId = element.dataset.deliveryOptionId;
      updateDeliveryOption(productId, deliveryOptionId);
      renderProductsList(); // to render the page automatically 

    });
  });
}

