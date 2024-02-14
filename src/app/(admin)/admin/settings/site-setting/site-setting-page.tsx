"use client";
import makeApiRequest from "@/common/makeApiRequest";
import { SiteSetting } from "@/common/models";
import { parseErrorResponse, validateResponse } from "@/common/utils";
import { withAuthorization } from "@/common/withAuthorization";
import Alert from "@/components/Alert";
import Loading from "@/components/Loading";
import ProgressButton from "@/components/ProgressButton";
import { RichTextEditorInputProps } from "@/components/forms/RichTextEditor";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
import useSWR from "swr";
import SiteAssetsEdit from "./SiteAssetsEdit";
import { toast } from "react-toastify";

const DynamicEditor = dynamic<RichTextEditorInputProps>(
  () => import("@/components/forms").then((f) => f.RichTextEditor),
  {
    ssr: false
  }
);

const getSiteSetting = async (url: string) => {
  const resp = await makeApiRequest({ url, authenticated: true });

  await validateResponse(resp);

  return (await resp.json()) as SiteSetting;
};

const saveTextValue = async (path: string, value: string) => {
  const url = `/admin/site-setting/${path}`;

  var formData = new FormData();
  formData.append("value", value);

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

function SiteSettingPage() {
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    "/admin/site-setting",
    getSiteSetting,
    {
      revalidateOnFocus: false
    }
  );

  const [setting, setSetting] = useState<SiteSetting>({});

  const [savingAboutUs, setSavingAboutUs] = useState(false);
  const [savingTermsAndConditions, setSavingTermsAndConditions] =
    useState(false);
  const [savingPrivacyPolicy, setSavingPrivacyPolicy] = useState(false);

  useEffect(() => {
    if (isLoading || isValidating) {
      return;
    }
    if (data) {
      var time = new Date().getTime();
      setSetting({
        ...data,
        favicon: data.favicon?.concat(`?t=${time}`),
        logo: data.logo?.concat(`?t=${time}`),
        cover: data.cover?.concat(`?t=${time}`)
      });
    }
  }, [data, isLoading, isValidating]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Alert message={parseErrorResponse(error)} variant="danger" />;
  }

  if (!data) {
    return <Alert message="No site setting found" />;
  }

  return (
    <>
      <div className="row mb-4">
        <div className="col-12">
          <h3 className="fw-semibold mb-1">Site Settings</h3>
          <nav aria-label="breadcrumb col-12">
            <ol className="breadcrumb mb-1">
              <li className="breadcrumb-item">
                <Link href="/admin/settings" className="link-anchor">
                  Settings
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Site Settings
              </li>
            </ol>
          </nav>
        </div>
      </div>
      <div className="row g-3">
        <div className="col-12 col-lg-10">
          <div className="card mb-3">
            <div className="card-header border-bottom">
              <div className="hstack">
                <h5 className="mb-0">About Us</h5>
                <ProgressButton
                  className="ms-auto"
                  loading={savingAboutUs}
                  onClick={() => {
                    setSavingAboutUs(true);
                    saveTextValue("about-us", setting.aboutUs ?? "")
                      .then(() => toast.success("Updated about us"))
                      .catch((e) => toast.error(parseErrorResponse(e)))
                      .finally(() => setSavingAboutUs(false));
                  }}
                >
                  Save
                </ProgressButton>
              </div>
            </div>
            <div className="card-body p-0">
              <DynamicEditor
                id="aboutUsInput"
                placeholder="Enter about us..."
                minHeight={380}
                value={setting.aboutUs ?? ""}
                iframeEmbed
                noBorder
                onEditorChange={(v) => {
                  setSetting((old) => ({ ...old, aboutUs: v }));
                }}
              />
            </div>
          </div>
          <div className="card mb-3">
            <div className="card-header border-bottom">
              <div className="hstack">
                <h5 className="mb-0">Terms And Conditions</h5>
                <ProgressButton
                  className="ms-auto"
                  loading={savingTermsAndConditions}
                  onClick={() => {
                    setSavingTermsAndConditions(true);
                    saveTextValue(
                      "terms-and-conditions",
                      setting.termsAndConditions ?? ""
                    )
                      .then(() => toast.success("Updated terms and conditions"))
                      .catch((e) => toast.error(parseErrorResponse(e)))
                      .finally(() => setSavingTermsAndConditions(false));
                  }}
                >
                  Save
                </ProgressButton>
              </div>
            </div>
            <div className="card-body p-0">
              <DynamicEditor
                id="termsAndConditionsInput"
                placeholder="Enter terms and conditions..."
                minHeight={380}
                value={setting.termsAndConditions ?? ""}
                noBorder
                onEditorChange={(v) => {
                  setSetting((old) => ({ ...old, termsAndConditions: v }));
                }}
              />
            </div>
          </div>
          <div className="card mb-3">
            <div className="card-header border-bottom">
              <div className="hstack">
                <h5 className="mb-0">Privacy Policy</h5>
                <ProgressButton
                  className="ms-auto"
                  loading={savingPrivacyPolicy}
                  onClick={() => {
                    setSavingPrivacyPolicy(true);
                    saveTextValue("privacy-policy", setting.privacyPolicy ?? "")
                      .then(() => toast.success("Updated privacy policy"))
                      .catch((e) => toast.error(parseErrorResponse(e)))
                      .finally(() => setSavingPrivacyPolicy(false));
                  }}
                >
                  Save
                </ProgressButton>
              </div>
            </div>
            <div className="card-body p-0">
              <DynamicEditor
                id="privacyPolicyInput"
                placeholder="Enter terms and conditions..."
                minHeight={380}
                value={setting.privacyPolicy ?? ""}
                noBorder
                onEditorChange={(v) => {
                  setSetting((old) => ({ ...old, privacyPolicy: v }));
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default withAuthorization(SiteSettingPage, ["SITE_SETTING_WRITE"]);
