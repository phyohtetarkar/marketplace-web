"use client";
import NextNProgress from "nextjs-progressbar";
import NProgress from "nprogress";
import { Suspense, useContext, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { NavigationEvents } from "./NavigationEvents";
import {
  CategoryScale,
  Chart,
  Filler,
  LineController,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip
} from "chart.js";
import ProgressModal from "./ProgressModal";
import { ProgressContext } from "@/common/contexts";
import { usePathname, useSearchParams } from "next/navigation";

Chart.register(
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Filler,
  Tooltip
);

type PushStateInput = [
  data: any,
  unused: string,
  url?: string | URL | null | undefined
];

export default function ClientComponentsWrapper() {
  const progressContext = useContext(ProgressContext);

  useEffect(() => {
    const handleAnchorClick = (event: MouseEvent) => {
      const targetUrl = (event.currentTarget as HTMLAnchorElement).href;
      const currentUrl = location.href;
      if (targetUrl !== currentUrl && !targetUrl.match(/(http|https|mailto|tel)\\w+/)) {
        NProgress.start();
      }
    };

    const handleMutation: MutationCallback = () => {
      const anchorElements = document.querySelectorAll("a");
      anchorElements.forEach((anchor) => {
        const isExternalLink = !anchor.href.startsWith(location.origin);
        if (anchor.target !== "_blank" && !isExternalLink) {
          anchor.addEventListener("click", handleAnchorClick);
        }
      });
    };

    const mutationObserver = new MutationObserver(handleMutation);
    mutationObserver.observe(document, { childList: true, subtree: true });

    window.history.pushState = new Proxy(window.history.pushState, {
      apply: (target, thisArg, argArray: PushStateInput) => {
        NProgress.done();
        return target.apply(thisArg, argArray);
      },
    });
  }, []);

  return (
    <Suspense>
      <NavigationEvents />
      <NextNProgress
        color="#36213e"
        startPosition={0.3}
        height={2}
        options={{
          showSpinner: false
        }}
      />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        theme="colored"
      />
      <ProgressModal show={progressContext.show} />
    </Suspense>
  );
}
