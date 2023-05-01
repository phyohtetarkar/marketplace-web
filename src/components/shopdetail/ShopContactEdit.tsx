import { useRouter } from "next/router";
import { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { ShopDetailContext } from "../../common/contexts";
import { ShopContact } from "../../common/models";
import { parseErrorResponse, setEmptyOrNumber } from "../../common/utils";
import { updateShopContact } from "../../services/ShopService";
import { Input, TagInput } from "../forms";
import ProgressButton from "../ProgressButton";

function ShopContactEdit({ handleClose }: { handleClose?: () => void }) {
  const shopContext = useContext(ShopDetailContext);
  const router = useRouter();

  const {
    control,
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    setValue
  } = useForm<ShopContact>({
    values: {
      shopId: shopContext?.id,
      phones: shopContext?.contact?.phones,
      address: shopContext?.contact?.address,
      latitude: shopContext?.contact?.latitude,
      longitude: shopContext?.contact?.longitude
    }
  });

  const save = async (values: ShopContact) => {
    try {
      console.log(values);
      await updateShopContact(values);
      router.replace(router.asPath);
      handleClose?.();
    } catch (error) {
      const msg = parseErrorResponse(error);
      console.log(error);
    }
  };

  return (
    <>
      <div className="modal-header">
        <h4 className="modal-title">Contact</h4>
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
            <label className="form-label">Phones</label>
            <Controller
              control={control}
              name="phones"
              render={({ field }) => {
                return (
                  <TagInput
                    data={field.value ?? []}
                    placeholder="Add phone"
                    onTagsChange={(tags) => {
                      setValue("phones", tags);
                    }}
                  />
                );
              }}
            />
          </div>

          <div className="col-12">
            <Input
              label="Address"
              placeholder="Enter shop address"
              {...register("address")}
            />
          </div>

          <div className="col-lg-6">
            <Input
              label="Latitude"
              placeholder="Enter latitude"
              error={errors.latitude?.message}
              {...register("latitude", {
                setValueAs: setEmptyOrNumber,
                validate: (v) => {
                  if (v) {
                    const floatRegex = "^([0-9]*[.])?[0-9]+$";
                    if (!`${v}`.match(floatRegex)) {
                      return "Invalid value";
                    }
                  }
                  return true;
                }
              })}
            />
          </div>

          <div className="col-lg-6">
            <Input
              label="Longitude"
              placeholder="Enter longitude"
              error={errors.longitude?.message}
              {...register("longitude", {
                setValueAs: setEmptyOrNumber,
                validate: (v) => {
                  if (v) {
                    const floatRegex = "^([0-9]*[.])?[0-9]+$";
                    if (!`${v}`.match(floatRegex)) {
                      return "Invalid value";
                    }
                  }
                  return true;
                }
              })}
            />
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <ProgressButton
          loading={isSubmitting}
          onClick={() => {
            handleSubmit(async (data) => {
              await save(data);
            })();
          }}
        >
          Update
        </ProgressButton>
      </div>
    </>
  );
}

export default ShopContactEdit;
