"use client";
import { withAuthentication } from "@/common/WithAuthentication";
import { CartItem, Shop } from "@/common/models";
import { parseErrorResponse } from "@/common/utils";
import Alert from "@/components/Alert";
import Loading from "@/components/Loading";
import PricingCard from "@/components/checkout/PricingCard";
import ShoppingCartItem from "@/components/checkout/ShoppingCartItem";
import { getCartItemsByUser } from "@/services/ShoppingCartService";
import Link from "next/link";
import { CSSProperties, useCallback, useEffect, useMemo, useState } from "react";
import useSWR from "swr";

interface CartGroupItem {
  shop: Shop;
  items: CartItem[];
}

function ShoppingCartPage() {
  const { data, error, isLoading, mutate } = useSWR<CartItem[], Error>(
    "/profile/cart-items",
    getCartItemsByUser,
    {
      revalidateOnFocus: false
    }
  );

  const itemComparator = useCallback((a: CartItem, b: CartItem) => {
    return a.product.id === b.product.id && a.variant?.id === b.variant?.id;
  }, []);

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
        .filter((item) => item.product?.shop?.status === "APPROVED")
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
            const index = currentSelection.findIndex((v) =>
              itemComparator(v, item)
            );
            if (index >= 0) {
              currentSelection[index] = item;
            }
          });

        return currentSelection;
      }
      return old;
    });
  }, [group, itemComparator]);

  const content = () => {
    if (isLoading) {
      return <Loading />;
    }

    if (error) {
      return <Alert message={parseErrorResponse(error)} variant="danger" />;
    }

    if (group.length === 0) {
      return <Alert message="No products in cart" />;
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
                          selectedItems.findIndex((v) =>
                            itemComparator(v, item)
                          ) >= 0
                        }
                        handleCheck={(checked) => {
                          if (checked) {
                            setSelectedItems((old) => [...old, item]);
                          } else {
                            setSelectedItems((old) => {
                              old.splice(
                                selectedItems.findIndex((v) =>
                                  itemComparator(v, item)
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
              <ol
                className="breadcrumb mb-1"
                style={
                  {
                    "--bs-breadcrumb-divider-color": "#bbb",
                    "--bs-breadcrumb-item-active-color": "#bbb"
                  } as CSSProperties
                }
              >
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
          <div className="col-lg-8">{content()}</div>
          <div className="col-lg-4 ">
            <PricingCard items={selectedItems} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuthentication(ShoppingCartPage);
