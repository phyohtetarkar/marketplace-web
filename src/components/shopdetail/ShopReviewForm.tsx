import Rating from "../Rating";
import Dropdown from "../Dropdown";
import { Textarea } from "../forms";

const _ratings = [5, 4, 3, 2, 1];

function ShopReviewForm() {
  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">
        <div className="row gap-3">
          <div className="col-lg-12">
            <Dropdown
              toggle={
                <span className="flex-grow-1 text-muted text-start">
                  Choose rating
                </span>
              }
              toggleClassName="btn btn-outline-light rounded text-muted py-2h px-3 border dropdown-toggle hstack"
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
  );
}

export default ShopReviewForm;
