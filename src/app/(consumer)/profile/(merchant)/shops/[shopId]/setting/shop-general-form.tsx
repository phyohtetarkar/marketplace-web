import { Shop, ShopUpdate } from "@/common/models";
import {
  parseErrorResponse,
  setEmptyOrString,
  setStringToSlug
} from "@/common/utils";
import ProgressButton from "@/components/ProgressButton";
import { Input } from "@/components/forms";
import { RichTextEditorInputProps } from "@/components/forms/RichTextEditor";
import { updateShop } from "@/services/ShopService";
import dynamic from "next/dynamic";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useSWRConfig } from "swr";

const DynamicEditor = dynamic<RichTextEditorInputProps>(
  () => import("@/components/forms").then((f) => f.RichTextEditor),
  {
    ssr: false
  }
);

const ShopGeneralForm = ({ shop }: { shop: Shop }) => {
  const { mutate } = useSWRConfig();

  const {
    control,
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    setValue
  } = useForm<ShopUpdate>({
    values: {
      shopId: shop?.id,
      name: shop?.name,
      slug: shop?.slug,
      about: shop?.about,
      headline: shop?.headline
    }
  });

  const executeSave = async (values: ShopUpdate) => {
    try {
      await updateShop(values);
      mutate<Shop>(`/vendor/shops/${values.shopId}`).then((s) => {
        setValue("slug", s?.slug);
      });
      toast.success("Update success");
    } catch (error) {
      const msg = parseErrorResponse(error);
      toast.error(msg);
    }
  };

  return (
    <div className="card">
      <div className="card-header py-3">
        <h5 className="mb-0">Basic information</h5>
      </div>
      <div className="card-body">
        <div className="row g-3">
          <div className="col-lg-6">
            <Input
              label="Name *"
              id="nameInput"
              type="text"
              placeholder="Enter shop name"
              {...register("name", {
                setValueAs: setEmptyOrString,
                required: "Please enter shop name",
                onChange: (evt) => {
                  setValue("slug", setStringToSlug(evt.target.value), {
                    shouldValidate: !!errors.slug?.message
                  });
                }
              })}
              error={errors.name?.message}
            />
          </div>
          <div className="col-lg-6">
            <Controller
              control={control}
              name="slug"
              rules={{
                validate: (v) => {
                  if (!setStringToSlug(v)) {
                    return "Please enter valid slug";
                  }
                  return true;
                }
              }}
              render={({ field, fieldState: { error } }) => {
                return (
                  <>
                    <Input
                      label="Slug *"
                      value={field.value ?? ""}
                      onChange={(evt) => {
                        setValue("slug", setStringToSlug(evt.target.value), {
                          shouldValidate: true
                        });
                      }}
                      error={error?.message}
                    />
                  </>
                );
              }}
            />
          </div>
          <div className="col-12">
            <Input
              label="Headline"
              id="headlineInput"
              type="text"
              placeholder="Enter shop headline"
              {...register("headline")}
            />
          </div>

          <div className="col-12">
            <label className="form-label">About us</label>
            <Controller
              control={control}
              name="about"
              render={({ field }) => {
                return (
                  <DynamicEditor
                    id="aboutInput"
                    placeholder="Enter about us..."
                    minHeight={300}
                    value={field.value ?? ""}
                    onEditorChange={(value) => {
                      setValue("about", value);
                    }}
                  />
                );
              }}
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

export default ShopGeneralForm;
