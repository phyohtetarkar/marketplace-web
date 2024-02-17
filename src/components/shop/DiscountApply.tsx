/* eslint-disable @next/next/no-img-element */
import { Discount } from "@/common/models";
import { formatNumber, parseErrorResponse } from "@/common/utils";
import { applyDiscount, removeDiscount } from "@/services/DiscountService";
import {
  ProductQuery,
  findShopProducts
} from "@/services/ProductService";
import { useState } from "react";
import useSWR from "swr";
import Alert from "../Alert";
import Loading from "../Loading";
import Pagination from "../Pagination";
import { Input } from "../forms";

interface DiscountApplyCheckProps {
  shopId: number;
  discounId: number;
  productId: number;
  applied: boolean;
}

const DiscountApplyCheck = (props: DiscountApplyCheckProps) => {
  const { shopId, discounId, productId, applied } = props;
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(applied);

  return (
    <>
      {loading ? (
        <span
          className="spinner-border spinner-border-sm text-primary me-2"
          role="status"
          aria-hidden="true"
        ></span>
      ) : (
        <div className="form-check">
          <input
            id={`${discounId}Check`}
            type="checkbox"
            name="product"
            className="form-check-input shadow-none"
            checked={checked}
            onChange={(evt) => {
              setLoading(true);
              if (evt.target.checked) {
                applyDiscount(shopId, discounId, [productId])
                  .then(() => {
                    setChecked(evt.target.checked);
                  })
                  .catch((error) => {
                    const msg = parseErrorResponse(error);
                  })
                  .finally(() => setLoading(false));
              } else {
                removeDiscount(shopId, productId)
                  .then(() => {
                    setChecked(evt.target.checked);
                  })
                  .catch((error) => {
                    const msg = parseErrorResponse(error);
                  })
                  .finally(() => setLoading(false));
              }
            }}
          />
        </div>
      )}
    </>
  );
};

function DiscountApply({
  discount,
  handleClose,
  shopId
}: {
  discount: Discount;
  handleClose?: () => void;
  shopId: number;
}) {
  const [query, setQuery] = useState<ProductQuery>({});

  const { data, error, isLoading, mutate } = useSWR(
    [`/vendor/${shopId}/products`, query],
    ([url, query]) => findShopProducts(shopId, query),
    {
      revalidateOnFocus: false
    }
  );

  const content = () => {
    if (isLoading) {
      return <Loading />;
    }

    if (error) {
      return <Alert message={parseErrorResponse(error)} variant="danger" />;
    }

    if (!data || data.contents.length === 0) {
      return <Alert message="No products found" />;
    }

    return (
      <>
        <div className="row row-cols-1 row-cols-lg-2 g-3">
          {data.contents.map((p, i) => {
            return (
              <div key={p.id} className="col">
                <div className="hstack gap-2h rounded border">
                  <div className="flex-shrink-0">
                    <img
                      src={p.thumbnail ?? "/images/placeholder.jpeg"}
                      alt=""
                      width={100}
                      height={100}
                      className="rounded-start"
                    />
                  </div>
                  <div className="text-truncate">
                    <div className="vstack">
                      <h6 className="mb-1 text-truncate">{p.name}</h6>
                      <small className="text-muted">
                        {formatNumber(p.price ?? 0)} Ks
                      </small>
                    </div>
                  </div>
                  <div className="flex-grow-1"></div>
                  <div className="me-2">
                    <DiscountApplyCheck
                      shopId={shopId}
                      discounId={discount.id ?? 0}
                      productId={p.id ?? 0}
                      applied={discount.id === p.discount?.id}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="d-flex justify-content-end mt-3">
          <Pagination
            currentPage={data?.currentPage}
            totalPage={data?.totalPage}
            onChange={(p) => {
              setQuery((old) => ({ ...old, page: p }));
            }}
          />
        </div>
      </>
    );
  };

  return (
    <>
      <div className="modal-header">
        <h5 className="modal-title">Apply discount</h5>
        <div className="text-muted ms-2">
          ({discount.title}&nbsp;-{discount.value}
          {discount.type === "FIXED_AMOUNT" ? "Ks" : "%"})
        </div>
        <button
          type="button"
          className="btn-close shadow-none"
          aria-label="Close"
          onClick={handleClose}
        ></button>
      </div>
      <div className="modal-body">
        <Alert
          message={
            "Applying discount will override existing discount on product."
          }
          variant="warning"
        />
        <div className="row mb-4">
          <div className="col-12">
            <div className="d-flex flex-wrap align-items-center gap-3">
              <div>
                <Input type={"text"} placeholder="Search..." height={46} />
              </div>
              <div className="form-check">
                <input
                  id={`showAppliedInput`}
                  type="checkbox"
                  name="showApplied"
                  className="form-check-input shadow-none"
                  onChange={(evt) => {
                    setQuery((old) => {
                      return {
                        ...old,
                        "discount-id": evt.target.checked ? discount.id : undefined,
                        page: undefined
                      };
                    });
                  }}
                />
                <label
                  htmlFor={`showAppliedInput`}
                  className="form-check-label"
                >
                  Show applied
                </label>
              </div>
            </div>
          </div>
        </div>
        {content()}
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-primary" onClick={handleClose}>
          Done
        </button>
      </div>
    </>
  );
}

export default DiscountApply;
