import { TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useMemo } from "react";
import useSWR from "swr";
import { CartItem, Shop } from "../../common/models";
import PricingCard from "../../components/order/PricingCard";
import ShoppingCartItem from "../../components/order/ShoppingCartItem";
import Tooltip from "../../components/Tooltip";
import { getCartItemsByUser } from "../../services/ShoppingCartService";

interface CartGroupItem {
  shop: Shop;
  items: CartItem[];
}

function ShoppingCart() {
  const { data, error, isLoading } = useSWR<CartItem[], Error>(
    "/cart-items",
    getCartItemsByUser,
    {
      revalidateOnFocus: false
    }
  );

  const group = useMemo<CartGroupItem[]>(() => {
    const items = [] as CartGroupItem[];

    if (!data || data.length === 0) {
      return items;
    }

    const shops = new Set(
      data
        .filter((item) => item.product.shop?.status === "ACTIVE")
        .map((item) => item.product.shop?.id!)
    );

    shops.forEach((id, i) => {
      const shopItems = data.filter((item) => item.product.shop?.id === id);
      const shop = shopItems[0].product.shop;
      if (shop && shopItems.length > 0) {
        items.push({
          shop: shop,
          items: shopItems
        });
      }
    });

    return items;
  }, [data]);

  // const list = [
  //   [1, 2],
  //   [3, 4]
  // ];

  let content = <div></div>;
  if (group.length === 0) {
    content = (
      <div className="text-center text-muted p-3">No products in cart.</div>
    );
  } else {
    content = (
      <div className="vstack gap-3">
        {group.map((g, i) => {
          return (
            <div key={i} className="card shadow-sm">
              <div className="card-header bg-white py-2h border-bottom">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox"></input>
                  <label className="form-check-label">{g.shop.name}</label>
                </div>
              </div>
              <div className="card-body">
                <div className="vstack gap-3">
                  {g.items.map((item, i) => {
                    return <ShoppingCartItem key={i} />;
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="vstack mb-5">
      <div className="bg-primary">
        <div className="container">
          <div className="row py-4 px-2">
            <nav aria-label="breadcrumb col-12">
              <ol className="breadcrumb mb-1">
                <li className="breadcrumb-item">
                  <Link href={`/`}>
                    <a className="text-light">Home</a>
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
            {group.length > 0 && (
              <div className="card mb-3 shadow-sm">
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
            )}
            {content}
          </div>
          <div className="col-lg-4 ">
            <PricingCard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
