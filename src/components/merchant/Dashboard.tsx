import {
  CubeIcon,
  CurrencyDollarIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/solid";

function Dashboard() {
  const iconSize = 30;
  return (
    <div>
      <div className="row mb-3">
        <div className="col">
          <div className="card-group">
            <div className="card p-3">
              <div className="vstack gap-2">
                <div className="hstack gap-2 align-items-start">
                  <CurrencyDollarIcon
                    width={iconSize}
                    className="flex-shrink-0 text-accent"
                  />
                  <h5 className="text-nowrap fw-normal">Total Sales</h5>
                </div>
                <span className="fs-5 fw-medium">MMK 120,200,000</span>
              </div>
            </div>
            <div className="card p-3">
              <div className="vstack gap-2">
                <div className="hstack gap-2 align-items-start">
                  <ShoppingBagIcon
                    width={iconSize}
                    className="flex-shrink-0 text-success"
                  />
                  <h5 className="text-nowrap fw-normal">Total Orders</h5>
                </div>
                <span className="fs-5 fw-medium">90</span>
              </div>
            </div>
            <div className="card p-3">
              <div className="vstack gap-2">
                <div className="hstack gap-2 align-items-start">
                  <CubeIcon
                    width={iconSize}
                    className="flex-shrink-0 text-primary"
                  />
                  <h5 className="text-nowrap fw-normal">Total Products</h5>
                </div>
                <span className="fs-5 fw-medium">50</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row g-3">
        <div className="col-lg-9">
          <div className="card h-100">
            <div className="card-body">
              <div>
                <h5 className="fw-normal ">Earnings</h5>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3">
          <div className="card h-100">
            <div className="card-body">
              <div>
                <h5 className="fw-normal">Sales by category</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
