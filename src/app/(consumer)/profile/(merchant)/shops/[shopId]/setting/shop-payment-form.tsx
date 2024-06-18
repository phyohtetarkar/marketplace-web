import { ProgressContext } from "@/common/contexts";
import { ShopAcceptedPayment, ShopSetting } from "@/common/models";
import { parseErrorResponse } from "@/common/utils";
import ConfirmModal from "@/components/ConfirmModal";
import Modal from "@/components/Modal";
import Tooltip from "@/components/Tooltip";
import { AcceptedPaymentEdit } from "@/components/shop";
import {
  deleteShopAcceptedPayment,
  getShopAcceptedPayments,
  saveShopAcceptedPayment
} from "@/services/AcceptedPaymentService";
import { getShopSetting, updateShopSetting } from "@/services/ShopService";
import {
  RiAddCircleLine,
  RiDeleteBinLine,
  RiPencilFill
} from "@remixicon/react";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import useSWR from "swr";

const ShopPaymentForm = ({ shopId }: { shopId: number }) => {
  const [acceptedPayment, setAcceptedPayment] = useState<ShopAcceptedPayment>();

  const [showEdit, setShowEdit] = useState(false);

  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const progressContext = useContext(ProgressContext);

  const settingState = useSWR(
    `/vendor/shops/${shopId}/setting`,
    () => getShopSetting(shopId),
    { revalidateOnFocus: false }
  );

  const acceptedPaymentsState = useSWR(
    `/vendor/shops/${shopId}/accepted-payments`,
    () => getShopAcceptedPayments(shopId),
    {
      revalidateOnFocus: false
    }
  );

  const [setting, setSetting] = useState<ShopSetting>({
    shopId: shopId,
    cashOnDelivery: false,
    bankTransfer: false
  });

  useEffect(() => {
    settingState.data && setSetting({ ...settingState.data, shopId: shopId });
  }, [shopId, settingState.data, setSetting]);

  useEffect(() => {
    if (settingState.error) {
      const msg = parseErrorResponse(settingState.error);
      toast.error(msg);
    }
  }, [settingState.error]);

  const handleSettingChange = async (evt: ChangeEvent<HTMLInputElement>) => {
    try {
      if (
        evt.target.name === "bankTransfer" &&
        evt.target.checked &&
        !acceptedPaymentsState.data?.length
      ) {
        throw "Required at least one accepted payment";
      }
      setSetting((old) => ({
        ...old,
        [evt.target.name]: evt.target.checked
      }));
      await updateShopSetting({
        ...setting,
        [evt.target.name]: evt.target.checked
      });
    } catch (error) {
      var msg = parseErrorResponse(error);
      toast.error(msg);
      setSetting((old) => ({ ...old, [evt.target.name]: !evt.target.checked }));
    }
  };

  const saveAcceptedPayment = async (value: ShopAcceptedPayment) => {
    try {
      await saveShopAcceptedPayment({ ...value, shopId: shopId });
      setAcceptedPayment(undefined);
      setShowEdit(false);
      acceptedPaymentsState.mutate();
    } catch (error) {
      const msg = parseErrorResponse(error);
      toast.error(msg);
    }
  };

  return (
    <div className="card">
      <div className="card-header py-3">
        <h5 className="mb-0">Payment</h5>
      </div>
      <div className="card-body">
        <div className="vstack">
          <h6 className="fw-semibold border-bottom pb-2 mb-3">
            Payment method
          </h6>
          <div className="row mb-4 g-3">
            <div className="col-md-6">
              <div className="form-check form-switch">
                <input
                  id="codCheck"
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  name="cashOnDelivery"
                  disabled={settingState.isLoading}
                  checked={setting?.cashOnDelivery ?? false}
                  onChange={(evt) => {
                    handleSettingChange(evt);
                  }}
                ></input>
                <label
                  htmlFor="codCheck"
                  className="form-check-label fw-medium"
                >
                  Cash on delivery
                </label>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-check form-switch">
                <input
                  id="bankTransferCheck"
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  name="bankTransfer"
                  disabled={settingState.isLoading}
                  checked={setting?.bankTransfer ?? false}
                  onChange={(evt) => {
                    // if (
                    //   evt.target.checked &&
                    //   (acceptedPaymentsState.data?.length ?? 0) === 0
                    // ) {
                    //   toast.error(
                    //     "At least one accepted payment require to enable bank transfer payment"
                    //   );

                    //   return;
                    // }

                    handleSettingChange(evt);
                  }}
                ></input>
                <label
                  htmlFor="bankTransferCheck"
                  className="form-check-label fw-medium"
                >
                  Bank transfer
                </label>
              </div>
            </div>
          </div>

          <div className="hstack border-bottom pb-2 gap-1 mb-3">
            <h6 className="fw-semibold mb-0">Accepted payments</h6>
            <Tooltip title="Add new">
              <div
                role="button"
                className="link-anchor"
                onClick={() => {
                  setAcceptedPayment({});
                  setShowEdit(true);
                }}
              >
                <RiAddCircleLine size={20} />
              </div>
            </Tooltip>
          </div>
          <div className="row row-cols-1 row-cols-md-2 rol-cols-lg-3 g-3">
            {(acceptedPaymentsState.data?.length ?? 0) === 0 && (
              <div className="text-muted">No payment added</div>
            )}
            {acceptedPaymentsState.data?.map((p, i) => {
              return (
                <div key={i} className="col">
                  <div className="card bg-light border-0 position-relative">
                    <div className="card-body">
                      <h6 className="fw-bold">{p.accountType}</h6>
                      <div>{p.accountName}</div>
                      <div className="text-muted">{p.accountNumber}</div>
                    </div>

                    <div className="position-absolute hstack gap-2 top-0 end-0 m-2h">
                      <button
                        className="btn btn-sm btn-outline-anchor"
                        onClick={() => {
                          setAcceptedPayment(p);
                          setShowEdit(true);
                        }}
                      >
                        <RiPencilFill size={18} />
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => {
                          setAcceptedPayment(p);
                          setDeleteConfirm(true);
                        }}
                      >
                        <RiDeleteBinLine size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Modal id="editAcceptedPaymentModal" show={showEdit}>
        {(isShown) =>
          isShown ? (
            <AcceptedPaymentEdit
              value={acceptedPayment}
              submit={async (value) => {
                await saveAcceptedPayment(value);
              }}
              handleClose={() => {
                setAcceptedPayment(undefined);
                setShowEdit(false);
              }}
            />
          ) : (
            <></>
          )
        }
      </Modal>

      <ConfirmModal
        message="Are you sure to delete?"
        show={deleteConfirm}
        close={() => {
          setAcceptedPayment(undefined);
          setDeleteConfirm(false);
        }}
        onConfirm={async (result) => {
          if (!result || !acceptedPayment?.id) {
            return;
          }
          try {
            progressContext.update(true);
            await deleteShopAcceptedPayment(shopId, acceptedPayment.id);
            acceptedPaymentsState.mutate();
            setAcceptedPayment(undefined);
            setDeleteConfirm(false);
          } catch (error) {
            const msg = parseErrorResponse(error);
            toast.error(msg);
          } finally {
            progressContext.update(false);
          }
        }}
      />
    </div>
  );
};

export default ShopPaymentForm;
