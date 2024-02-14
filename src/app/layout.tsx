import makeApiRequest from "@/common/makeApiRequest";
import { SiteAssets } from "@/common/models";
import { AuthenticationContextProvider } from "@/components/AuthenticationContextProvider";
import ClientComponentsWrapper from "@/components/ClientComponentsWrapper";
import ProgressContextProvider from "@/components/ProgressContextProvider";
import { Metadata, Viewport } from "next";
import { ReactNode, cache } from "react";
import "react-toastify/dist/ReactToastify.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/zoom";
import "../../styles/bootstrap-custom.css";
import "../../styles/flatpickr.airbnb.css";
import "../../styles/globals.css";
import { LocalizationContextProvider } from "@/components/LocalizationContextProvider";

const getSiteAssets = cache(async () => {
  const url = "/content/site-setting/assets";
  const resp = await makeApiRequest({
    url,
    options: { cache: "no-store" }
  });
  return resp
    .json()
    .then((json) => json as SiteAssets)
    .catch((e) => undefined);
});

export const viewport: Viewport = {
  themeColor: "black",
  initialScale: 1,
  width: "device-width"
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL ?? ""),
  title: process.env.NEXT_PUBLIC_APP_NAME,
  description: process.env.NEXT_PUBLIC_APP_DESCRIPTION,
  openGraph: {
    url: process.env.NEXT_PUBLIC_BASE_URL,
    title: process.env.NEXT_PUBLIC_APP_NAME,
    description: process.env.NEXT_PUBLIC_APP_DESCRIPTION,
    images: [`${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/images/cover.png`],
    type: "website"
  },
  twitter: {
    title: process.env.NEXT_PUBLIC_APP_NAME,
    description: process.env.NEXT_PUBLIC_APP_DESCRIPTION,
    card: "summary_large_image",
    images: [`${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/images/cover.png`]
  }
};

// export async function generateMetadata(): Promise<Metadata> {
//   const assets = await getSiteAssets();
//   const icons = [] as Icon[];
//   const covers = [] as string[];

//   if (assets?.favicon) {
//     icons.push(assets.favicon);
//   }

//   if (assets?.cover) {
//     covers.push(assets.cover);
//   }

//   return {
//     metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL ?? ""),
//     title: process.env.NEXT_PUBLIC_APP_NAME,
//     description: process.env.NEXT_PUBLIC_APP_DESCRIPTION,
//     icons: icons,
//     openGraph: {
//       url: process.env.NEXT_PUBLIC_BASE_URL,
//       title: process.env.NEXT_PUBLIC_APP_NAME,
//       description: process.env.NEXT_PUBLIC_APP_DESCRIPTION,
//       images: covers,
//       type: "website"
//     },
//     twitter: {
//       title: process.env.NEXT_PUBLIC_APP_NAME,
//       description: process.env.NEXT_PUBLIC_APP_DESCRIPTION,
//       card: "summary_large_image",
//       images: covers
//     }
//   };
// }

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
      </head>
      <body>
        <ProgressContextProvider>
          <ClientComponentsWrapper />
          <AuthenticationContextProvider>
            <LocalizationContextProvider>
              {children}
            </LocalizationContextProvider>
          </AuthenticationContextProvider>
        </ProgressContextProvider>
      </body>
    </html>
  );
}
