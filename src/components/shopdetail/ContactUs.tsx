import { ShopDetailContext } from "../../common/contexts";
import MapView from "../MapView";

function ContactUs() {
  return (
    <ShopDetailContext.Consumer>
      {(shop) => {
        if (!shop) {
          return null;
        }
        return (
          <div className="card">
            <div className="card-header border-bottom bg-white py-3">
              <h5 className="mb-0">Contact us</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-12">
                  <dl className="row mb-0">
                    <dt className="col-12 fw-medium">Address</dt>
                    <dd className="col-12 text-muted">
                      {shop.contact?.address}
                    </dd>
                    <dt className="col-12 fw-medium">Phone numbers</dt>
                    <dd className="col-12 text-muted mb-0">
                      {shop.contact?.phones?.join(", ")}
                    </dd>
                  </dl>
                </div>
                <div className="col-12">
                  <hr className="bg-dark-gray" />
                </div>
                <div className="col-12">
                  <MapView
                    location={{
                      latitude: 16.7983725,
                      longitude: 96.1495573
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      }}
    </ShopDetailContext.Consumer>
  );
}

export default ContactUs;
