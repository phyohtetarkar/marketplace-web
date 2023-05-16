import Link from "next/link";
import { useContext, useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import { ProgressContext } from "../../common/contexts";
import { CartItem, Shop } from "../../common/models";
import { parseErrorResponse } from "../../common/utils";
import { withAuthentication } from "../../common/WithAuthentication";
import Alert from "../../components/Alert";
import PricingCard from "../../components/checkout/PricingCard";
import ShoppingCartItem from "../../components/checkout/ShoppingCartItem";
import Loading from "../../components/Loading";
import { getCartItemsByUser } from "../../services/ShoppingCartService";

interface CartGroupItem {
  shop: Shop;
  items: CartItem[];
}

function ShoppingCart() {
  const { data, error, isLoading, mutate } = useSWR<CartItem[], Error>(
    "/cart-items",
    getCartItemsByUser,
    {
      revalidateOnFocus: false
    }
  );

  const progressContext = useContext(ProgressContext);

  const [selectedShopId, setSelectedShopId] = useState<number>();

  const [selectedItems, setSelectedItems] = useState<CartItem[]>([]);

  useEffect(() => {
    sessionStorage.removeItem("shopId");
    sessionStorage.removeItem("cartItems");
  }, []);

  const group = useMemo<CartGroupItem[]>(() => {
    const items = [] as CartGroupItem[];

    if (!data || data.length === 0) {
      return items;
    }

    const shops = new Set(
      data
        .filter((item) => !item.product?.shop?.disabled)
        .map((item) => item.product?.shop?.id!)
    );

    const array = Array.from(shops);

    for (const shopId of array) {
      const shopItems = data.filter((item) => {
        return item.product?.shop?.id === shopId;
      });
      const shop = shopItems[0].product?.shop;
      if (shop && shopItems.length > 0) {
        items.push({
          shop: shop,
          items: shopItems
        });
      }
    }

    return items;
  }, [data]);

  useEffect(() => {
    setSelectedItems((old) => {
      const currentSelection = [...old];
      if (currentSelection.length > 0 && group.length > 0) {
        const shopId = currentSelection[0].product.shop?.id;
        group
          .filter((g) => g.shop.id === shopId)
          .flatMap((g) => g.items)
          .forEach((item) => {
            const index = currentSelection.findIndex((v) => v.id === item.id);
            if (index >= 0) {
              currentSelection[index] = item;
            }
          });

        return currentSelection;
      }
      return old;
    });
  }, [group]);

  // const list = [
  //   [1, 2],
  //   [3, 4]
  // ];

  // let content = <div></div>;
  // if (group.length === 0) {
  //   content = (
  //     <div className="text-center text-muted p-3">No products in cart.</div>
  //   );
  // } else {
  //   content = (
  //     <div className="vstack gap-3">
  //       {group.map((g, i) => {
  //         return (
  //           <div key={i} className="card shadow-sm">
  //             <div className="card-header bg-white py-2h border-bottom">
  //               <div className="form-check">
  //                 <input className="form-check-input" type="checkbox"></input>
  //                 <label className="form-check-label">{g.shop.name}</label>
  //               </div>
  //             </div>
  //             <div className="card-body">
  //               <div className="vstack gap-3">
  //                 {g.items.map((item, i) => {
  //                   return <ShoppingCartItem key={i} />;
  //                 })}
  //               </div>
  //             </div>
  //           </div>
  //         );
  //       })}
  //     </div>
  //   );
  // }

  const content = () => {
    if (isLoading) {
      return <Loading />;
    }

    if (error) {
      return <Alert message={parseErrorResponse(error)} variant="danger" />;
    }

    if (group.length === 0) {
      return (
        <div className="text-center text-muted p-3">No products in cart.</div>
      );
    }

    return (
      <div className="vstack gap-3">
        {group.map((g, i) => {
          return (
            <div key={i} className="card">
              <div className="card-header bg-white py-2h border-bottom">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    id={`shopCheck${g.shop.id}`}
                    checked={g.shop.id === selectedShopId}
                    onChange={(evt) => {
                      if (g.shop.id !== selectedShopId) {
                        setSelectedShopId(g.shop.id);
                        setSelectedItems([...g.items]);
                      }
                    }}
                  ></input>
                  <label
                    htmlFor={`shopCheck${g.shop.id}`}
                    className="form-check-label fw-medium"
                    role={"button"}
                  >
                    {g.shop.name}
                  </label>
                </div>
              </div>
              <div className="card-body">
                <div className="vstack gap-3">
                  {g.items.map((item, i) => {
                    return (
                      <ShoppingCartItem
                        key={i}
                        item={item}
                        enableCheck={g.shop.id === selectedShopId}
                        checked={
                          selectedItems.findIndex((v) => v.id === item.id) >= 0
                        }
                        handleCheck={(checked) => {
                          if (checked) {
                            setSelectedItems((old) => [...old, item]);
                          } else {
                            setSelectedItems((old) => {
                              old.splice(
                                selectedItems.findIndex(
                                  (v) => v.id === item.id
                                ),
                                1
                              );
                              return [...old];
                            });
                          }
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="vstack mb-5">
      <div className="header-bar">
        <div className="container">
          <div className="row py-4 px-2">
            <nav aria-label="breadcrumb col-12">
              <ol className="breadcrumb mb-1">
                <li className="breadcrumb-item">
                  <Link href={`/`} className="">
                    Home
                  </Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Shopping Cart
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
      <div className="container py-3">
        <div className="row g-3">
          <div className="col-lg-8">
            {/* {group.length > 0 && (
              <div className="card mb-3">
                <div className="card-body py-2h">
                  <div className="hstack gap-2 flex-grow-1">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                      ></input>
                      <label className="form-check-label">SELECT ALL</label>
                    </div>

                    <div className="flex-grow-1"></div>

                    <Tooltip title="Remove all">
                      <button disabled={false} className="btn btn-danger">
                        <TrashIcon width={20} />
                      </button>
                    </Tooltip>
                  </div>
                </div>
              </div>
            )} */}
            {content()}
          </div>
          <div className="col-lg-4 ">
            <PricingCard items={selectedItems} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuthentication(ShoppingCart);
