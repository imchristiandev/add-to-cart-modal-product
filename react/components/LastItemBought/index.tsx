import React from 'react';
import { useCssHandles } from 'vtex.css-handles';
import { useCheckoutURL } from 'vtex.checkout-resources/Utils';
import { useOrderForm } from 'vtex.order-manager/OrderForm';
import { useProduct } from 'vtex.product-context';

const CSS_HANDLES = [
  "product",
  "product__info",
  "product__image",
  "product__data",
  "product__brand",
  "product__name",
  "product__sku",
  "product__quantity",
  "product__deliveryOption",
  "checkout",
  "checkout__subtotal",
  "checkout__subtotalStrong",
  "checkout__buttonContainer",
  "checkout__buttonOne",
  "checkout__buttonTwo"
] as const;

const LastItemBought = () => {
  const product: any = useProduct();
  const handles = useCssHandles(CSS_HANDLES);
  const { url: checkoutUrl } = useCheckoutURL();
  const {
    orderForm: { items, totalizers },
  } = useOrderForm()
  const orderFormItems = { items };
  const orderFormTotalizers = { totalizers };
  const orderFormValue = orderFormTotalizers.totalizers[0].value / 100;
  const brand = document.querySelector('.vtex-store-components-3-x-productBrandName.vtex-store-components-3-x-productBrandName--brand-class')?.textContent;
  console.log("Current Product", product.selectedItem);
  return (
    // TODO: Validate if the product exists in list;
    <>
      <div className={handles.product}>
        <div className={handles.product__info}>
          <div className={handles.product__image}>
            <img src={product.selectedItem.images[0].imageUrl} />
          </div>
          <div className={handles.product__data}>
            <p className={handles.product__brand}>{brand}</p>
            <h3 className={handles.product__name}>{product.selectedItem.name}</h3>
            <p className={handles.product__sku}><strong>SKU:</strong> {product.selectedItem.itemId}</p>
            <p className={handles.product__quantity}><strong>Quantity:</strong> {product.selectedQuantity}</p>
            <p className={handles.product__deliveryOption}><strong>Delivery Option:</strong></p>
          </div>
        </div>
        <div className={handles.checkout}>
          <h3 className={handles.checkout__subtotal}>
            <strong className={handles.checkout__subtotalStrong}>Subtotal:</strong> ({orderFormItems.items.length}) Items <strong className={handles.checkout__subtotalStrong}>${orderFormValue}</strong>
          </h3>
          <div className={handles.checkout__buttonContainer}>
            <a href={checkoutUrl} className={handles.checkout__buttonOne}>
              CHECKOUT
            </a>
            <a href={checkoutUrl} className={handles.checkout__buttonTwo}>
              VIEW CART
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default LastItemBought;