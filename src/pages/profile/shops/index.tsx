import AccountMenu from "../../../components/account/AccountMenu";
import Pagination from "../../../components/Pagination";

function MyShops() {
    return (
        <div>
          <div className="bg-primary">
            <div className="container" style={{ height: 120 }}>
              <div className="d-flex align-items-center h-100">
                <h1 className="text-light">My Shops</h1>
              </div>
            </div>
          </div>
    
          <div className="container py-4">
            <div className="row g-4">
              <div className="col-lg-4 col-xl-3">
                <AccountMenu />
              </div>
              <div className="col-lg-8 col-xl-9">
                <div className="row row-cols-1 row-cols-md-2 g-3">
                  <div className="col">
                  </div>
                  <div className="col">
                  </div>
                  <div className="col">
                  </div>
                  <div className="col">
                  </div>
                  <div className="col">
                  </div>
                </div>
                <div className="float-end mt-3">
                  <Pagination hasPrev={true} hasNext={true} />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
}

export default MyShops;