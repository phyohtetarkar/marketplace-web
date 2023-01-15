import { useFormik } from "formik";
import { ShopReview } from "../../common/models";
import Dropdown from "../Dropdown";
import { Textarea } from "../forms";
import Rating from "../Rating";

const _ratings = [5, 4, 3, 2, 1];

function ShopReviewForm() {
  const formik = useFormik<ShopReview>({
    initialValues: {
      shopId: 0
    },
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      postReview(values);
    }
  });

  const postReview = (values: ShopReview) => {
    console.log(values);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
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
              <Textarea
                name="description"
                placeholder="Write your review"
                value={formik.values.description ?? ""}
                onChange={formik.handleChange}
              />
            </div>
          </div>
          <div className="d-flex mt-3">
            <button type="submit" className="btn btn-primary rounded-2 ms-auto">
              Post review
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default ShopReviewForm;
