"use client";
import { Product } from "@/common/models";
import { parseErrorResponse } from "@/common/utils";
import ProgressButton from "@/components/ProgressButton";
import { RichTextEditorInputProps } from "@/components/forms/RichTextEditor";
import { updateProductDescription } from "@/services/ProductService";
import dynamic from "next/dynamic";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

const DynamicEditor = dynamic<RichTextEditorInputProps>(
  () => import("@/components/forms").then((f) => f.RichTextEditor),
  {
    ssr: false
  }
);

interface ProductEditProps {
  shopId: number;
  product: Product;
}

function ProductDescriptionUpdate(props: ProductEditProps) {
  const { shopId, product } = props;

  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    setValue
  } = useForm({
    values: {
      description: product.description
    }
  });

  const executeSave = async (value: string) => {
    try {
      await updateProductDescription(shopId, product.id, value);
      toast.success("Product saved");
    } catch (error) {
      const msg = parseErrorResponse(error);
      toast.error(msg);
    }
  };

  return (
    <div className="card">
      <div className="card-header border-bottom">
        <div className="hstack gap-3">
          <h5 className="mb-0">Product description</h5>
          <ProgressButton
            className="ms-auto btn btn-primary"
            loading={isSubmitting}
            onClick={() => {
              handleSubmit((data) => executeSave(data.description ?? ""))();
            }}
          >
            Save
          </ProgressButton>
        </div>
      </div>
      <div className="card-body p-0">
        <Controller
          control={control}
          name="description"
          render={({ field }) => {
            return (
              <DynamicEditor
                id="descriptionInput"
                placeholder="Enter product description..."
                minHeight={380}
                value={field.value}
                iframeEmbed
                noBorder
                onEditorChange={(v) => {
                  setValue("description", v);
                }}
              />
            );
          }}
        />
      </div>
    </div>
  );
}

export default ProductDescriptionUpdate;
