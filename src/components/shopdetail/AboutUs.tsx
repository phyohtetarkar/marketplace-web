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
          <>
            <div className="card shadow-sm mb-3">
              <div className="card-header border-bottom bg-white py-3">
                <h5 className="mb-0">About us</h5>
              </div>
              <div className="card-body">
                <div
                  dangerouslySetInnerHTML={{ __html: shop?.about ?? "" }}
                ></div>
              </div>
            </div>
            <ContactUs />
          </>
        );
      }}
    </ShopDetailContext.Consumer>
  );
}

export default AboutUs;
