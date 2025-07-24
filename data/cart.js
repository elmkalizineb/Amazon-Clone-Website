 export const cart =[]; // using modules 
 export function addToCart(productId) {

    let matchingItem;
    let quantityClass = `#select-quantity-${productId}`;
    let quantity = Number(document.querySelector(quantityClass).value);
    console.log(quantity);

    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matchingItem = cartItem;
        }
    });
    if (matchingItem) {
        matchingItem.quantity += quantity;
    } else {
        cart.push({ productId, quantity }); // shorthand property
    }

}
export function updateCartQuantity(){

   
        let totatQuantity = 0;
        cart.forEach((cartItem) => {
            totatQuantity += cartItem.quantity;
        });
        // console.log(totatQuantity);
        // console.log(cart);
}