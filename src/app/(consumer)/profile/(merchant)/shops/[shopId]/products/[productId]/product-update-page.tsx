"use client";
import { ProgressContext } from "@/common/contexts";
import { useProduct } from "@/common/hooks";
import { parseErrorResponse } from "@/common/utils";
import Alert from "@/components/Alert";
import ConfirmModal from "@/components/ConfirmModal";
import Dropdown from "@/components/Dropdown";
import Loading from "@/components/Loading";
import {
  deleteProduct,
  draftProduct,
  publishProduct
} from "@/services/ProductService";
import { RiDeleteBinLine } from "@remixicon/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CSSProperties, useContext, useState } from "react";
import { toast } from "react-toastify";
import ProductDescriptionUpdate from "./ProductDescriptionUpdate";
import ProductGeneralUpdate from "./ProductGeneralUpdate";
import ProductImagesUpdate from "./ProductImagesUpdate";
import ProductVariantsUpdate from "./ProductVariantsUpdate";

interface ProductEditProps {
  shopId: number;
  productId: number;
}

function ProductUpdatePage(props: ProductEditProps) {
  const { shopId, productId } = props;

  const progressContext = useContext(ProgressContext);
  const router = useRouter();

  const [confirmDelete, setConfirmDelete] = useState(false);

  const { product, error, isLoading, mutate } = useProduct(shopId, productId);

  const executeDelete = async () => {
    try {
      progressContext.update(true);
      if (!productId) {
        throw undefined;
      }
      await deleteProduct(shopId, productId);
      toast.success("Product deleted successfully");
      router.replace(`/profile/shops/${shopId}/products`);
    } catch (error) {
      const msg = parseErrorResponse(error);
      toast.error(msg);
    } finally {
      progressContext.update(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Alert message={parseErrorResponse(error)} variant="danger" />;
  }

  if (!product) {
    return <Alert message="Product not found" />;
  }

  const title = "Update product";

  return (
    <>
      <div className="row g-3 align-items-center mb-3">
        <div className="col-lg-6">
          <nav aria-label="breadcrumb">
            <ol
              className="breadcrumb mb-0"
              style={
                {
                  "--bs-breadcrumb-divider-color": "#666",
                  "--bs-breadcrumb-item-active-color": "#666"
                } as CSSProperties
              }
            >
              <li className="breadcrumb-item">
                <Link
                  href={`/profile/shops/${shopId}/dashboard`}
                  className="link-anchor"
                >
                  Dashboard
                </Link>
              </li>
              <li className="breadcrumb-item">
                <Link
                  href={`/profile/shops/${shopId}/products`}
                  className="link-anchor"
                >
                  Products
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {title}
              </li>
            </ol>
          </nav>
        </div>
        <div className="col-lg-6 d-flex">
          <div className="hstack gap-2 ms-lg-auto">
            {product.id > 0 && (
              <button
                type="button"
                className="btn btn-danger hstack gap-2"
                onClick={() => {
                  setConfirmDelete(true);
                }}
              >
                <RiDeleteBinLine size={20} /> Delete
              </button>
            )}
            <Dropdown
              toggle={<div>Status</div>}
              menuClassName="dropdown-menu-end"
              toggleClassName="btn btn-default dropdown-toggle hstack"
            >
              {product.status === "PUBLISHED" && (
                <li
                  className="dropdown-item"
                  role="button"
                  onClick={() => {
                    progressContext.update(true);
                    draftProduct(shopId, productId)
                      .then(() => {
                        toast.success("Product status updated");
                        mutate();
                      })
                      .catch((e) => toast.error(parseErrorResponse(e)))
                      .finally(() => progressContext.update(false));
                  }}
                >
                  Draft
                </li>
              )}
              {product.status === "DRAFT" && (
                <li
                  className="dropdown-item"
                  role="button"
                  onClick={() => {
                    progressContext.update(true);
                    publishProduct(shopId, productId)
                      .then(() => {
                        toast.success("Product status updated");
                        mutate();
                      })
                      .catch((e) => toast.error(parseErrorResponse(e)))
                      .finally(() => progressContext.update(false));
                  }}
                >
                  Publish
                </li>
              )}
            </Dropdown>
          </div>
        </div>
      </div>

      <div className="mb-5">
        <div className="row g-3">
          <div className="col-12">
            <ProductGeneralUpdate shopId={shopId} product={product} />
          </div>
          {product.withVariant && (
            <div className="col-12">
              <ProductVariantsUpdate shopId={shopId} product={product} />
            </div>
          )}
          <div className="col-12">
            <ProductDescriptionUpdate shopId={shopId} product={product} />
          </div>
          <div className="col-12">
            <ProductImagesUpdate shopId={shopId} product={product} />
          </div>
        </div>
      </div>

      <ConfirmModal
        message="Are you sure to delete?"
        show={confirmDelete}
        close={() => setConfirmDelete(false)}
        onConfirm={(result) => {
          if (result) {
            executeDelete();
          }
        }}
      />
    </>
  );
}

export default ProductUpdatePage;
