import {cart, addToCart , calculateCartQuantity} from '../data/cart.js'; // using module 
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';

if(!calculateCartQuantity() ){
  document.querySelector('.cart-quantity').innerHTML=``;
}else{
  document.querySelector('.cart-quantity').innerHTML= calculateCartQuantity();
}

let productsHtml = '';

// display buttons in the home page 
products.forEach(product => {
    productsHtml += `
        <div class="product">
          <div class="product-img">
            <img src="${product.image}" alt="product image" />
          </div>
          <div class="product-description">${product.name}</div>
          <div class="product-rating">
             <img class="product-rating-stars"
              src="${product.getStarsUrl()}">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>
          <div class="product-price">${product.getPrice()}</div>
          <div class="product-quantity">
            <select id="select-quantity-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>
          <div class="add-to-cart">
            <div class="  js-addToCartCheck-${product.id} add-to-cart-text-hidden"> 
              <img src="images/icons/check-mark.png" >
              <p>Added</p>
            </div>
            <button class="add-to-cart-button" 
            data-product-id="${product.id}">
                Add to Cart
            </button>
          </div>
        </div>
   `;
});


document.querySelector('.main-content').innerHTML = productsHtml;

function updateCartQuantity(){
        document.querySelector('.cart-quantity').innerHTML = calculateCartQuantity();
}

// add to cart button 
document.querySelectorAll('.add-to-cart-button').forEach((button) => {
    // add an event  for button add to cart 
    button.addEventListener('click', () => {
        // const productId = button.dataset.productId;
        const { productId } = button.dataset; //  Object destructuring shortcut
        addToCart(productId);

         // change the total quantity on the header of the page 
        updateCartQuantity();


        let addedTextClass = `.js-addToCartCheck-${productId}`;

        const box = document.querySelector(addedTextClass);
        box.classList.add('add-to-cart-text-visible');

        //  set timeout hide it after 1.5s 
        // setTimeout(()=>{
        //     box.classList.remove('add-to-cart-text-visible');
        // },2000);

        // set timeout 2s and clear all previous timeout if we click agin before 2s 
        const listTimeouts = [];

        const previousTimeoutId = listTimeouts[productId];

        if (previousTimeoutId) {
            clearTimeout(previousTimeoutId);
        }

        const timeoutId = setTimeout(() => {
            box.classList.remove('add-to-cart-text-visible');
        }, 2000);

        // save the timeoutId for this product 
        listTimeouts[productId] = timeoutId;
    });

});

