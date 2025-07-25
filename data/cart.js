
export let cart =[
    {
        productId : 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity : 2
    },
    {
        productId : '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity : 4
    }
 ]; // using modules 

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

export  function removeFromCart(productId){
    const newCart = [];

    cart.forEach((cartItem)=>{

        if(cartItem.productId !== productId){
            newCart.push(cartItem);
        }

    });

    cart = newCart;
}
 