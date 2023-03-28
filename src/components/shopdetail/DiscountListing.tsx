import { useState } from "react";
import { MoreVertical } from "react-feather";
import useSWR from "swr";
import { Discount, PageData } from "../../common/models";
import { parseErrorResponse } from "../../common/utils";
import { deleteDiscount, findDiscounts } from "../../services/DiscountService";
import Alert from "../Alert";
import ConfirmModal from "../ConfirmModal";
import Dropdown from "../Dropdown";
import Loading from "../Loading";
import Modal from "../Modal";
import Pagination from "../Pagination";
import DiscountApply from "./DiscountApply";
import DiscountEdit from "./DiscountEdit";

function DiscountListing({ shopId }: { shopId: number }) {
  const [page, setPage] = useState(0);
  const [discount, setDiscount] = useState<Discount>();
  const [showEdit, setShowEdit] = useState(false);
  const [showApply, setShowApply] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { data, error, isLoading, mutate } = useSWR<PageData<Discount>, Error>(
    [`/discounts/${shopId}`, page],
    ([url, p]) => findDiscounts(shopId, p),
    {
      revalidateOnFocus: false
    }
  );

  const type = (type: Discount["type"]) => {
    if (type === "PERCENTAGE") {
      return <strong>%</strong>;
    }

    if (type === "FIXED_AMOUNT") {
      return <strong>Fixed</strong>;
    }
    return undefined;
  };

  const content = () => {
    if (isLoading) {
      return <Loading />;
    }

    if (error) {
      return (
        <div className="p-3">
          <Alert message={parseErrorResponse(error)} variant="danger" />
        </div>
      );
    }

    if ((data?.contents.length ?? 0) === 0) {
      return (
        <div className="p-3">
          <Alert message="No discounts found" />
        </div>
      );
    }

    return (
      <>
        <div className="table-responsive">
          <table className="table bg-white align-middle">
            <thead className="table-light text-nowrap align-middle">
              <tr style={{ height: 50 }}>
                <th
                  className="ps-3 ps-lg-4 fw-medium"
                  style={{ minWidth: 200 }}
                >
                  NAME
                </th>
                <th className="fw-medium" style={{ minWidth: 120 }}>
                  VALUE
                </th>
                <th className="fw-medium" style={{ minWidth: 150 }}>
                  TYPE
                </th>
                <th className="fw-medium" style={{ minWidth: 50 }}></th>
              </tr>
            </thead>
            <tbody className="border-top-0">
              {data?.contents &&
                data?.contents.map((d, i) => {
                  return (
                    <tr key={d.id}>
                      <td className="ps-3 ps-lg-4 w-100 py-2h">
                        <span>{d.title}</span>
                      </td>
                      <td>
                        <span className="text-nowrap">{d.value}</span>
                      </td>
                      <td>
                        <span className="text-nowrap">{type(d.type)}</span>
                      </td>
                      <td>
                        <div className="hstack align-items-center">
                          <Dropdown
                            toggle={
                              <div role="button" className="text-muted">
                                <MoreVertical width={20} />
                              </div>
                            }
                            popperConfig={{
                              placement: "left",
                              strategy: "fixed"
                            }}
                            menuClassName="border-0 shadow-lg"
                          >
                            <li
                              role="button"
                              className="dropdown-item"
                              onClick={() => {
                                setDiscount(d);
                                setShowEdit(true);
                              }}
                            >
                              Edit
                            </li>
                            <li
                              role="button"
                              className="dropdown-item"
                              onClick={() => {
                                setDiscount(d);
                                setShowApply(true);
                              }}
                            >
                              Apply
                            </li>
                            <div className="dropdown-divider"></div>
                            <li
                              role="button"
                              className="text-danger dropdown-item"
                              onClick={() => {
                                setDiscount(d);
                                setShowConfirm(true);
                              }}
                            >
                              Delete
                            </li>
                          </Dropdown>
                          {/* <button
                            className="btn btn-primary"
                            onClick={() => {}}
                          >
                            <DocumentCheckIcon width={20} />
                          </button>
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              setDiscount(d);
                              setShowEdit(true);
                            }}
                          >
                            <PencilSquareIcon width={20} />
                          </button>
                          <button
                            disabled={false}
                            className="btn btn-danger"
                            onClick={async () => {}}
                          >
                            <TrashIcon width={20} />
                          </button> */}
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>

        <div className="d-flex justify-content-end p-3 pt-0">
          <Pagination
            currentPage={data?.currentPage}
            totalPage={data?.totalPage}
            onChange={setPage}
          />
        </div>
      </>
    );
  };

  return (
    <>
      <div className="p-0">
        <div className="card shadow-sm">
          <div className="card-header bg-white py-2h border-bottom">
            <div className="hstack">
              <h5 className="mb-0">Discounts</h5>
              <div className="flex-grow-1"></div>
              <button
                className="btn btn-primary py-2"
                onClick={() => {
                  setDiscount({ type: "PERCENTAGE" });
                  setShowEdit(true);
                }}
              >
                Create new
              </button>
            </div>
          </div>
          <div className="card-body p-0">{content()}</div>
        </div>
      </div>

      <Modal
        id="discountEditModal"
        show={showEdit}
        onHidden={() => setDiscount(undefined)}
        variant="large"
      >
        {(isShown) => {
          return isShown && discount ? (
            <DiscountEdit
              discount={discount}
              currentPage={page}
              handleClose={(result) => {
                result && mutate();
                setShowEdit(false);
              }}
            />
          ) : (
            <></>
          );
        }}
      </Modal>
      <Modal
        id="applyDiscountModal"
        show={showApply}
        variant="large"
        onHidden={() => {
          setDiscount(undefined);
        }}
      >
        {(isShown) => {
          return isShown && discount ? (
            <DiscountApply
              discount={discount}
              handleClose={() => {
                setShowApply(false);
              }}
            />
          ) : (
            <></>
          );
        }}
      </Modal>
      <ConfirmModal
        show={showConfirm}
        message="Are you sure to delete?"
        onConfirm={async () => {
          try {
            discount?.id && (await deleteDiscount(discount.id));
            mutate();
          } catch (error) {
            const msg = parseErrorResponse(error);
            console.log(msg);
          }
        }}
        close={() => {
          setShowConfirm(false);
          setDiscount(undefined);
        }}
      />
    </>
  );
}

export default DiscountListing;
