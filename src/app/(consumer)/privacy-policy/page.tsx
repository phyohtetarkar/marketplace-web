import makeApiRequest from "@/common/makeApiRequest";
import { Metadata } from "next";

const getData = async () => {
  const url = "/content/site-setting/privacy-policy";
  const resp = await makeApiRequest({
    url,
    options: { cache: "no-store" }
  });
  return resp.text().catch((e) => undefined);
};

export const metadata: Metadata = {
  title: "Privacy Policy"
};

export default async function PrivacyPolicy() {
  const value = await getData();

  return (
    <div className="bg-white h-100">
      <div className="container py-4">
        <div className="col-12 col-lg-8 offset-lg-2">
          <div dangerouslySetInnerHTML={{ __html: value ?? "" }}></div>
        </div>
      </div>
    </div>
  );
}
