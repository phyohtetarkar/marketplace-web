import { MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { useSWRConfig } from "swr";
import { AuthenticationContext } from "../../common/contexts";
import { CartItem } from "../../common/models";
import {
  formatPrice,
  parseErrorResponse,
  transformDiscount
} from "../../common/utils";
import { removeFromCart } from "../../services/ShoppingCartService";

interface ShoppingCartItemProps {
  item: CartItem;
  reload?: (item: CartItem) => void;
}

function ShoppingCartItem({ item }: ShoppingCartItemProps) {
  // let image = `https://source.unsplash.com/random/200x240?random=${Math.floor(
  //   Math.random() * 100
  // )}`;
  const authContext = useContext(AuthenticationContext);

  const { mutate } = useSWRConfig();

  const [removing, setRemoving] = useState(false);

  const [quantity, setQuantity] = useState(item.quantity);

  const image = item.product?.thumbnail ?? "/images/placeholder.jpeg";

  let price = <>{formatPrice(item.product?.price ?? 0)} Ks</>;

  if (item.product?.discount) {
    price = (
      <>
        <del className="text-muted small fw-normal me-1">
          {formatPrice(item.product?.price ?? 0)}&nbsp;Ks
        </del>
        {transformDiscount(item.product.discount, item.product.price, quantity)}
        &nbsp;Ks
      </>
    );
  }

  const getQtyInput = () => {
    return (
      <div className="input-group">
        <button className="btn btn-outline text-muted border border-end-0">
          <MinusIcon width={20} />
        </button>
        <div
          className="bg-light align-items-center justify-content-center d-flex border"
          style={{ minWidth: 44 }}
        >
          {item.quantity}
        </div>
        <button className="btn btn-outline text-muted border border-start-0">
          <PlusIcon width={20} />
        </button>
      </div>
    );
  };

  return (
    <div className="hstack">
      <div className="row flex-grow-1 gap-3">
        <div className="col-12 col-lg">
          <div className="hstack gap-2">
            <input className="form-check-input" type="checkbox"></input>
            <div className="flex-shink-0">
              <Link href={`/products/${item.product?.slug}`} className="text-decoration-none">

                <div
                  className="position-relative"
                  onContextMenu={(e) => e.preventDefault()}
                  style={{ height: 100, width: 100 }}
                >
                  <Image
                    className="rounded border"
                    src={image}
                    alt="Product image."
                    layout="fill"
                    objectFit="contain"
                    priority
                  />
                </div>

              </Link>
            </div>
            <div className="ms-2 vstack overflow-hidden">
              <h6 className="mb-0">
                <Link
                  href={`/products/${item.product?.slug}`}
                  className="link-dark text-decoration-none text-truncate d-block">

                  {item.product?.name}

                </Link>
              </h6>
              {item.variant && (
                <div className="d-flex flex-wrap gap-1">
                  <small className="text-muted">{item.variant.title}</small>
                  {/* {item.variant.options.map((op, j) => {
                    return (
                      <small key={j} className="text-muted">
                        {op.value}
                      </small>
                    );
                  })} */}
                </div>
              )}
              <div className="flex-grow-1"></div>
              <div>
                <h6 className="mb-0">{price}</h6>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-auto">
          <div className="hstack h-100">
            <div>{getQtyInput()}</div>

            <button
              className="btn btn-danger ms-auto ms-lg-4 position-relative"
              disabled={removing}
              onClick={() => {
                setRemoving(true);
                removeFromCart([item.id ?? 0])
                  .then((resp) => {
                    toast.success("Cart item removed");
                    mutate("/cart-items");
                    mutate(["/cart-items/count", authContext.payload?.id]);
                  })
                  .catch((error) => {
                    const msg = parseErrorResponse(error);
                    toast.error(msg);
                  })
                  .finally(() => {
                    setRemoving(false);
                  });
              }}
            >
              {removing && (
                <div className="position-absolute top-50 start-50 translate-middle">
                  <span
                    className="spinner-border spinner-border-sm "
                    role="status"
                    aria-hidden={!removing}
                  ></span>
                </div>
              )}
              <TrashIcon
                width={20}
                style={{
                  visibility: removing ? "hidden" : "visible"
                }}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCartItem;
