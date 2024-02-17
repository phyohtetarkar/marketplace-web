import Image from "next/image";
import Link from "next/link";
import { Product } from "@/common/models";
import { formatNumber, transformDiscount } from "@/common/utils";
import DeleteFromFavoriteButton from "./DeleteFromFavoriteButton";

interface ProductFavoriteProps {
  product: Product;
}

function ProductFavoriteItem({ product }: ProductFavoriteProps) {
  let price = <>{formatNumber(product.price ?? 0)} Ks</>;

  if (product.discount) {
    price = (
      <>
        <del className="text-muted small fw-normal me-1">
          {formatNumber(product.price ?? 0)}&nbsp;Ks
        </del>
        {formatNumber(transformDiscount(product.discount, product.price))}
        &nbsp;Ks
      </>
    );
  }

  return (
    <div className="card">
      <div className="card-body">
        <div className="hstack gap-3">
          <div
            className="position-relative bg-light rounded"
            onContextMenu={(e) => e.preventDefault()}
            style={{
              minWidth: 120,
              height: 120
            }}
          >
            <Image
              className="rounded"
              src={product.thumbnail ?? "/images/placeholder.jpeg"}
              alt="Product image."
              fill
              sizes="33vw"
              style={{
                objectFit: "contain"
              }}
            />
          </div>
          <div className="vstack overflow-hidden">
            <Link
              href={`/products/${product.slug}`}
              className="text-muted fw-medium text-decoration-none text-truncate"
            >
              {product.name}
            </Link>

            <div>{price}</div>

            <div className="flex-grow-1"></div>

            <div className="hstack align-items-stretch gap-2">
              <DeleteFromFavoriteButton productId={product.id ?? 0} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductFavoriteItem;
