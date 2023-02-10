import Image from "next/image";
import Link from "next/link";
import { Product } from "../../common/models";
import AddToCartButton from "./AddToCartButton";
import DeleteFromFavoriteButton from "./DeleteFromFavoriteButton";

interface ProductFavoriteProps {
  value: Product;
}

function ProductFavoriteItem({ value }: ProductFavoriteProps) {
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
              src={value.thumbnail ?? "/images/placeholder.jpeg"}
              alt="Product image."
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div className="vstack overflow-hidden">
            <Link href={`/products/${value.slug}`}>
              <a className="text-muted text-decoration-none text-truncate">
                {value.name}
              </a>
            </Link>

            <Link href={`/collections/${value.category?.slug}`}>
              <a className="text-decoration-none fw-medium text-truncate mb-2">
                {value.category?.name}
              </a>
            </Link>

            <div className="flex-grow-1"></div>

            <div className="hstack align-items-stretch gap-2">
              <AddToCartButton productId={value.id ?? 0} />
              <DeleteFromFavoriteButton productId={value.id ?? 0} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductFavoriteItem;
