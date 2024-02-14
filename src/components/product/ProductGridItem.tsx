import Image from "next/image";
import Link from "next/link";
import { Product } from "@/common/models";
import { formatNumber, transformDiscount } from "@/common/utils";
import AddToCartButton from "./AddToCartButton";

interface ProductGridItemProps {
  value: Product;
  heading?: "seller" | "category";
}

function ProductGridItem({ value, heading = "seller" }: ProductGridItemProps) {
  let popular;
  let outOfStock;
  let price = <>{formatNumber(value.price ?? 0)} Ks</>;

  if (!value.withVariant && !value.available) {
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
        {formatNumber(transformDiscount(value.discount, value.price))}&nbsp;Ks
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
              className="card-img-top bg-light"
              src={value.thumbnail ?? "/placeholder.jpeg"}
              alt="Product image."
              fill
              sizes="33vw"
              priority
              style={{
                objectFit: "contain"
              }}
            />
          </div>
          {outOfStock && outOfStock}
          {popular && popular}
        </div>
      </Link>
      <div className="card-body">
        <div className="vstack">
          {/* {heading === "seller" ? (
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
          )} */}

          <Link
            href={`/products/${value.slug}`}
            className="text-muted text-decoration-none text-truncate"
          >
            {value.name}
          </Link>

          <h6
            className="fw-semibold mt-2 mb-0"
            style={{
              fontSize: 18
            }}
          >
            {price}
          </h6>

          <div className="mt-3 hstack align-items-stretch gap-2">
            {!value.withVariant ? (
              <AddToCartButton
                productId={value.id ?? 0}
                className="flex-grow-1"
                disabled={!!outOfStock}
              />
            ) : (
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
