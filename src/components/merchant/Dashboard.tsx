import {
  CubeIcon,
  CurrencyDollarIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/solid";

function Dashboard() {
  const iconSize = 56;
  return (
    <div>
      <div className="row g-3 mb-3">
        <div className="col-lg-4">
          <div className="card p-3 shadow-sm">
            <div className="hstack gap-3">
              <div className="bg-accent text-light rounded">
                <CurrencyDollarIcon
                  width={iconSize}
                  className="flex-shrink-0 p-2"
                />
              </div>

              <div className="vstack gap-1 text-nowrap">
                <h6 className="fw-normal">Total Sales</h6>
                <span className="fw-bold">120,200,000 Ks</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card p-3 shadow-sm">
            <div className="hstack gap-3">
              <div className="bg-success text-light rounded">
                <ShoppingBagIcon
                  width={iconSize}
                  className="flex-shrink-0 p-2"
                />
              </div>
              <div className="vstack gap-1 text-nowrap">
                <h6 className="fw-normal">Total Orders</h6>
                <span className="fw-bold">90</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card p-3 shadow-sm">
            <div className="hstack gap-3">
              <div className="bg-primary text-light rounded">
                <CubeIcon width={iconSize} className="flex-shrink-0 p-2" />
              </div>
              <div className="vstack gap-1 text-nowrap">
                <h6 className="fw-normal">Total Products</h6>
                <span className="fw-bold">50</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row g-3">
        <div className="col-lg-9">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <div>
                <h5 className="fw-normal ">Earnings</h5>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3">
          <div className="card h-100 shadow-sm">
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
