import Image from "next/image";
import Accordion from "../../components/Accordion";

interface CollectionItemProps {
  onClick?: (slug: string) => void;
}

const CollectionItem = ({ onClick }: CollectionItemProps) => {
  return (
    <div
      role="button"
      className="vstack gap-1 py-2 px-1"
      onClick={() => onClick?.("slug")}
    >
      <Image
        src={"/images/icons8-google-48.png"}
        width={50}
        height={50}
        alt=""
        objectFit="contain"
      />
      <div className="text-center small">Foods And Drinks</div>
    </div>
  );
};

function Collections() {
  return (
    <div className="h-100 bg-white d-block d-lg-none">
      <div className="row g-0 h-100">
        <div
          className="col-auto h-100 border-end border-light-gray scrollbar-none"
          style={{ overflowY: "auto", width: 108 }}
        >
          <div className="position-relative">
            <div className="vstack position-absolute top-0 bottom-0 start-0 end-0">
              <CollectionItem />
              <div className="dropdown-divider m-0"></div>
              <CollectionItem />
              <div className="dropdown-divider m-0"></div>
              <CollectionItem />
              <div className="dropdown-divider m-0"></div>
              <CollectionItem />
              <div className="dropdown-divider m-0"></div>
              <CollectionItem />
              <div className="dropdown-divider m-0"></div>
              <CollectionItem />
            </div>
          </div>
        </div>
        <div className="col h-100 scrollbar-none" style={{ overflowY: "auto" }}>
          <div className="position-relative">
            <div className="vstack position-absolute top-0 bottom-0 start-0 end-0">
              <Accordion
                open={false}
                header={(open) => {
                  return <span className="fw-semibold">Snacks &amp; Beer</span>;
                }}
                headerClassName="px-3 py-2h border-bottom"
                iconType="plus-minus"
              >
                <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 g-3 border-bottom">
                  <div className="col">
                    <CollectionItem />
                  </div>
                  <div className="col">
                    <CollectionItem />
                  </div>
                  <div className="col">
                    <CollectionItem />
                  </div>
                </div>
              </Accordion>
              <Accordion
                open={false}
                header={(open) => {
                  return <span className="fw-semibold">Home Appliances</span>;
                }}
                headerClassName="px-3 py-2h border-bottom"
                iconType="plus-minus"
              >
                <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 g-3">
                  <div className="col">
                    <CollectionItem />
                  </div>
                  <div className="col">
                    <CollectionItem />
                  </div>
                  <div className="col">
                    <CollectionItem />
                  </div>
                </div>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Collections;
