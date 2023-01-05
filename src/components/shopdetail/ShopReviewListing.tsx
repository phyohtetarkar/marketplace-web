import Image from "next/image";
import Pagination from "../Pagination";
import Rating from "../Rating";
import ShopReviewForm from "./ShopReviewForm";

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
      <ShopReviewForm />
      <div className="card shadow-sm">
        <div className="card-body">
          {reviews.map((i) => (
            <Review key={i} />
          ))}
          <div className="hstack justify-content-end">
            <div className="">
              <Pagination />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopReviewListing;
