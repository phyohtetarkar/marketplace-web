import { ShopDetailContext } from "../../common/contexts";
import ContactUs from "./ContactUs";

function AboutUs() {
  return (
    <ShopDetailContext.Consumer>
      {(shop) => {
        if (!shop) {
          return null;
        }
        return (
          <div className="row g-3">
            <div className="col-lg-8">
              <div className="card shadow-sm">
                <div className="card-header border-bottom bg-white py-3">
                  <h5 className="mb-0">About us</h5>
                </div>
                <div className="card-body">
                  <div
                    dangerouslySetInnerHTML={{ __html: shop?.about ?? "" }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <ContactUs />
            </div>
          </div>
        );
      }}
    </ShopDetailContext.Consumer>
  );
}

export default AboutUs;
