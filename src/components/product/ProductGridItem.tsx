import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";
import { AuthenticationContext } from "../../common/contexts";
import { Product } from "../../common/models";
import { formatNumber, transformDiscount } from "../../common/utils";
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
  let outOfStock;
  // let image = product.images![0]!;
  let price = <>{formatNumber(value.price ?? 0)} Ks</>;

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

  if ((value.stockLeft ?? 0) === 0) {
    outOfStock = (
      <div className="bg-dark opacity-75 py-2 text-light position-absolute text-center bottom-0 start-0 end-0">
        Out Of Stock
      </div>
    );
  }

  if (value.discount) {
    price = (
      <>
        <del className="text-muted small fw-normal me-1">
          {formatNumber(value.price ?? 0)}&nbsp;Ks
        </del>
        {transformDiscount(value.discount, value.price)}&nbsp;Ks
      </>
    );
  }

  return (
    <div className="card h-100">
      <Link href={`/products/${value.slug}`} className="text-decoration-none">
        <div
          className="position-relative"
          onContextMenu={(e) => e.preventDefault()}
        >
          <div className="ratio ratio-4x3">
            <Image
              className="card-img-top"
              src={value.thumbnail ?? "/placeholder.jpeg"}
              alt="Product image."
              fill
              sizes="33vw"
              priority
              style={{
                objectFit: "cover"
              }}
            />
          </div>
          {outOfStock && outOfStock}
          {popular && popular}
        </div>
      </Link>
      <div className="card-body">
        <div className="vstack">
          {heading === "seller" ? (
            <Link
              href={`/shops/${value.shop?.slug}`}
              className="text-decoration-none text-truncate link-success fw-medium"
            >
              {value.shop?.name}
            </Link>
          ) : (
            <Link
              href={`/categories/${value.category?.slug}`}
              className="text-decoration-none text-truncate link-success fw-medium"
            >
              {value.category?.name}
            </Link>
          )}

          <Link
            href={`/products/${value.slug}`}
            className="text-muted text-decoration-none text-truncate"
          >
            {value.name}
          </Link>

          <h6
            className="fw-semibold mt-2"
            style={{
              fontSize: 18
            }}
          >
            {price}
          </h6>

          <div className="mt-3 hstack align-items-stretch gap-2 d-none d-sm-flex">
            {value.id && !value.withVariant && (
              <AddToCartButton
                productId={value.id}
                className="flex-grow-1"
                disabled={!!outOfStock}
              />
            )}
            {value.id && value.withVariant && (
              <Link
                href={`/products/${value.slug}`}
                className="btn btn-primary flex-grow-1"
              >
                Select options
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
