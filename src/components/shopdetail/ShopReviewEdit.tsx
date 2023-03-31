import { useRouter } from "next/router";
import { useCallback, useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  AuthenticationContext,
  ShopDetailContext
} from "../../common/contexts";
import { ShopReview } from "../../common/models";
import { parseErrorResponse } from "../../common/utils";
import { getUserReview, writeReview } from "../../services/ShopReviewService";
import Dropdown from "../Dropdown";
import { Textarea } from "../forms";
import ProgressButton from "../ProgressButton";
import Rating from "../Rating";

const _ratings = [5, 4, 3, 2, 1];

interface ShopReviewEditProps {
  reload?: () => void;
}

function ShopReviewEdit(props: ShopReviewEditProps) {
  const { reload } = props;
  const shopContext = useContext(ShopDetailContext);
  const authContext = useContext(AuthenticationContext);
  const router = useRouter();
  const [review, setReview] = useState<ShopReview>({
    shopId: shopContext?.id
  });

  const loadUserReview = useCallback(async (shopId: number) => {
    try {
      const review = await getUserReview(shopId);
      review && setReview({ ...review, shopId: shopId });
    } catch (error) {}
  }, []);

  const {
    control,
    register,
    formState: { isSubmitting },
    handleSubmit,
    setValue
  } = useForm<ShopReview>({
    values: review
  });

  // const formik = useFormik<ShopReview>({
  //   initialValues: {
  //     shopId: shopContext?.id
  //   },
  //   enableReinitialize: true,
  //   validateOnBlur: false,
  //   validateOnChange: false,
  //   onSubmit: (values) => {
  //     postReview(values);
  //   }
  // });

  useEffect(() => {
    if (authContext.status !== "success") {
      return;
    }
    loadUserReview(shopContext?.id ?? 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authContext]);

  const postReview = async (values: ShopReview) => {
    try {
      if (authContext.status !== "success") {
        router.push("/login");
        return;
      }
      await writeReview(values);
      reload?.();
      await loadUserReview(values.shopId ?? 0);
    } catch (error) {
      const msg = parseErrorResponse(error);
    } finally {
    }
  };

  return (
    <form
      onSubmit={(evt) => {
        evt.preventDefault();
        handleSubmit(async (data) => {
          await postReview(data);
        })();
      }}
    >
      <div className="card mb-3">
        <div className="card-header py-3">
          <h5 className="mb-0">
            {!review.id ? "Write Review" : "Your Review"}
          </h5>
        </div>
        <div className="card-body">
          <div className="row gap-3">
            <div className="col-lg-12">
              <Controller
                control={control}
                name="rating"
                rules={{
                  required: "Please select rating"
                }}
                render={({ field, fieldState: { error } }) => {
                  return (
                    <>
                      <Dropdown
                        toggle={
                          !field.value ? (
                            <span className="flex-grow-1 text-muted text-start">
                              Choose rating
                            </span>
                          ) : (
                            <div className="hstack gap-1 flex-grow-1">
                              <Rating rating={field.value} />
                              <span>({field.value}/5)</span>
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
                                setValue("rating", e);
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
                      {error?.message && (
                        <small className="text-danger">{error.message}</small>
                      )}
                    </>
                  );
                }}
              />
            </div>
            <div className="col-lg-12">
              <Controller
                control={control}
                name="description"
                render={({ field, fieldState: { error } }) => {
                  return (
                    <>
                      <Textarea
                        name="description"
                        placeholder="Write your review"
                        value={field.value ?? ""}
                        onChange={(evt) => {
                          const newLen = evt.target.value.length;
                          if (newLen < 1000) {
                            setValue("description", evt.target.value);
                          }
                        }}
                      />
                      <div className="clearfix">
                        <div className="float-end small text-muted">
                          {field.value?.length ?? 0}/1000
                        </div>
                      </div>
                    </>
                  );
                }}
              />
            </div>
          </div>
          <div className="d-flex mt-3">
            <ProgressButton
              type="submit"
              className="ms-auto px-3 py-2"
              loading={isSubmitting}
            >
              {!review.id ? "Post review" : "Update review"}
            </ProgressButton>
          </div>
        </div>
      </div>
    </form>
  );
}

export default ShopReviewEdit;
