// using Object-Oriented Programming 

function Cart(localStorageKey){ // we use the function to create multiple instances of cart 
    const cart = {

    cartItems: undefined,
    loadFromStorage: function () {
        this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));

        if (!this.cartItems) { // cart === null 
            this.cartItems = [
                {
                    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                    quantity: 2,
                    deliveryOptionId: '1'
                },
                {
                    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                    quantity: 5,
                    deliveryOptionId: '2'
                }
            ];
        }
    },
    saveToStorage() { // shortcut for declaring function 
        localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    },
    addToCart(productId) {
        let matchingItem;

        cart.cartItems.forEach((item) => {
            if (item.productId === productId) {
                matchingItem = item;
            }
        });

        if (matchingItem) {
            matchingItem.quantity += 1;
        } else {
            cart.cartItems.push({
                productId: productId,
                quantity: 1,
                deliveryOptionId: '1'
            });
        }

        this.saveToStorage();
    },
    calculateCartQuantity() {
        let totatQuantity = 0;
        this.cartItems.forEach((cartItem) => {
            totatQuantity += cartItem.quantity;
        });
        return totatQuantity;
    },
    removeFromCart(productId) {
        const newCart = [];

        this.cartItems.forEach((cartItem) => {

            if (cartItem.productId !== productId) {
                newCart.push(cartItem);
            }

        });

        this.cart.splice(0, cart.length, ...newCart);

        this.saveToStorage();
    },

    updateDeliveryOption(productId, deliveryOptionId) {

        let matchingItem;
        this.cartItems.forEach((cartItem) => {
            if (productId === cartItem.productId) {
                matchingItem = cartItem;
            }
        });

        matchingItem.deliveryOptionId = deliveryOptionId;

        this.saveToStorage();

    }
}
return cart;
}

const cart =Cart('cart-oop'); // constructor
const businessCart =  Cart('cart-business');

cart.loadFromStorage();
businessCart.loadFromStorage();

console.log(cart);
console.log(businessCart);





