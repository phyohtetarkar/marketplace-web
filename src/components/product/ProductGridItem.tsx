import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "../../common/utils";
import Tooltip from "../Tooltip";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

function ProductGridItem() {
  let popular;
  let available;
  let image = `https://source.unsplash.com/random/200x240?random=${Math.floor(
    Math.random() * 100
  )}`;
  let price = <>{formatPrice(1000)} Ks</>;

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
      <Link href={`/products/${1}`}>
        <a className="text-decoration-none">
          <div
            className="position-relative"
            onContextMenu={(e) => e.preventDefault()}
          >
            <div className="ratio ratio-4x3">
              <Image
                className="card-img-top"
                src={image}
                alt="Product image."
                layout="fill"
                objectFit="cover"
              />
            </div>
            {available && available}
            {popular && popular}
          </div>
        </a>
      </Link>
      <div className="card-body">
        <div className="vstack">
          <Link href={`/products/${1}`}>
            <a className="text-muted text-decoration-none text-truncate">
              Product name
            </a>
          </Link>

          <Link href={`/shops/shop-slug`}>
            <a className="text-decoration-none fw-medium text-truncate">
              Seller
            </a>
          </Link>

          <div className="hstack gap-2 mt-1">
            <h6 className="fw-semibold mb-0">{price}</h6>
            <div className="flex-grow-1"></div>
            <Tooltip title="Add to cart">
              <button
                disabled={false}
                className="btn btn-outline-light text-dark border"
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
                <ShoppingCartIcon width={24} />
              </button>
            </Tooltip>
            {/* <Tooltip title="Add to favorite">
              <button
                disabled={false}
                className="btn btn-outline-light text-dark border"
                onClick={() => {}}
              >
                <Heart size={20} />
              </button>
            </Tooltip> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductGridItem;
