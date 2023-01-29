import { TrashIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { Product } from "../../common/models";
import {
  deleteFavoriteProduct,
  addToFavoriteProduct
} from "../../services/FavoriteProductService";

interface ProductFavoriteProps {
  value: Product;
}

function ProductFavoriteItem({ value }: ProductFavoriteProps) {
  function getProductImageUrl(p: Product) {
    return p.thumbnail ?? "/placeholder.jpeg";
  }

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
              className="p-2"
              src={getProductImageUrl(value)}
              alt="Product image."
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="vstack overflow-hidden">
            <Link href={`/products/${1}`}>
              <a className="text-muted text-decoration-none text-truncate">
                {value.name}
              </a>
            </Link>

            <Link href={`/`}>
              <a className="text-decoration-none fw-medium text-truncate mb-2">
                {value.category?.name}
              </a>
            </Link>

            <div className="flex-grow-1"></div>

            <div className="hstack align-items-stretch">
              <button
                disabled={false}
                className="btn btn-primary text-truncate me-2"
                onClick={() => {
                  addToFavoriteProduct(value.id!);
                }}
              >
                Add to cart
              </button>
              <button
                disabled={false}
                className="btn btn-outline-danger"
                onClick={() => {
                  deleteFavoriteProduct(value.id!);
                }}
              >
                <TrashIcon width={20} onClick={() => {}} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductFavoriteItem;
