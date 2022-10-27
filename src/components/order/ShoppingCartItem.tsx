import Image from "next/image";
import Link from "next/link";
import { Heart, Minus, Plus, Trash, Trash2 } from "react-feather";
import Tooltip from "../Tooltip";

function ShoppingCartItem({ data = {} }) {
  let image = `https://source.unsplash.com/random/200x240?random=${Math.floor(
    Math.random() * 100
  )}`;

  const getQtyInput = () => {
    return (
      <div className="input-group">
        <button className="btn btn-outline text-muted border border-end-0">
          <Minus />
        </button>
        <div
          className="bg-light align-items-center justify-content-center d-flex border"
          style={{ minWidth: 44 }}
        >
          1
        </div>
        <button className="btn btn-outline text-muted border border-start-0">
          <Plus />
        </button>
      </div>
    );
  };

  const getItemInfo = () => {
    return (
      <div className="hstack justify-content-between">
        <div className="hstack col-8 gap-2">
          <div>
            <input className="form-check-input" type="checkbox"></input>
          </div>
          <div className="flex-shink-0">
            <Link href={`/products/1`}>
              <a className="text-decoration-none">
                <div
                  className="position-relative"
                  onContextMenu={(e) => e.preventDefault()}
                >
                  <div
                    className="ratio ratio-1x1 rounded bg-light"
                    style={{ height: 120, width: 100 }}
                  >
                    <Image
                      className="p-2"
                      src={image}
                      alt="Product image."
                      layout="fill"
                    />
                  </div>
                </div>
              </a>
            </Link>
          </div>
          <div className="ms-2 vstack justify-content-between overflow-hidden">
            <div>
              <span className="h6">
                <Link href={`/products/1`}>
                  <a className="link-dark text-decoration-none text-truncate d-block py-1">
                    Product Name
                  </a>
                </Link>
              </span>
              <small className="d-flex text-muted" style={{ fontSize: 12 }}>
                <span>Clothes</span>
              </small>
            </div>
            <div>
              <h6 className="mb-0">6000</h6>
            </div>
          </div>
        </div>
        <div className="col-md-auto">
          <div>{getQtyInput()}</div>
        </div>

        <div className="hstack gap-2">
          <Tooltip title="Remove" className="ms-auto">
            <button className="btn btn-danger">
              <Trash2 />
            </button>
          </Tooltip>
          <Tooltip title="Add to favourite" className="ms-auto">
            <button className="btn btn-outline-light text-primary border">
              <Heart />
            </button>
          </Tooltip>
        </div>
      </div>
    );
  };

  const getItemInfo2 = () => {
    return (
      <div className="vstack">
        <div className="hstack mb-3 gap-2">
          <div>
            <input className="form-check-input" type="checkbox"></input>
          </div>
          <div className="flex-shink-0">
            <Link href={`/products/1`}>
              <a className="text-decoration-none">
                <div
                  className="position-relative"
                  onContextMenu={(e) => e.preventDefault()}
                >
                  <div
                    className="ratio ratio-1x1 rounded bg-light"
                    style={{ height: 120, width: 100 }}
                  >
                    <Image
                      className="p-2"
                      src={image}
                      alt="Product image."
                      layout="fill"
                    />
                  </div>
                </div>
              </a>
            </Link>
          </div>
          <div className="ms-2 vstack justify-content-between overflow-hidden">
            <div>
              <span className="h6">
                <Link href={`/products/1`}>
                  <a className="link-dark text-decoration-none text-truncate d-block py-1">
                    Product Name
                  </a>
                </Link>
              </span>
              <small className="d-flex text-muted" style={{ fontSize: 12 }}>
                <span>Clothes</span>
              </small>
            </div>
            <div>
              <h6 className="mb-0">6000</h6>
            </div>
          </div>
        </div>
        <div className="hstack justify-content-between">
          <div className="d-flex">
            <div>{getQtyInput()}</div>
          </div>
          <div className="hstack gap-2">
            <Tooltip title="Remove" className="ms-auto">
              <button className="btn btn-danger">
                <Trash2 />
              </button>
            </Tooltip>
            <Tooltip title="Add to favourite" className="ms-auto">
              <button className="btn btn-outline-light text-primary border">
                <Heart />
              </button>
            </Tooltip>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div>
      <div className="card border-0 shadow-sm mb-3 d-none d-md-block">
        <div className="card-header">
          <div className="hstack gap-3">
            <div>
              <input className="form-check-input" type="checkbox"></input>
            </div>
            <div>Shop Name</div>
          </div>
        </div>
        <div className="card-body">
          <div>
            {getItemInfo()}
            <hr />
            {getItemInfo()}
          </div>
        </div>
      </div>
      <div className="card border-0 shadow-sm mb-3 d-block d-md-none">
        <div className="card-header">
          <div className="hstack gap-3">
            <div>
              <input className="form-check-input" type="checkbox"></input>
            </div>
            <div>Shop Name</div>
          </div>
        </div>
        <div className="card-body p-3">
          <div>
            {getItemInfo2()}
            <hr />
            {getItemInfo2()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCartItem;
