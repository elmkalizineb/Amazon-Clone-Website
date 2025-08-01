
export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) { // cart === null 
    cart = [
        {
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 2,
            deliveryOptionId:'1'
        },
        {
            productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
            quantity: 4,
            deliveryOptionId:'2'
        }
    ];
}
function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}
export function calculateCartQuantity(){
    let totatQuantity = 0;
        cart.forEach((cartItem) => {
            totatQuantity += cartItem.quantity;
        });
        return totatQuantity;
}
export function addToCart(productId) {

    let matchingItem;
    let quantityClass = `#select-quantity-${productId}`;
    let quantity = Number(document.querySelector(quantityClass).value);
    // console.log(quantity);

    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matchingItem = cartItem;
        }
    });
    if (matchingItem) {
        matchingItem.quantity += quantity;
    } else {
        cart.push({
            productId:productId,
            quantity : quantity,
            deliveryOptionId : '1'

        }); 
    }

    saveToStorage();

}

export function removeFromCart(productId) {
    const newCart = [];

    cart.forEach((cartItem) => {

        if (cartItem.productId !== productId) {
            newCart.push(cartItem);
        }

    });

    cart.splice(0, cart.length, ...newCart);

    saveToStorage();
}

export function updateDeliveryOption(productId , deliveryOptionId){

    let matchingItem;
    cart.forEach((cartItem) =>{
        if(productId === cartItem.productId){
            matchingItem = cartItem;
        }
    });

    matchingItem.deliveryOptionId = deliveryOptionId;

    saveToStorage();

}