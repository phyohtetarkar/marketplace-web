import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { CartItem } from "../../common/models";
import { formatNumber, transformDiscount } from "../../common/utils";

interface PricingCardProps {
  items: CartItem[];
}

function PricingCard(props: PricingCardProps) {
  const { items } = props;

  const router = useRouter();

  const summary = useMemo(() => {
    let quantity = 0;
    let subTotalPrice = 0;
    let totalPrice = 0;
    let discount = 0;
    for (const item of items) {
      quantity += item.quantity;

      const price = item.variant?.price ?? item.product.price ?? 0;
      subTotalPrice += price * item.quantity;

      if (item.product.discount) {
        totalPrice += transformDiscount(
          item.product.discount,
          price,
          item.quantity
        );
      } else {
        totalPrice += price * item.quantity;
      }
    }

    discount = subTotalPrice - totalPrice;

    return { quantity, subTotalPrice, totalPrice, discount };
  }, [items]);
  return (
    <div className="card">
      <div className="card-body">
        <div className="vstack gap-2">
          <div className="d-flex justify-content-between">
            <span>Total products</span>
            <span>{summary.quantity}</span>
          </div>
          <div className="d-flex justify-content-between">
            <span>Subtotal</span>
            <span>{formatNumber(summary.subTotalPrice)}</span>
          </div>
          <div className="d-flex justify-content-between">
            <span>Discount</span>
            <span className="text-danger">
              -{formatNumber(summary.discount)}
            </span>
          </div>
          {/* {showDelivery && (
            <div className="d-flex justify-content-between">
              <span>{localize("delivery_fee")}</span>
              <span className="text-success">
                +{formatPrice(fee)}&nbsp;{localize("kyat")}
              </span>
            </div>
          )} */}
          <div className="d-flex justify-content-between">
            <span>Delivery Fee</span>
            <span className="text-success">Depend on shop</span>
          </div>

          <hr className="text-muted" />

          <div className="hstack gap-2">
            <span className="h5 fw-bold">Total price</span>
            <div className="flex-grow-1"></div>
            <span className="fw-bold h5 mb-0">
              {formatNumber(summary.totalPrice)}
            </span>
          </div>
          <div className="d-grid gap-2 mt-3">
            {/* <button className="btn btn-primary py-2">Checkout</button> */}
            <button
              className="btn btn-primary py-2"
              disabled={items.length === 0}
              onClick={(evt) => {
                try {
                  if (items.length > 0) {
                    sessionStorage.setItem(
                      "shopId",
                      `${items[0].product.shop?.id ?? 0}`
                    );
                    sessionStorage.setItem("cartItems", JSON.stringify(items));
                    router.push("/checkout");
                  }
                } catch (error) {
                  console.log(error);
                }
              }}
            >
              Checkout
            </button>
            <Link href={"/"} className="btn btn-default py-2">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PricingCard;
