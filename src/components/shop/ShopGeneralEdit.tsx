import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ShopDetailContext } from "../../common/contexts";
import { ShopGeneral } from "../../common/models";
import {
  parseErrorResponse,
  setEmptyOrString,
  setStringToSlug
} from "../../common/utils";
import { updateShopGeneral } from "../../services/ShopService";
import Alert from "../Alert";
import { Input } from "../forms";
import { RichTextEditorInputProps } from "../forms/RichTextEditor";
import ProgressButton from "../ProgressButton";

const DynamicEditor = dynamic<RichTextEditorInputProps>(
  () => import("../../components/forms").then((f) => f.RichTextEditor),
  {
    ssr: false
  }
);

function ShopGeneralEdit({ handleClose }: { handleClose?: () => void }) {
  const shopContext = useContext(ShopDetailContext);
  const router = useRouter();
  const [error, setError] = useState<string>();

  const {
    control,
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    setValue
  } = useForm<ShopGeneral>({
    values: {
      shopId: shopContext?.id,
      name: shopContext?.name,
      slug: shopContext?.slug,
      about: shopContext?.about,
      headline: shopContext?.headline
    }
  });

  const save = async (values: ShopGeneral) => {
    try {
      setError(undefined);
      const shop = await updateShopGeneral(values);
      router.replace({
        pathname: `/account/shops/[shopId]`,
        query: { shopId: shop.id }
      });
      handleClose?.();
    } catch (error) {
      const msg = parseErrorResponse(error);
      setError(msg);
    } finally {
    }
  };
  return (
    <>
      <div className="modal-header">
        <h4 className="modal-title">General info</h4>
        <button
          type="button"
          className="btn-close shadow-none"
          aria-label="Close"
          onClick={handleClose}
        ></button>
      </div>
      <div className="modal-body">
        {/* <div className="card-header py-3 bg-white border-bottom">
          <h4 className="mb-0">General</h4>
        </div> */}
        {error && <Alert message={error} variant="danger" />}
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
            <Input
              label="Slug *"
              id="slugInput"
              type="text"
              placeholder="your-shop-name"
              {...register("slug", {
                setValueAs: setEmptyOrString,
                required: "Please enter slug"
              })}
              error={errors.slug?.message}
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
        {/* <div className="card-footer py-2h">
            <div className="clearfix"></div>
          </div> */}
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

export default ShopGeneralEdit;
