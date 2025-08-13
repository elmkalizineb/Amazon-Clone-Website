import { renderProductsList } from "./checkout/orderSummary.js";
import { renderPayementSummary } from "./checkout/payementSummary.js";
import { loadProducts } from "../data/products.js";
import { loadCart } from "../data/cart.js";
// import '../data/cart-oop.js'
//import '../data/cart-class.js'
// import '../data/backend-practise.js'

// promises allows javascript to do multiple things at the same time

// 1-  we can use Promise.all function to run multiple promises in the same time 
Promise.all([ 
    new Promise((resolve) => {
        // console.log('start promise :  first step : loading products  ');
        loadProducts(() => {
            // console.log('finished loading');
            resolve('products');
        });
    }),
    new Promise((resolve) => {
        loadCart(() => {
            resolve('cart');
        });
    })
]).then((values)=>{
    // console.log('third  step  : render the page ');
    // console.log(values);
    renderProductsList();
    renderPayementSummary();
});

// 2- another  way of using promises : nested then 
/**
 * 
new Promise((resolve) => {
    // console.log('start promise :  first step : loading products  ');
    loadProducts(() => {
        // console.log('finished loading');
        resolve('value1');
    });
}).then((value) => {
    // console.log('second step : loading  cart  ');
    //  console.log(value);
    return new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });
    });
}).then(() => {
    // console.log('third  step  : render the page ');
    renderProductsList();
    renderPayementSummary();
});
*/

// loading without promises 
/**
 * loadProducts(() => {
    loadCart(() => {
        renderProductsList();
        renderPayementSummary();
    });

});
 * 
 */



