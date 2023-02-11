import { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { ShopDetailContext } from "../../common/contexts";
import { ShopContact } from "../../common/models";
import { parseErrorResponse, setEmptyOrNumber } from "../../common/utils";
import { updateShopContact } from "../../services/ShopService";
import { Input, TagInput } from "../forms";
import ProgressButton from "../ProgressButton";

function ShopContactEdit() {
  const shopContext = useContext(ShopDetailContext);

  const {
    control,
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    setValue
  } = useForm<ShopContact>({
    values: {
      id: shopContext?.contact?.id ?? 0,
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
    } catch (error) {
      const msg = parseErrorResponse(error);
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={(evt) => {
        evt.preventDefault();
        handleSubmit(async (data) => {
          await save(data);
        })();
      }}
    >
      <div className="card shadow-sm">
        <div className="card-header bg-white py-3 border-bottom">
          <h4 className="mb-0">Contact</h4>
        </div>
        <div className="card-body">
          <div className="mb-3">
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

          <div className="mb-3">
            <Input
              label="Address"
              placeholder="Enter shop address"
              {...register("address")}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Location</label>
            <div className="row g-3">
              <div className="col-md-6">
                <Input
                  placeholder="Enter latitude"
                  error={errors.latitude?.message}
                  {...register("latitude", {
                    setValueAs: setEmptyOrNumber,
                    validate: (v) => {
                      const floatRegex = "^([0-9]*[.])?[0-9]+$";
                      if (!`${v}`.match(floatRegex)) {
                        return "Invalid value";
                      }
                      return true;
                    }
                  })}
                />
              </div>
              <div className="col-md-6">
                <Input
                  placeholder="Enter longitude"
                  error={errors.longitude?.message}
                  {...register("longitude", {
                    setValueAs: setEmptyOrNumber,
                    validate: (v) => {
                      const floatRegex = "^([0-9]*[.])?[0-9]+$";
                      if (!`${v}`.match(floatRegex)) {
                        return "Invalid value";
                      }
                      return true;
                    }
                  })}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="card-footer py-2h">
          <div className="clearfix">
            <ProgressButton
              type="submit"
              loading={isSubmitting}
              className="float-end"
            >
              Update
            </ProgressButton>
          </div>
        </div>
      </div>
    </form>
  );
}

export default ShopContactEdit;
