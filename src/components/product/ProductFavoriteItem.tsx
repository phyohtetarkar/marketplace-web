import Image from "next/image";
import Link from "next/link";
import { FavoriteProduct } from "../../common/models";
import AddToCartButton from "./AddToCartButton";
import DeleteFromFavoriteButton from "./DeleteFromFavoriteButton";

interface ProductFavoriteProps {
  value: FavoriteProduct;
}

function ProductFavoriteItem({ value }: ProductFavoriteProps) {
  const { id, product } = value;

  return (
    <div className="card shadow-sm">
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
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div className="vstack overflow-hidden">
            <Link
              href={`/products/${product.slug}`}
              className="text-muted text-decoration-none text-truncate">

              {product.name}

            </Link>

            <Link
              href={`/collections/${product.category?.slug}`}
              className="text-decoration-none fw-medium text-truncate mb-2">

              {product.category?.name}

            </Link>

            <div className="flex-grow-1"></div>

            <div className="hstack align-items-stretch gap-2">
              <AddToCartButton productId={product.id ?? 0} />
              <DeleteFromFavoriteButton productId={id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductFavoriteItem;
