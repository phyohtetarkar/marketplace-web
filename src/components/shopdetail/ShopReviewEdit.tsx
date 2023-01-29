import { useFormik } from "formik";
import { useContext } from "react";
import { useSWRConfig } from "swr";
import { ShopDetailContext } from "../../common/contexts";
import { ShopReview } from "../../common/models";
import { parseErrorResponse } from "../../common/utils";
import { writeReview } from "../../services/ShopReviewService";
import Dropdown from "../Dropdown";
import { Textarea } from "../forms";
import Rating from "../Rating";

const _ratings = [5, 4, 3, 2, 1];

function ShopReviewEdit() {
  const { mutate } = useSWRConfig();
  const shopContext = useContext(ShopDetailContext);

  const formik = useFormik<ShopReview>({
    initialValues: {
      shopId: shopContext?.id
    },
    enableReinitialize: true,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      postReview(values);
    }
  });

  const postReview = async (values: ShopReview) => {
    try {
      await writeReview(values);
      mutate(["/shop-reviews", values.shopId]);
      formik.setValues({
        shopId: shopContext?.id
      });
    } catch (error) {
      const msg = parseErrorResponse(error);
    } finally {
      formik.setSubmitting(false);
    }
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="card mb-3 shadow-sm">
        <div className="card-header py-3">
          <h5 className="mb-0">Write review</h5>
        </div>
        <div className="card-body">
          <div className="row gap-3">
            <div className="col-lg-12">
              <Dropdown
                toggle={
                  !formik.values.rating ? (
                    <span className="flex-grow-1 text-muted text-start">
                      Choose rating
                    </span>
                  ) : (
                    <div className="hstack gap-1 flex-grow-1">
                      <Rating rating={formik.values.rating} />
                      <span>({formik.values.rating}/5)</span>
                    </div>
                  )
                }
                toggleClassName="btn btn-outline-light rounded text-muted py-2h px-3 border dropdown-toggle hstack"
                menuClassName="w-100"
              >
                {_ratings.map((e, i) => {
                  return (
                    <li
                      key={i}
                      role="button"
                      className="dropdown-item"
                      onClick={() => {
                        formik.setFieldValue("rating", e);
                      }}
                    >
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
                onChange={(evt) => {
                  const newLen = evt.target.value.length;
                  if (newLen < 1000) {
                    formik.handleChange(evt);
                  }
                }}
              />
              <div className="clearfix">
                <div className="float-end small text-muted">
                  {formik.values.description?.length ?? 0}/1000
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex mt-3">
            <button
              type="submit"
              className="btn btn-primary rounded-2 ms-auto"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting && (
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
              )}
              Post review
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default ShopReviewEdit;