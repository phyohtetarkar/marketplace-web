import { StarIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Dropdown from "../Dropdown";
import { Textarea } from "../forms";

function Review() {
  const list = [1, 2, 3, 4, 5];
  return (
    <div className="p-2">
      <div className="hstack gap-3 align-items-start">
        <div className="position-relative flex-shrink-0 ">
          <Image
            src="/images/profile.png"
            width={60}
            height={60}
            alt=""
            className="rounded-circle"
            objectFit="cover"
          />
        </div>
        <div>
          <h6 className="mb-0">Robert Thomas</h6>
          <span className="text-muted small">30 November 2022</span>
          <div className="hstack mt-3">
            {list.map((i) => (
              <StarIcon key={i} width={18} fill={"#facc15"} strokeWidth={0} />
            ))}
          </div>
          <h6 className="text-muted fw-normal mt-2">
            It is awesome.Quality is more than good that I was expected for
            buying. I first time purchase Geeks shoes & this brand is good.
          </h6>
        </div>
      </div>
      <hr className="bg-dark-gray" />
    </div>
  );
}

function ShopReviewListing() {
  const rating5 = [1, 2, 3, 4, 5];
  const rating4 = [1, 2, 3, 4];
  const rating3 = [1, 2, 3];
  const rating2 = [1, 2];
  const outlineIconSize = 19;
  const solidIconSize = 22;
  return (
    <div>
      <div className="card mb-3">
        <div className="card-body">
          <div className="row gap-3">
            <div className="col-lg-12">
              <Dropdown
                toggle={
                  <button className="btn btn-outline-secondary dropdown-toggle text-muted text-end w-100" />
                }
                menuClassName="w-100"
              >
                <li role="button" className="dropdown-item">
                  <div className="hstack py-1 gap-1">
                    {rating5.map((i) => (
                      <StarIcon
                        key={i}
                        width={solidIconSize}
                        fill={"#facc15"}
                        strokeWidth={0}
                      />
                    ))}
                    <span>(5/5)</span>
                  </div>
                </li>
                <li role="button" className="dropdown-item">
                  <div className="hstack py-1 gap-1">
                    {rating4.map((i) => (
                      <StarIcon
                        key={i}
                        width={solidIconSize}
                        fill={"#facc15"}
                        strokeWidth={0}
                      />
                    ))}
                    <StarIcon width={outlineIconSize} strokeWidth={1} />
                    <span>(4/5)</span>
                  </div>
                </li>
                <li role="button" className="dropdown-item">
                  <div className="hstack py-1 gap-1">
                    {rating3.map((i) => (
                      <StarIcon
                        key={i}
                        width={solidIconSize}
                        fill={"#facc15"}
                        strokeWidth={0}
                      />
                    ))}
                    {rating2.map((i) => (
                      <StarIcon
                        key={i}
                        width={outlineIconSize}
                        strokeWidth={1}
                      />
                    ))}
                    <span>(3/5)</span>
                  </div>
                </li>
                <li role="button" className="dropdown-item">
                  <div className="hstack py-1 gap-1">
                    {rating2.map((i) => (
                      <StarIcon
                        key={i}
                        width={solidIconSize}
                        fill={"#facc15"}
                        strokeWidth={0}
                      />
                    ))}
                    {rating3.map((i) => (
                      <StarIcon
                        key={i}
                        width={outlineIconSize}
                        strokeWidth={1}
                      />
                    ))}
                    <span>(2/5)</span>
                  </div>
                </li>
                <li role="button" className="dropdown-item">
                  <div className="hstack py-1 gap-1">
                    <StarIcon
                      width={solidIconSize}
                      fill={"#facc15"}
                      strokeWidth={0}
                    />
                    {rating4.map((i) => (
                      <StarIcon
                        key={i}
                        width={outlineIconSize}
                        strokeWidth={1}
                      />
                    ))}
                    <span>(1/5)</span>
                  </div>
                </li>
              </Dropdown>
            </div>
            <div className="col-lg-12">
              <Textarea name="reviewInput" placeholder="Enter your review" />
            </div>
          </div>
          <div className="d-flex mt-3">
            <button className="btn btn-primary rounded-2 ms-auto">
              Post review
            </button>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          {rating3.map((i) => (
            <Review key={i} />
          ))}
          <div className="d-flex mb-2">
            <button className="btn btn-outline-primary rounded-2 ms-auto">
              View all reviews
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopReviewListing;
