import Image from "next/image";
import Link from "next/link";
import { Product } from "../../common/models";
import AddToCartButton from "./AddToCartButton";
import DeleteFromFavoriteButton from "./DeleteFromFavoriteButton";

interface ProductFavoriteProps {
  product: Product;
}

function ProductFavoriteItem({ product }: ProductFavoriteProps) {
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
              className="rounded border"
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
              className="text-muted text-decoration-none text-truncate"
            >
              {product.name}
            </Link>

            <Link
              href={`/collections/${product.category?.slug}`}
              className="text-decoration-none fw-medium link-success text-truncate mb-2"
            >
              {product.category?.name}
            </Link>

            <div className="flex-grow-1"></div>

            <div className="hstack align-items-stretch gap-2">
              <AddToCartButton productId={product.id ?? 0} />
              <DeleteFromFavoriteButton productId={product.id ?? 0} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductFavoriteItem;
