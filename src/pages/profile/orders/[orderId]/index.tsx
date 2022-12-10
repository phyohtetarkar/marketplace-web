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
            <a className="text-dark text-decoration-none" href="#">
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
                <h3 className="text-light text-lg-start">Order Detail</h3>
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
                      Order Detail
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
                  <div className="col-md-5 small">
                    <h6 className="fw-bold">Deliver to</h6>
                    <div>
                      Name:<span className="text-muted ms-2">Mobile Com
                      </span>
                    </div>
                    <div>
                      Phone:<span className="text-muted ms-2">
                      +95911223344
                      </span>
                    </div>
                    <div>
                      Address:<span className="text-muted ms-2">
                      No. 26, Pyay Street, Hlaing Township, Yangon, Myanmar
                      </span>
                    </div>
                    <div>
                      Notes:<span className="text-muted ms-2">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry.</span>
                    </div>
                  </div>
                  <div className="col-md-4 small">
                    <h6 className="fw-bold">Payment info</h6>
                    <div>
                      Total Products:<span className="text-muted ms-2">5</span>
                    </div>
                    <div>
                      Subtotal:<span className="text-muted ms-2">30,000ks</span>
                    </div>
                    <div>
                      Discounts:
                      <span className="text-danger ms-2">-0ks</span>
                    </div>
                    <div>
                      Total Price:
                      <span className="text-success ms-2">33,000ks</span>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <h6 className="fw-bold">Status</h6>
                    <div className="text-success">
                      <small className="fw-semibold">DELIVERED</small>
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
