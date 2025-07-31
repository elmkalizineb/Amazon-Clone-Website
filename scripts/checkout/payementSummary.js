import { cart, calculateCartQuantity, removeFromCart, updateDeliveryOption } from '../../data/cart.js';
import { getProduct } from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import { deliveryOptions, dateToString, getDeliveryOption } from '../../data/deliveryOptions.js';

export function renderPayementSummary() {

    let totalPriceCents = 0;
    let shippingCost = 0;
    let totalBeforeTax = 0;
    let EstimatedTax = 0;
    let totalOrder = 0;

    // render the total price of the products selected 
    // rendes the total shipping cost 
    cart.forEach((cartItem) => {
        const product = getProduct(cartItem.productId);
        totalPriceCents += cartItem.quantity * product.priceCents;

        const option = getDeliveryOption(cartItem.deliveryOptionId);

        // all the prices in cents 

        shippingCost += option.priceCents;
    });

    totalBeforeTax = totalPriceCents + shippingCost;

    EstimatedTax = totalBeforeTax * 0.1;

    totalOrder = totalBeforeTax + EstimatedTax;

    const payementSummaryHTML = `
        <div class="payement-summary-title">Order Summary</div>
          <div class="payement-summary-info">
            <div class="info-text">
              <div class="items-text">Items (${calculateCartQuantity()}):</div>
            </div>
            <div class="info-price" id="total-price">$${formatCurrency(totalPriceCents)}</div>
          </div>
          <div class="payement-summary-info shipping">
            <div class="info-text">Shipping & handling:</div>
            <div class="info-price">$${formatCurrency(shippingCost)}</div>
          </div>
          <div class="payement-summary-info total-before-tax">
            <div class="info-text">Total before tax :</div>
            <div class="info-price">$${formatCurrency(totalBeforeTax)}</div>
          </div>
          <div class="payement-summary-info">
            <div class="info-text">Estimated Tax (10%):</div>
            <div class="info-price">$${formatCurrency(EstimatedTax)}</div>
          </div>
          <div class="payement-summary-info order-total">
            <div class="info-text">Order total :</div>
            <div class="info-price">$${formatCurrency(totalOrder)}</div>
          </div>

          <div class="order">
            <button>Place your order</button>
          </div>
        </div>
    `;


    document.querySelector('.payement-summary').innerHTML = payementSummaryHTML;

}