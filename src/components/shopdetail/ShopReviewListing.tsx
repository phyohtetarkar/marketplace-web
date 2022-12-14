import Image from "next/image";
import Dropdown from "../Dropdown";
import { Textarea } from "../forms";
import Rating from "../Rating";

const _ratings = [5, 4, 3, 2, 1];

function Review() {
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
          <div className="mt-3">
            <Rating rating={4.5} />
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
  const reviews = [1, 2, 3];
  return (
    <div>
      <div className="card mb-3">
        <div className="card-body">
          <div className="row gap-3">
            <div className="col-lg-12">
              <Dropdown
                toggle={
                  <span className="flex-grow-1 text-muted">Select rating</span>
                }
                toggleClassName="border rounded py-2h px-3 dropdown-toggle bg-light hstack"
                menuClassName="w-100"
              >
                {_ratings.map((e, i) => {
                  return (
                    <li key={i} role="button" className="dropdown-item">
                      <div className="hstack py-1 gap-1">
                        <Rating rating={e} />
                        <span>({e}/5)</span>
                      </div>
                    </li>
                  );
                })}
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
          {reviews.map((i) => (
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
