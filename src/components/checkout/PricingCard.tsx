import Link from "next/link";
import { formatNumber } from "../../common/utils";

function PricingCard() {
  return (
    <div className="card">
      <div className="card-body">
        <div className="vstack gap-2">
          <div className="d-flex justify-content-between">
            <span>Total Products</span>
            <span>0</span>
          </div>
          <div className="d-flex justify-content-between">
            <span>Subtotal</span>
            <span>{formatNumber(0)}</span>
          </div>
          <div className="d-flex justify-content-between">
            <span>Discount</span>
            <span className="text-danger">-{formatNumber(0)}</span>
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
            <span className="text-success">+{formatNumber(0)}</span>
          </div>

          <hr className="text-muted" />

          <div className="d-flex justify-content-between">
            <span className="h5 fw-bold">Total Price</span>
            <span className="fw-bold h5 mb-0">{formatNumber(0)}</span>
          </div>

          {/* {!pricingOnly && (
            <div className="d-grid gap-2 mt-3">
              <Link href="/contact-info">
                <a className="btn btn-primary">Checkout</a>
              </Link>
              <Link href="/products">
                <a className="btn btn-outline-primary">Continue Shopping</a>
              </Link>
            </div>
          )}
          {children} */}
          <div className="d-grid gap-2 mt-3">
            {/* <button className="btn btn-primary py-2">Checkout</button> */}
            <Link href={"/checkout"} className="btn btn-primary py-2">
              Checkout
            </Link>
            <Link href={"/"} className="btn btn-outline-primary py-2">
              Contine Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PricingCard;
