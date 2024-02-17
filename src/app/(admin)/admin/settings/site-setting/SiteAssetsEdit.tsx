/* eslint-disable @next/next/no-img-element */
import makeApiRequest from "@/common/makeApiRequest";
import { SiteAssets } from "@/common/models";
import { parseErrorResponse, validateResponse } from "@/common/utils";
import ProgressButton from "@/components/ProgressButton";
import { ChangeEvent, useRef, useState } from "react";
import { toast } from "react-toastify";
import useSWR from "swr";

const getSiteAssets = async () => {
  const url = "/content/site-setting/assets";
  const resp = await makeApiRequest({
    url,
    authenticated: false,
    options: { cache: "no-store" }
  });
  return resp
    .json()
    .then((json) => json as SiteAssets)
    .catch((e) => undefined);
};

const uploadImageFile = async (path: string, file: File) => {
  const url = `/admin/site-setting/${path}`;

  var formData = new FormData();
  formData.append("file", file);

  const resp = await makeApiRequest({
    url,
    options: {
      method: "PUT",
      body: formData
    },
    authenticated: true
  });

  await validateResponse(resp);
};

function SiteAssetsEdit() {
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    "/content/site-setting/assets",
    getSiteAssets,
    {
      revalidateOnFocus: false,
    }
  );

  const [uploadingFavicon, setUploadingFavicon] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);

  const faviconFileRef = useRef<HTMLInputElement>(null);
  const logoFileRef = useRef<HTMLInputElement>(null);
  const coverFileRef = useRef<HTMLInputElement>(null);

  async function handleImageChange(
    path: string,
    event: ChangeEvent<HTMLInputElement>
  ) {
    let files = event.target.files;
    if (files && files.length > 0) {
      let file = files[0];

      if (file && file.size > 0) {
        event.target.value = "";
        await uploadImageFile(path, file);
      }
    }
  }

  var time = new Date().getTime();

  return (
    <>
      <div className="card mb-3">
        <div className="card-header py-3 border-bottom">
          <h5 className="mb-0">Site assets</h5>
        </div>
        <div className="card-body">
          <div className="hstack gap-2 mb-3">
            <div className="ratio ratio-1x1" style={{ width: 100 }}>
              <img
                src={
                  data?.favicon?.concat(`?t=${time}`) ??
                  "/images/placeholder.jpeg"
                }
                alt=""
                style={{ objectFit: "cover" }}
                className="img-thumbnail"
              />
            </div>
            <span className="text-muted">Favicon</span>
            <div className="ms-auto">
              <ProgressButton
                loading={uploadingFavicon}
                onClick={() => faviconFileRef.current?.click()}
              >
                Upload
              </ProgressButton>
            </div>
          </div>
          <div className="hstack gap-2 mb-3">
            <div className="ratio ratio-1x1" style={{ width: 100 }}>
              <img
                src={
                  data?.logo?.concat(`?t=${time}`) ?? "/images/placeholder.jpeg"
                }
                alt=""
                style={{ objectFit: "cover" }}
                className="img-thumbnail"
              />
            </div>
            <span className="text-muted">Logo</span>
            <div className="ms-auto">
              <ProgressButton
                loading={uploadingLogo}
                onClick={() => logoFileRef.current?.click()}
              >
                Upload
              </ProgressButton>
            </div>
          </div>

          <hr className="text-muted" />

          <div className="position-relative">
            <div
              role="button"
              className="ratio ratio-16x9 w-100"
              onClick={() => {
                !uploadingCover && coverFileRef.current?.click();
              }}
            >
              <img
                src={
                  data?.cover?.concat(`?t=${time}`) ??
                  "/images/placeholder.jpeg"
                }
                alt=""
                style={{ objectFit: "cover" }}
                className="img-thumbnail"
              />
            </div>
            {uploadingCover && (
              <div className="position-absolute start-50 top-50 translate-middle">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}
          </div>
          <div className="text-muted text-center">Cover</div>
        </div>
      </div>

      <input
        ref={faviconFileRef}
        type="file"
        accept="image/x-icon"
        className="d-none"
        onChange={(e) => {
          setUploadingFavicon(true);
          handleImageChange("favicon", e)
            .then(() => mutate())
            .catch((e) => toast.error(parseErrorResponse(e)))
            .finally(() => setUploadingFavicon(false));
        }}
      />
      <input
        ref={logoFileRef}
        type="file"
        accept="image/x-png,image/jpeg"
        className="d-none"
        onChange={(e) => {
          setUploadingLogo(true);
          handleImageChange("logo", e)
            .then(() => mutate())
            .catch((e) => toast.error(parseErrorResponse(e)))
            .finally(() => setUploadingLogo(false));
        }}
      />
      <input
        ref={coverFileRef}
        type="file"
        accept="image/x-png,image/jpeg"
        className="d-none"
        onChange={(e) => {
          setUploadingCover(true);
          handleImageChange("cover", e)
            .then(() => mutate())
            .catch((e) => toast.error(parseErrorResponse(e)))
            .finally(() => setUploadingCover(false));
        }}
      />
    </>
  );
}

export default SiteAssetsEdit;
