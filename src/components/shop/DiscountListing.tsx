import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { MoreVertical } from "react-feather";
import useSWR from "swr";
import { Discount, PageData } from "../../common/models";
import { formatTimestamp, parseErrorResponse } from "../../common/utils";
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
      return <Alert message={parseErrorResponse(error)} variant="danger" />;
    }

    if ((data?.contents.length ?? 0) === 0) {
      return <Alert message="No discounts found" />;
    }

    return (
      <>
        <div className="table-responsive">
          <table className="table align-middle">
            <thead className="text-nowrap">
              <tr>
                <th scope="col" style={{ minWidth: 200 }}>
                  NAME
                </th>
                <th scope="col" style={{ minWidth: 120 }}>
                  VALUE
                </th>
                <th scope="col" style={{ minWidth: 100 }}>
                  TYPE
                </th>
                <th scope="col" style={{ minWidth: 150 }}>
                  CREATED AT
                </th>
                <th scope="col" style={{ minWidth: 150 }}>
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody className="text-nowrap">
              {data?.contents.map((d, i) => {
                return (
                  <tr key={d.id}>
                    <td className="w-100 py-2h">
                      <span>{d.title}</span>
                    </td>
                    <td>
                      <span className="text-nowrap">{d.value}</span>
                    </td>
                    <td>
                      <span className="text-nowrap">{type(d.type)}</span>
                    </td>
                    <td>{formatTimestamp(d.createdAt ?? 0)}</td>
                    <td>
                      <div className="hstack align-items-center">
                        <Dropdown
                          toggle={
                            <div role="button" className="">
                              <AdjustmentsHorizontalIcon width={20} />
                            </div>
                          }
                          popperConfig={{
                            placement: "left",
                            strategy: "fixed"
                          }}
                          toggleClassName="btn btn-default"
                          menuClassName="border-0 shadow-lg"
                        >
                          <li
                            role="button"
                            className="dropdown-item"
                            onClick={() => {
                              setDiscount({ ...d, shopId: shopId });
                              setShowEdit(true);
                            }}
                          >
                            Edit
                          </li>
                          <li
                            role="button"
                            className="dropdown-item"
                            onClick={() => {
                              setDiscount({ ...d, shopId: shopId });
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
      <div className="hstack mb-3">
        <div className="flex-grow-1"></div>
        <button
          className="btn btn-primary py-2"
          onClick={() => {
            setDiscount({ type: "PERCENTAGE", shopId: shopId });
            setShowEdit(true);
          }}
        >
          Create new
        </button>
      </div>
      {content()}

      <Modal
        id="discountEditModal"
        show={showEdit}
        onHidden={() => setDiscount(undefined)}
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
              shopId={shopId}
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
