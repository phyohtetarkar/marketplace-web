import { useForm } from "react-hook-form";
import { ShopAcceptedPayment } from "../../common/models";
import { setEmptyOrString } from "../../common/utils";
import { Input } from "../forms";
import ProgressButton from "../ProgressButton";

interface AcceptedPaymentEditProps {
  value?: ShopAcceptedPayment;
  submit?: (value: ShopAcceptedPayment) => Promise<void>;
  handleClose?: () => void;
}

function AcceptedPaymentEdit(props: AcceptedPaymentEditProps) {
  const { value, submit, handleClose } = props;
  const {
    formState: { errors, isSubmitting },
    register,
    handleSubmit
  } = useForm<ShopAcceptedPayment>({ values: value });
  return (
    <>
      <div className="modal-header">
        <h4 className="modal-title">Accepted payment</h4>
        <button
          type="button"
          className="btn-close shadow-none"
          aria-label="Close"
          onClick={handleClose}
        ></button>
      </div>
      <div className="modal-body">
        <div className="row g-3">
          <div className="col-12">
            <Input
              label="Account type *"
              id="accountTypeInput"
              type="text"
              placeholder="Eg. KBZ Pay, AYA Pay, CB Account"
              {...register("accountType", {
                setValueAs: setEmptyOrString,
                required: "Please enter account type"
              })}
              error={errors.accountType?.message}
            />
          </div>

          <div className="col-12">
            <Input
              label="Account name *"
              id="accountNameInput"
              type="text"
              placeholder="Enter account name"
              {...register("accountName", {
                setValueAs: setEmptyOrString,
                required: "Please enter account name"
              })}
              error={errors.accountName?.message}
            />
          </div>
          <div className="col-12">
            <Input
              label="Account number *"
              id="accountNumberInput"
              type="text"
              placeholder="Enter account number or pay number"
              {...register("accountNumber", {
                setValueAs: setEmptyOrString,
                required: "Please enter account number"
              })}
              error={errors.accountNumber?.message}
            />
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <ProgressButton
          loading={isSubmitting}
          onClick={() => {
            handleSubmit(async (data) => {
              await submit?.(data);
            })();
          }}
        >
          Save
        </ProgressButton>
      </div>
    </>
  );
}

export default AcceptedPaymentEdit;
