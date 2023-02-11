import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { ShopDetailContext } from "../../common/contexts";
import { ShopGeneral } from "../../common/models";
import {
  parseErrorResponse,
  setEmptyOrString,
  setStringToSlug
} from "../../common/utils";
import { updateShopGeneral } from "../../services/ShopService";
import { Input } from "../forms";
import { RichTextEditorInputProps } from "../forms/RichTextEditor";
import ProgressButton from "../ProgressButton";

const DynamicEditor = dynamic<RichTextEditorInputProps>(
  () => import("../../components/forms").then((f) => f.RichTextEditor),
  {
    ssr: false
  }
);

function ShopGeneralEdit() {
  const shopContext = useContext(ShopDetailContext);
  const router = useRouter();

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
      const shop = await updateShopGeneral(values);
      router.replace({
        href: `/shops/[slug]`,
        query: { slug: shop.slug, tab: "settings" }
      });
    } catch (error) {
      const msg = parseErrorResponse(error);
    } finally {
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
        <div className="card-header py-3 bg-white border-bottom">
          <h4 className="mb-0">General</h4>
        </div>
        <div className="card-body">
          <div className="row g-3 mb-3">
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
          </div>
          <div className="row g-3 mb-3">
            <div className="order-5 order-lg-3 order-md-5 col-lg-6">
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
            <div className="order-3 order-lg-4 order-md-3 order-1 col-lg-6">
              <Input
                label="Headline"
                id="headlineInput"
                type="text"
                className="mb-3"
                placeholder="Enter shop headline"
                {...register("headline")}
              />
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

export default ShopGeneralEdit;
