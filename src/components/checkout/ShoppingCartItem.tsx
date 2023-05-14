import { MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useContext, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useSWRConfig } from "swr";
import { AuthenticationContext, ProgressContext } from "../../common/contexts";
import { CartItem } from "../../common/models";
import {
  debounce,
  formatNumber,
  parseErrorResponse,
  transformDiscount
} from "../../common/utils";
import {
  removeFromCart,
  updateQuantity
} from "../../services/ShoppingCartService";

interface ShoppingCartItemProps {
  item: CartItem;
  handleCheck: (checked: boolean) => void;
  checked: boolean;
  enableCheck: boolean;
}

function ShoppingCartItem(props: ShoppingCartItemProps) {
  // let image = `https://source.unsplash.com/random/200x240?random=${Math.floor(
  //   Math.random() * 100
  // )}`;
  const { item, handleCheck, enableCheck, checked } = props;
  const authContext = useContext(AuthenticationContext);

  const progressContext = useContext(ProgressContext);

  const { mutate } = useSWRConfig();

  const [removing, setRemoving] = useState(false);

  const [quantity, setQuantity] = useState(item.quantity);

  const updateQty = async (value: CartItem) => {
    try {
      progressContext.update(true);
      await updateQuantity(value);
      mutate("/cart-items");
    } catch (error) {
      setQuantity(item.quantity);
      const msg = parseErrorResponse(error);
      toast.error(msg);
    } finally {
      progressContext.update(false);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const processUpdateQty = useMemo(() => debounce(updateQty, 500), []);

  const getQtyInput = () => {
    return (
      <div className="input-group">
        <button
          className="btn btn-outline text-muted border border-end-0"
          onClick={() => {
            if (quantity > 1) {
              const qty = quantity - 1;
              setQuantity(qty);

              processUpdateQty({
                ...item,
                quantity: qty
              });
            }
          }}
        >
          <MinusIcon width={20} />
        </button>
        <div
          className="bg-light align-items-center justify-content-center d-flex border"
          style={{ minWidth: 44 }}
        >
          {quantity}
        </div>
        <button
          className="btn btn-outline text-muted border border-start-0"
          onClick={() => {
            const qty = quantity + 1;
            if (item.variant?.stockLeft) {
              if (item.variant.stockLeft >= qty) {
                setQuantity(qty);
                processUpdateQty({
                  ...item,
                  quantity: qty
                });
              }
            } else if (item.product.stockLeft) {
              if (item.product.stockLeft >= qty) {
                setQuantity(qty);
                processUpdateQty({
                  ...item,
                  quantity: qty
                });
              }
            }
          }}
        >
          <PlusIcon width={20} />
        </button>
      </div>
    );
  };

  const image = item.product?.thumbnail ?? "/images/placeholder.jpeg";

  let price = <>{formatNumber(item.product?.price ?? 0)} Ks</>;

  if (item.product?.discount) {
    price = (
      <>
        <del className="text-muted small fw-normal me-1">
          {formatNumber(item.product?.price ?? 0)}&nbsp;Ks
        </del>
        {transformDiscount(item.product.discount, item.product.price, 1)}
        &nbsp;Ks
      </>
    );
  }

  return (
    <div className="hstack">
      <div className="row flex-grow-1 gap-3">
        <div className="col-12 col-lg">
          <div className="hstack gap-2">
            {enableCheck && (
              <input
                className="form-check-input"
                type="checkbox"
                disabled={!enableCheck}
                checked={checked}
                onChange={(evt) => handleCheck(evt.target.checked)}
              ></input>
            )}
            <div className="flex-shink-0">
              <Link
                href={`/products/${item.product?.slug}`}
                className="text-decoration-none"
              >
                <div
                  className="position-relative"
                  onContextMenu={(e) => e.preventDefault()}
                  style={{ height: 100, width: 100 }}
                >
                  <Image
                    className="rounded border"
                    src={image}
                    alt="Product image."
                    fill
                    sizes="33vw"
                    priority
                    style={{
                      objectFit: "contain"
                    }}
                  />
                </div>
              </Link>
            </div>
            <div className="ms-2 vstack overflow-hidden">
              <h6 className="mb-0">
                <Link
                  href={`/products/${item.product?.slug}`}
                  className="link-dark text-decoration-none text-truncate d-block"
                >
                  {item.product?.name}
                </Link>
              </h6>
              {item.variant && (
                <div className="d-flex flex-wrap gap-1">
                  <small className="text-muted">
                    {item.variant.attributes
                      .sort((f, s) => f.sort - s.sort)
                      .map((va) => `${va.attribute}: ${va.value}`)
                      .join(", ")}
                  </small>
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
              <div style={{ fontSize: 18 }}>{price}</div>
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
                    handleCheck(false);
                    mutate("/cart-items");
                    mutate(["/profile/cart-count", authContext.payload?.id]);
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
