/* eslint-disable @next/next/no-img-element */
import { useContext, useEffect, useState } from "react";
import { ShopDetailContext } from "../../common/contexts";
import { Discount, Product } from "../../common/models";
import { formatPrice, parseErrorResponse } from "../../common/utils";
import { applyDiscount, removeDiscount } from "../../services/DiscountService";
import { findProducts, ProductQuery } from "../../services/ProductService";
import Alert from "../Alert";
import { Input } from "../forms";
import Loading from "../Loading";

interface DiscountApplyCheckProps {
  discounId: number;
  productId: number;
  applied: boolean;
}

const DiscountApplyCheck = (props: DiscountApplyCheckProps) => {
  const { discounId, productId, applied } = props;
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
                applyDiscount(discounId, [productId])
                  .then(() => {
                    setChecked(evt.target.checked);
                  })
                  .catch((error) => {
                    const msg = parseErrorResponse(error);
                  })
                  .finally(() => setLoading(false));
              } else {
                removeDiscount(discounId, productId)
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
  handleClose
}: {
  discount: Discount;
  handleClose?: () => void;
}) {
  const shopContext = useContext(ShopDetailContext);
  const [products, setProducts] = useState<Product[]>([]);
  const [nextPage, setNextPage] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [appliedOnly, setAppliedOnly] = useState(false);

  useEffect(() => {
    if (!shopContext?.id) {
      return;
    }

    const query: ProductQuery = {
      "shop-id": shopContext?.id,
      "discount-id": appliedOnly ? discount.id : undefined
    };

    setLoading(true);
    findProducts(query)
      .then((data) => {
        setProducts(data.contents);
        setNextPage(
          data.currentPage < data.totalPage - 1 ? data.currentPage + 1 : -1
        );
      })
      .catch((error) => {
        const msg = parseErrorResponse(error);
      })
      .finally(() => {
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appliedOnly]);

  const loadMore = () => {
    if (nextPage <= 0) {
      return;
    }
    const query: ProductQuery = {
      "shop-id": shopContext?.id,
      "discount-id": appliedOnly ? discount.id : undefined,
      page: nextPage
    };

    setLoading(true);
    findProducts(query)
      .then((data) => {
        setProducts((old) => [...old, ...data.contents]);
        setNextPage(
          data.currentPage < data.totalPage - 1 ? data.currentPage + 1 : -1
        );
      })
      .catch((error) => {
        const msg = parseErrorResponse(error);
      })
      .finally(() => {
        setLoading(false);
      });
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
                  checked={appliedOnly}
                  onChange={(evt) => setAppliedOnly(evt.target.checked)}
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
        {/* {error && (
          <Alert message={parseErrorResponse(error)} variant="danger" />
        )} */}
        <div className="row row-cols-1 row-cols-lg-2 g-3">
          {products.map((p, i) => {
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
                        {formatPrice(p.price ?? 0)} Ks
                      </small>
                    </div>
                  </div>
                  <div className="flex-grow-1"></div>
                  <div className="me-2">
                    {/* <input
                      id={`${p.id}Check`}
                      type="checkbox"
                      name="product"
                      className="form-check-input shadow-none"
                    /> */}
                    <DiscountApplyCheck
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
        {loading && <Loading />}
        {nextPage > 0 && !loading && (
          <div className="hstack justify-content-center mt-3">
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={loadMore}
            >
              Load more
            </button>
          </div>
        )}
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
