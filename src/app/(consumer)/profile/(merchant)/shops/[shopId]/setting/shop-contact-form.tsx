import { useCities } from "@/common/hooks";
import { City, Shop, ShopContact } from "@/common/models";
import { parseErrorResponse, setEmptyOrNumber } from "@/common/utils";
import ProgressButton from "@/components/ProgressButton";
import { AutocompleteSelect, Input, TagInput } from "@/components/forms";
import { updateShopContact } from "@/services/ShopService";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useSWRConfig } from "swr";

const ShopContactForm = ({ shop }: { shop: Shop }) => {
  const { mutate } = useSWRConfig();

  const citiesState = useCities();

  const {
    control,
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    setValue
  } = useForm<ShopContact>({
    values: {
      shopId: shop?.id,
      phones: shop?.contact?.phones,
      address: shop?.contact?.address,
      latitude: shop?.contact?.latitude,
      longitude: shop?.contact?.longitude,
      city: shop.city
    }
  });

  const executeSave = async (values: ShopContact) => {
    try {
      if (!values.phones || values.phones.length === 0) {
        throw "At least one phone number required";
      }
      await updateShopContact(values);
      mutate<Shop>(`/vendor/shops/${values.shopId}`);
      toast.success("Update success");
    } catch (error) {
      const msg = parseErrorResponse(error);
      toast.error(msg);
    }
  };

  return (
    <div className="card">
      <div className="card-header py-3">
        <h5 className="mb-0">Contact information</h5>
      </div>
      <div className="card-body">
        <div className="row g-3">
          <div className="col-12">
            <label className="form-label">Phones</label>
            <Controller
              control={control}
              name="phones"
              rules={{
                validate: (phones) => {
                  if (!phones || phones.length === 0) {
                    return "At least one phone number required";
                  }

                  return true;
                }
              }}
              render={({ field }) => {
                return (
                  <TagInput
                    data={field.value ?? []}
                    placeholder="Add phone"
                    onTagsChange={(tags) => {
                      setValue("phones", tags, { shouldValidate: true });
                    }}
                    error={errors.phones?.message}
                  />
                );
              }}
            />
            {!errors.phones?.message && (
              <small className="text-muted">
                Click enter to add multiple values
              </small>
            )}
          </div>

          <div className="col-12">
            <label className="form-label">City</label>
            <div className="flex-grow-1">
              <Controller
                control={control}
                name="city"
                rules={{
                  validate: (v) => !!v || "Please select city"
                }}
                render={({ field }) => {
                  return (
                    <AutocompleteSelect<City, number>
                      options={citiesState.cities?.sort((f, s) =>
                        f.name.localeCompare(s.name)
                      )}
                      defaultValue={field.value}
                      placeholder="Select city"
                      getOptionKey={(c) => c.id}
                      getOptionLabel={(c) => c.name}
                      onChange={(c) => {
                        setValue("city", c, {
                          shouldValidate: true
                        });
                      }}
                      error={errors.city?.message}
                    />
                  );
                }}
              />
            </div>
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
      <div className="card-footer border-top-0 py-2h">
        <ProgressButton
          loading={isSubmitting}
          onClick={() => {
            handleSubmit(async (data) => {
              await executeSave(data);
            })();
          }}
        >
          Update
        </ProgressButton>
      </div>
    </div>
  );
};

export default ShopContactForm;
