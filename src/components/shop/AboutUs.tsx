import { Shop } from "@/common/models";
import MapView from "../MapView";

function AboutUs({ shop }: { shop: Shop }) {
  if (!shop) {
    return null;
  }
  return (
    <div className="row g-3">
      <div className="col-lg-8">
        <div className="card">
          <div className="card-header border-bottom bg-white py-3">
            <h5 className="mb-0">About us</h5>
          </div>
          <div className="card-body">
            <div dangerouslySetInnerHTML={{ __html: shop?.about ?? "" }}></div>
          </div>
        </div>
      </div>
      <div className="col-lg-4">
        <div className="card">
          <div className="card-header border-bottom bg-white py-3">
            <h5 className="mb-0">Contact us</h5>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-12">
                <dl className="row mb-0">
                  <dt className="col-12 fw-medium">Address</dt>
                  <dd className="col-12 text-muted">{shop.contact?.address}</dd>
                  <dt className="col-12 fw-medium">Phone numbers</dt>
                  <dd className="col-12 mb-0">
                    <div className="d-flex flex-wrap gap-2">
                      {shop.contact?.phones?.map((p, i, ary) => {
                        const len = ary.length;
                        return (
                          <span key={i}>
                            <a href={`tel:${p}`}>{p}</a>
                            {i < len - 1 && <span>,</span>}
                          </span>
                        );
                      })}
                    </div>
                  </dd>
                </dl>
              </div>

              {shop.contact?.latitude && shop.contact.longitude && (
                <>
                  <div className="col-12">
                    <hr className="bg-dark-gray" />
                  </div>
                  <div className="col-12">
                    <MapView
                      location={{
                        latitude: shop.contact.latitude,
                        longitude: shop.contact.longitude
                      }}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
