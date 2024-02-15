"use client";
import { ProgressContext } from "@/common/contexts";
import { Discount } from "@/common/models";
import {
  formatNumber,
  formatTimestamp,
  parseErrorResponse
} from "@/common/utils";
import Alert from "@/components/Alert";
import ConfirmModal from "@/components/ConfirmModal";
import Dropdown from "@/components/Dropdown";
import Loading from "@/components/Loading";
import Modal from "@/components/Modal";
import DiscountApply from "@/components/shop/DiscountApply";
import DiscountEdit from "@/components/shop/DiscountEdit";
import { deleteDiscount, findDiscounts } from "@/services/DiscountService";
import { RiPencilFill } from "@remixicon/react";
import { useContext, useState } from "react";
import useSWR from "swr";

function DiscountsPage({ shopId }: { shopId: number }) {
  const [discount, setDiscount] = useState<Discount>();
  const [showEdit, setShowEdit] = useState(false);
  const [showApply, setShowApply] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const progressContext = useContext(ProgressContext);

  const { data, error, isLoading, mutate } = useSWR(
    `/vendor/shops/${shopId}/discounts/`,
    () => findDiscounts(shopId),
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

    if (!data || data.length === 0) {
      return <Alert message="No discounts found" />;
    }

    return (
      <>
        <div className="table-responsive bg-white rounded border">
          <table className="table align-middle mb-0">
            <thead className="text-nowrap align-middle">
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
              {data.map((d, i) => {
                return (
                  <tr key={d.id}>
                    <td className="w-100 py-3">
                      <span>{d.title}</span>
                    </td>
                    <td>{formatNumber(d.value ?? 0)}</td>
                    <td>{d.type === "FIXED_AMOUNT" ? ".00" : "%"}</td>
                    <td>{formatTimestamp(d.audit?.createdAt)}</td>
                    <td>
                      <div className="hstack align-items-center">
                        <Dropdown
                          toggle={
                            <div role="button" className="">
                              <RiPencilFill size={20} />
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
                              setDiscount({ ...d });
                              setShowEdit(true);
                            }}
                          >
                            Edit
                          </li>
                          <li
                            role="button"
                            className="dropdown-item"
                            onClick={() => {
                              setDiscount({ ...d });
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

        {/* <div className="d-flex justify-content-end p-3 pt-0">
          <Pagination
            currentPage={data?.currentPage}
            totalPage={data?.totalPage}
            onChange={setPage}
          />
        </div> */}
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
            setDiscount({ type: "PERCENTAGE" });
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
              shopId={shopId}
              discount={discount}
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
        onConfirm={async (result) => {
          try {
            if (!result) {
              return;
            }
            progressContext.update(true);
            discount?.id && (await deleteDiscount(shopId, discount.id));
            mutate();
          } catch (error) {
            const msg = parseErrorResponse(error);
            console.log(msg);
          } finally {
            setDiscount(undefined);
            progressContext.update(false);
          }
        }}
        close={() => {
          setShowConfirm(false);
        }}
      />
    </>
  );
}

export default DiscountsPage;
