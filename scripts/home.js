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
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>
          <div class="product-price">$${(product.priceCents / 100).toFixed(2)}</div>
          <div class="product-quantity">
            <select id="select-quantity">
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
            <button class="add-to-cart-button" 
            data-product-id="${product.id}">
                Add to Cart
            </button>
          </div>
        </div>
   `;
});


document.querySelector('.main-content').innerHTML = productsHtml;

// add to cart button 
document.querySelectorAll('.add-to-cart-button').forEach((button) => {
    // add an event  for button add to cart 
    button.addEventListener('click', () => {
        const productId = button.dataset.productId;

        let matchingItem;

        cart.forEach((item) =>{
            if(productId === item.productId){
                matchingItem =item;
            }
        });
        if(matchingItem){
            matchingItem.quantity +=1;
        }else{ 
           cart.push(
            {
                productId: productId,
                quantity:1

        });  
        }
        
        console.log(cart);     
    });
});

