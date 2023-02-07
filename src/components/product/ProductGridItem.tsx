import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";
import { AuthenticationContext } from "../../common/contexts";
import { Product } from "../../common/models";
import { formatPrice } from "../../common/utils";
import AddToCartButton from "./AddToCartButton";
import AddToFavoriteButton from "./AddToFavoriteButton";

interface ProductGridItemProps {
  value: Product;
  heading?: "seller" | "category";
}

function ProductGridItem({ value, heading = "seller" }: ProductGridItemProps) {
  const authContext = useContext(AuthenticationContext);
  const [addingToFavorite, setAddingToFavorite] = useState(false);

  let popular;
  let available;
  // let image = product.images![0]!;
  let price = <>{formatPrice(value.price ?? 0)} Ks</>;

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
    <div className="card h-100 border-0 shadow-sm">
      <Link href={`/products/${value.slug}`}>
        <a className="text-decoration-none">
          <div
            className="position-relative"
            onContextMenu={(e) => e.preventDefault()}
          >
            <div className="ratio ratio-4x3">
              <Image
                className="card-img-top"
                src={value.thumbnail ?? "/placeholder.jpeg"}
                alt="Product image."
                layout="fill"
                objectFit="contain"
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
            <Link href={`/shops/${value.shop?.slug}`}>
              <a className="text-decoration-none small text-truncate link-warning fw-medium">
                {value.shop?.name}
              </a>
            </Link>
          ) : (
            <Link href={`/categories/${value.category?.slug}`}>
              <a className="text-decoration-none small text-truncate link-warning fw-medium">
                {value.category?.name}
              </a>
            </Link>
          )}

          <Link href={`/products/${value.slug}`}>
            <a className="text-muted text-decoration-none text-truncate">
              {value.name}
            </a>
          </Link>

          <h6 className="fw-semibold mt-2 mb-3">{price}</h6>

          <div className="hstack align-items-stretch gap-2">
            {value.id && !value.withVariant && (
              <AddToCartButton productId={value.id} className="flex-grow-1" />
            )}
            {value.id && value.withVariant && (
              <Link href={`/products/${value.slug}`}>
                <a className="btn btn-primary flex-grow-1">Select options</a>
              </Link>
            )}
            {/* {value.id && <AddToFavoriteButton productId={value.id} />} */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductGridItem;
