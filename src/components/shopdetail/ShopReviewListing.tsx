import { StarIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

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
              <StarIcon key={i} width={18} className="text-accent" />
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
  const list = [1, 2, 3];
  return (
    <div>
      <div className="card">
        <div className="card-body">
          {list.map((i) => (
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
