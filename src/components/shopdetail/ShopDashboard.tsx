import {
  CubeIcon,
  DocumentTextIcon,
  InboxStackIcon,
  ShoppingBagIcon
} from "@heroicons/react/24/solid";
import SaleLineChart from "../shopdetail/SaleLineChart";

function ShopDashboard() {
  const iconSize = 56;
  return (
    <div>
      {/* <h3 className="fw-semibold">Insights</h3>
      <hr className="bg-dark-gray" /> */}
      <div className="row g-3 mb-3">
        <div className="col-lg-4">
          <div className="card p-3 shadow-sm">
            <div className="hstack gap-3">
              <div className="bg-secondary text-light rounded">
                <ShoppingBagIcon
                  width={iconSize}
                  className="flex-shrink-0 p-2"
                />
              </div>

              <div className="vstack gap-1 text-nowrap">
                <h6 className="text-muted mb-auto">Total Sales</h6>
                <span className="fw-semibold">120,200,000 Ks</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card p-3 shadow-sm">
            <div className="hstack gap-3">
              <div className="bg-success text-light rounded">
                <DocumentTextIcon
                  width={iconSize}
                  className="flex-shrink-0 p-2"
                />
              </div>
              <div className="vstack gap-1 text-nowrap">
                <h6 className="text-muted mb-auto">Total Orders</h6>
                <span className="fw-semibold">90</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card p-3 shadow-sm">
            <div className="hstack gap-3">
              <div className="bg-primary text-light rounded">
                <InboxStackIcon
                  width={iconSize}
                  className="flex-shrink-0 p-2"
                />
              </div>
              <div className="vstack gap-1 text-nowrap">
                <h6 className="text-muted mb-auto">Total Products</h6>
                <span className="fw-semibold">50</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row g-3">
        <div className="col-lg-8">
          <SaleLineChart />
        </div>
        <div className="col-lg-4"></div>
      </div>
    </div>
  );
}

export default ShopDashboard;
