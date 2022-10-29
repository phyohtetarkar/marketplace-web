import { MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import Tooltip from "../Tooltip";

function ShoppingCartItem({ data = {} }) {
  let image = `https://source.unsplash.com/random/200x240?random=${Math.floor(
    Math.random() * 100
  )}`;

  const getQtyInput = () => {
    return (
      <div className="input-group">
        <button className="btn btn-outline text-muted border border-end-0">
          <MinusIcon width={20} />
        </button>
        <div
          className="bg-light align-items-center justify-content-center d-flex border"
          style={{ minWidth: 44 }}
        >
          1
        </div>
        <button className="btn btn-outline text-muted border border-start-0">
          <PlusIcon width={20} />
        </button>
      </div>
    );
  };

  return (
    <div className="hstack">
      <div className="row flex-grow-1 gap-3">
        <div className="col-12 col-lg">
          <div className="hstack gap-2">
            <input className="form-check-input" type="checkbox"></input>
            <div className="flex-shink-0">
              <Link href={`/products/1`}>
                <a className="text-decoration-none">
                  <div
                    className="position-relative bg-light rounded"
                    onContextMenu={(e) => e.preventDefault()}
                    style={{ height: 100, width: 100 }}
                  >
                    <Image
                      className="p-2"
                      src={image}
                      alt="Product image."
                      layout="fill"
                      priority
                    />
                  </div>
                </a>
              </Link>
            </div>
            <div className="ms-2 vstack overflow-hidden">
              <h6 className="mb-0">
                <Link href={`/products/1`}>
                  <a className="link-dark text-decoration-none text-truncate d-block">
                    Product Name
                  </a>
                </Link>
              </h6>
              <small className="text-muted">Clothes</small>
              <div className="flex-grow-1"></div>
              <div>
                <h6 className="mb-0">6000</h6>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-auto">
          <div className="hstack h-100">
            <div>{getQtyInput()}</div>

            <Tooltip title="Remove" className="ms-auto ms-lg-4">
              <button className="btn btn-danger">
                <TrashIcon width={20} />
              </button>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCartItem;
