import Link from "next/link";
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
                <div className="card">
                  <div className="card-body p-0">
                    <div className="vstack">
                      <div className="p-3 p-lg-4">
                        <div className="row g-3">
                          <div className="col">
                          <input id="filterShopsnput" type="text" name="filter" className="form-control px-3  " placeholder="Search your shops" value="" style={{height: 50}}/>
                          </div>
                        <div className="col-auto">
                          <Link href="/profile/shops/create"><a className="ms-auto btn btn-primary h-100 hstack">Create New</a></Link>
                        </div>
                      </div>
                      </div>
                      <div className="table-responsive">
                        <table className="table bg-white align-middle">
                          <thead className="table-light text-nowrap align-middle">
                            <tr style={{height: 50}}>
                              <th className="ps-3 ps-lg-4 fw-medium">SHOPS</th>
                              <th className="fw-medium">MEMBERS</th>
                              <th className="fw-medium">STATUS</th>
                              <th className="pe-3 pe-lg-4 fw-medium"></th>
                            </tr>
                          </thead>
                          <tbody className="border-top-0">
                            <tr></tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="px-3 px-lg-4 d-flex justify-content-end my-0 my-lg-2"><Pagination hasPrev={true} hasNext={true} /></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
}

export default MyShops;
