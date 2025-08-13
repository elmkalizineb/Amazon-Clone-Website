import { renderProductsList } from "./checkout/orderSummary.js";
import { renderPayementSummary } from "./checkout/payementSummary.js";
import { loadProducts , loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
// import '../data/cart-oop.js'
//import '../data/cart-class.js'
// import '../data/backend-practise.js'

// async =  makes a function return a promise 
 async function loadPage(){ 
    console.log('load page using async function ');

     await loadProductsFetch(); // wait until all products is loaded succesufully 

    await  new Promise((resolve) => {  // wait to load the cart 
        loadCart(() => {
            resolve('cart');
        });
    });

    renderProductsList();
    renderPayementSummary();


    return 'async function ';
}

// promises allows javascript to do multiple things at the same time

// 1-  we can use Promise.all function to run multiple promises in the same time 
/** 
Promise.all([ 
    loadProductsFetch(),
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
*/
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



