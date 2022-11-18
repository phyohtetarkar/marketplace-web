import { CalendarIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { formatTimestamp } from "../../../../common/utils";

function OrderRow() {
  return (
    <div className="col">
      <div className="d-flex">
        <div>
          <div className="flex-shrink-0">
            <div className="ratio ratio-1x1" style={{ width: 80 }}>
              <span
                style={{
                  boxSizing: "border-box",
                  display: "block",
                  overflow: "hidden",
                  width: "initial",
                  height: "initial",
                  background: "none",
                  opacity: 1,
                  border: 0,
                  margin: 0,
                  padding: 0,
                  position: "absolute",
                  inset: 0,
                }}
              >
                <Image
                  className="card-img-top rounded"
                  src={`https://source.unsplash.com/random/200x240?random=${Math.floor(
                    Math.random() * 100
                  )}`}
                  alt="Product image."
                  layout="fill"
                  objectFit="cover"
                  priority
                />
              </span>
            </div>
          </div>
        </div>
        <div className="flex-grow-1 ms-3 h-100">
          <div className="vstack">
            <a className="text-dark text-decoration-none" href="/product/1">
              Product name here
            </a>
            <small className="text-muted mb-2" style={{ fontSize: 12 }}>
              <span>Medium</span>,&nbsp;<span>White</span>
            </small>
            <h6 className="mb-0">1 × 10,000</h6>
          </div>
        </div>
      </div>
    </div>
  );
}

function OrderDetail() {
  const list = [1, 2, 3, 4];

  return (
    <div className="pb-5">
      <div className="bg-primary">
        <div className="container py-4">
          <div className="hstack">
            <div>
              <div className="px-2">
                <h3 className="text-light text-lg-start">Order Details</h3>
              </div>
              <div className="row px-2">
                <nav aria-label="breadcrumb col-12">
                  <ol className="breadcrumb mb-1">
                    <li className="breadcrumb-item">
                      <Link href="/profile/orders">
                        <a href="#" className="text-light">
                          Orders
                        </a>
                      </Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Order Details
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-4">
        <div className="row g-4">
          <div className=" col-lg-12">
            <div className="card mb-3">
              <div className="card-header py-3 bg-white">
                <div className="row">
                  <div className="col d-flex">
                    <span className="fw-semibold h5 my-auto">
                      Order ID: 20001
                    </span>
                  </div>
                  <div className="col-auto">
                    <Link href={"/profile/orders/1"}>
                      <a className="btn btn-sm btn-outline-danger">
                        Cancel order
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="row gx-2 gy-3">
                  <div className="col-md-5">
                    <h6 className="fw-bold">Deliver to</h6>
                    <div className="vstack text-dark small">
                      <span>Name: Mobile Com</span>
                      <span>Phone: +95911223344</span>
                      <span>Address: No. 26, Pyay Street, Hlaing Township</span>
                      <span>Yangon, Myanmar</span>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <h6 className="fw-bold">Payment Method</h6>
                    <div>Total Products: 5</div>
                    <div>Subtotal: 30,000ks</div>
                    <div className="text-danger">Discounts: -0ks</div>
                    <div>Delivery fee: 3,000ks</div>
                    <div className="text-success fw-semibold">
                      Total Price: 33,000ks
                    </div>
                  </div>
                  <div className="col-md-3">
                    <h6 className="fw-bold">Status</h6>
                    <div className="text-success">
                      <span className="fw-semibold">DELIVERED</span>
                    </div>
                  </div>
                </div>
                <hr className="dark-gray" />
                <div className="row row-cols-1 row-cols-md-3 g-3">
                  {list.map((i) => (
                    <OrderRow key={i} />
                  ))}
                </div>
              </div>
              <div className="card-footer small border-0 py-3 text-muted">
                {formatTimestamp(Date.now(), true)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;
