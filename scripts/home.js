
const products = [
    {
        image: "images/products/athletic-cotton-socks-6-pairs.jpg",
        name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
        rating: {
            stars: 4.5,
            count: 87
        },
        priceCents: 1090
    },
    {
        image: "images/products/intermediate-composite-basketball.jpg",
        name: "Intermediate Size Basketball",
        rating: {
            stars: 4,
            count: 127
        },
        priceCents: 2095
    },
];
let productsHtml ='';
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
            <button class="add-to-cart-button">Add to Cart</button>
          </div>
        </div>
   `;
});

document.querySelector('.main-content').innerHTML =productsHtml;