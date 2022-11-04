import { HeartIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";
import { AuthenticationContext } from "../../common/contexts";
import { formatPrice } from "../../common/utils";
import { Product } from "../../models";
import { addToFavorite } from "../../services/FavoriteProductService";
import Tooltip from "../Tooltip";

interface InputProps {
  data?: Product;
  heading?: "seller" | "category";
  owner?: Boolean;
}

function ProductGridItem({ data, heading = "seller", owner }: InputProps) {
  const authContext = useContext(AuthenticationContext);
  const [addingToFavorite, setAddingToFavorite] = useState(false);

  const product = data ?? {
    id: "1",
    slug: "slug",
    name: "Product Name",
    price: 10000,
    images: [
      `https://source.unsplash.com/random/200x240?random=${Math.floor(
        Math.random() * 100
      )}`
    ],
    shop: { id: "1", name: "Seller", slug: "seller" },
    category: { id: "1", name: "Category", slug: "Category" }
  };
  let popular;
  let available;
  let image = product.images![0]!;
  let price = <>{formatPrice(product.price)} Ks</>;

  //   if (data.images && data.images.length > 0) {
  //     image = `${baseImagbaePath}/books%2F${data.images[0]}?alt=media`;
  //   }

  //   if (data.popular) {
  //     popular = (
  //       <div
  //         className="badge bg-danger py-2 position-absolute"
  //         style={{ top: "1rem", right: "1rem" }}
  //       >
  //         Popular
  //       </div>
  //     );
  //   }

  //   if (!data.available) {
  //     available = (
  //       <div className="bg-dark opacity-75 py-2 text-light position-absolute text-center bottom-0 start-0 end-0">
  //         Out Of Stock
  //       </div>
  //     );
  //   }

  //   if (data.isDiscount) {
  //     price = (
  //       <>
  //         {transformDiscount(data.price, data.discount)}&nbsp;
  //         {localize("kyat")}
  //         <del className="text-muted small fw-normal ms-1">
  //           {formatPrice(data.price)}&nbsp;
  //           {localize("kyat")}
  //         </del>
  //       </>
  //     );
  //   }

  return (
    <div className="card h-100">
      <Link href={`/products/${product.slug}`}>
        <a className="text-decoration-none">
          <div
            className="position-relative"
            onContextMenu={(e) => e.preventDefault()}
          >
            <div className="ratio ratio-1x1">
              <Image
                className="card-img-top"
                src={image}
                alt="Product image."
                layout="fill"
                objectFit="cover"
                priority
              />
            </div>
            {available && available}
            {popular && popular}
          </div>
        </a>
      </Link>
      <div className="card-body">
        <div className="vstack">
          {heading === "seller" ? (
            <Link href={`/shops/${product.shop?.slug}`}>
              <a className="text-decoration-none small text-truncate link-warning fw-medium">
                {product.shop?.name}
              </a>
            </Link>
          ) : (
            <Link href={`/categories/${product.category?.slug}`}>
              <a className="text-decoration-none small text-truncate link-warning fw-medium">
                {product.category?.name}
              </a>
            </Link>
          )}

          <Link href={`/products/${product.slug}`}>
            <a
              className="text-muted text-decoration-none text-truncate"
              style={{ fontSize: 18 }}
            >
              {product.name}
            </a>
          </Link>

          <h6 className="fw-semibold mt-2 mb-3">{price}</h6>

          <div className="hstack align-items-stretch gap-2">
            <button
              disabled={false}
              className="btn btn-primary flex-grow-1"
              onClick={() => {
                // addToCard(data, settingContext.setting.minimumOrderLimit)
                //   .then((result) => {
                //     if (result) {
                //       toast.success(localize("product_added_to_cart"));
                //     } else {
                //       toast.info(localize("product_already_in_cart"));
                //     }
                //   })
                //   .catch((e) => {
                //     console.log(e);
                //   });
              }}
            >
              Add to cart
            </button>
            <Tooltip title="Add to favorite">
              {!addingToFavorite ? (
                <button
                  disabled={addingToFavorite}
                  className="btn btn-outline-light text-primary border h-100 hstack"
                  onClick={async () => {
                    try {
                      setAddingToFavorite(true);
                      if (
                        authContext.payload &&
                        authContext.status === "success"
                      ) {
                        await addToFavorite({
                          userId: authContext.payload.id,
                          productId: product.id
                        });
                      } else {
                      }
                    } catch (e) {
                      console.log(e);
                    } finally {
                      setAddingToFavorite(false);
                    }
                  }}
                >
                  <HeartIcon width={20} strokeWidth={2} />
                </button>
              ) : (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              )}
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductGridItem;
