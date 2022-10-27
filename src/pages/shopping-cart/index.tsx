import Link from "next/link";
import { Trash2 } from "react-feather";
import PricingCard from "../../components/order/PricingCard";
import ShoppingCartItem from "../../components/order/ShoppingCartItem";
import Tooltip from "../../components/Tooltip";

function ShoppingCart() {
  const list = [1, 2];

  let content = <div></div>;
  if (list && list.length === 0) {
    content = (
      <div>
        <h6 className="text-center text-muted p-3">No Product in cart.</h6>
      </div>
    );
  } else {
    content = (
      <div>
        {list &&
          list.map((p) => {
            return <ShoppingCartItem key={p} data={p} />;
          })}
      </div>
    );
  }

  return (
    <div className="vstack mb-5">
      <div className="bg-secondary">
        <div className="container">
          <div className="row py-4 px-2">
            <nav aria-label="breadcrumb col-12">
              <ol className="breadcrumb mb-1">
                <li className="breadcrumb-item">
                  <Link href={`/`}>
                    <a>Home</a>
                  </Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Shopping Cart
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
      <div className="container py-3">
        <div className="row g-3">
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm mb-3 d-none d-md-block">
              <div className="card-header">
                <div className="hstack">
                  <div className="hstack gap-2">
                    <div>
                      <input
                        className="form-check-input"
                        type="checkbox"
                      ></input>
                    </div>
                    <div>SELECT ALL</div>
                  </div>
                  <div className="hstack gap-2 flex-grow-1 justify-content-end">
                    <div>
                      <Tooltip title="Remove all">
                        <button disabled={false} className="btn btn-danger">
                          <Trash2 size={20} />
                        </button>
                      </Tooltip>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card border-0 shadow-sm mb-3 d-block d-md-none">
              <div className="card-header">
                <div className="hstack">
                  <div className="hstack gap-2">
                    <div>
                      <input
                        className="form-check-input"
                        type="checkbox"
                      ></input>
                    </div>
                    <div>SELECT ALL</div>
                  </div>
                  <div className="hstack gap-2 flex-grow-1 justify-content-end">
                    <div>
                      <Tooltip title="Remove all">
                        <button disabled={false} className="btn btn-danger">
                          <Trash2 size={20} />
                        </button>
                      </Tooltip>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {content}
          </div>
          <div className="col-lg-4 ">
            <PricingCard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
