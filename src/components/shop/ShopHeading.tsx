"use client";
import { ProgressContext } from "@/common/contexts";
import { Shop } from "@/common/models";
import { parseErrorResponse } from "@/common/utils";
import { uploadShopCover, uploadShopLogo } from "@/services/ShopService";
import { RiEqualizerLine, RiExternalLinkLine } from "@remixicon/react";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, useCallback, useContext, useMemo, useRef } from "react";
import { toast } from "react-toastify";
import { useSWRConfig } from "swr";
import Dropdown from "../Dropdown";
import Rating from "../Rating";

interface ShopHeadingProps {
  shop: Shop;
  isMember?: boolean;
}

function ShopHeading(props: ShopHeadingProps) {
  const { shop, isMember = false } = props;

  const { mutate } = useSWRConfig();
  
  const progressContext = useContext(ProgressContext);

  const logoFileFef = useRef<HTMLInputElement>(null);
  const coverFileFef = useRef<HTMLInputElement>(null);

  const isActive = useMemo(() => {
    return (
      shop.status === "APPROVED" && (shop.expiredAt ?? 0) >= new Date().getTime()
    );
  }, [shop]);

  const handleImageUpload = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      try {
        const files = event.target.files;
        if (files && files.length > 0 && shop?.id) {
          const file = files[0];
          const fileSize = file.size / (1024 * 1024);

          const limit = event.target.name === "logo" ? 0.36 : 0.512;
          if (fileSize > limit) {
            throw `File size must not greater than ${limit * 1000}KB`;
          }

          progressContext.update(true);

          if (event.target.name === "logo") {
            await uploadShopLogo(shop.id, file);
          } else if (event.target.name === "cover") {
            await uploadShopCover(shop.id, file);
          }
          mutate(`/vendor/shops/${shop.id}`);
        }
      } catch (error) {
        const msg = parseErrorResponse(error);
        toast.error(msg);
      } finally {
        progressContext.update(false);
        event.target.value = "";
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const heading = (
    <>
      <h5 className="mb-0">{shop.name}</h5>
      <div className="text-muted small mb-1 text-truncate">{shop.headline}</div>
    </>
  );

  return (
    <>
      <div className="position-relative bg-white vstack overflow-hidden">
        <div
          style={{
            width: "100%",
            minHeight: 200
          }}
          className="position-relative bg-secondary"
          onContextMenu={(e) => e.preventDefault()}
        >
          {shop?.cover && (
            <Image
              src={shop.cover}
              alt=""
              fill
              sizes="100vw"
              priority
              style={{
                objectFit: "cover"
              }}
            />
          )}
        </div>
        <div
          className="row p-3 py-sm-4"
          style={{ zIndex: 999 }}
          onContextMenu={(e) => e.preventDefault()}
        >
          <div className="col">
            <div className="hstack">
              <div className="flex-shrink-0 mt-n6">
                <div className="bg-white p-1 rounded border position-relative">
                  <Image
                    src={shop?.logo ?? "/images/placeholder.jpeg"}
                    width={100}
                    height={100}
                    alt=""
                    priority
                    className="rounded-1"
                    style={{
                      objectFit: "cover"
                    }}
                  />
                </div>
              </div>
              <div className="ms-3 flex-column mt-n2 mt-sm-n3 d-none d-md-flex">
                {heading}
              </div>
            </div>
          </div>
          <div className="col-12 mt-2 d-block d-md-none">
            <div className="vstack">{heading}</div>
          </div>
          <div className="col-sm-auto">
            <div className="mt-sm-0 gap-1 hstack" style={{ zIndex: 999 }}>
              <div className="flex-grow-1 d-none d-md-block"></div>
              <div className="hstack gap-1">
                <Rating rating={shop?.rating ?? 0} />
                <span className="text-dark-gray">
                  {shop?.rating?.toFixed(1)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {isMember && isActive && (
          <Dropdown
            toggle={<RiEqualizerLine size={24} />}
            className="position-absolute top-0 end-0 m-3"
            toggleClassName="btn btn-light shadow-sm"
            menuClassName="shadow"
          >
            <li
              role="button"
              className="dropdown-item"
              onClick={() => {
                logoFileFef.current?.click();
              }}
            >
              Upload Logo
            </li>
            <li
              role="button"
              className="dropdown-item"
              onClick={() => {
                coverFileFef.current?.click();
              }}
            >
              Upload Cover
            </li>
            <div className="dropdown-divider"></div>
            <Link
              href={`/shops/${shop.slug}`}
              target={"_blank"}
              className="hstack gap-2 dropdown-item text-decoratin-none"
            >
              <span>View public</span>
              <RiExternalLinkLine size={20} />
            </Link>
          </Dropdown>
        )}
      </div>
      <input
        ref={logoFileFef}
        onChange={handleImageUpload}
        name="logo"
        className="d-none"
        type="file"
        accept="image/x-png,image/jpeg"
      />

      <input
        ref={coverFileFef}
        onChange={handleImageUpload}
        name="cover"
        className="d-none"
        type="file"
        accept="image/x-png,image/jpeg"
      />
    </>
  );
}

export default ShopHeading;
