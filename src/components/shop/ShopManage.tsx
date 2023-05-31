import {
  AdjustmentsHorizontalIcon,
  ArrowTopRightOnSquareIcon,
  Cog6ToothIcon,
  ComputerDesktopIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  InboxStackIcon,
  ReceiptPercentIcon
} from "@heroicons/react/24/outline";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  ChangeEvent,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState
} from "react";
import { toast } from "react-toastify";
import { ProgressContext } from "../../common/contexts";
import { Shop } from "../../common/models";
import { parseErrorResponse } from "../../common/utils";
import {
  getShopById,
  isShopMember,
  uploadShopCover,
  uploadShopLogo
} from "../../services/ShopService";
import Accordion from "../Accordion";
import Alert from "../Alert";
import Dropdown from "../Dropdown";
import Loading from "../Loading";
import PendingOrderCountView from "./PendingOrderCountView";
import ShopHeading from "./ShopHeading";

interface ShopManageProps {
  activeTab?:
    | "dashboard"
    | "products"
    | "discounts"
    | "orders"
    | "subscriptions"
    | "setting"
    | "renew-subscription"
    | "order-detail"
    | "product-edit";
  hideMenu?: boolean;
  customBody?: boolean;
  children: (shop: Shop) => ReactNode;
}

const iconSize = 20;

function ShopManage(props: ShopManageProps) {
  const { activeTab, hideMenu, customBody, children } = props;

  const router = useRouter();

  const progressContext = useContext(ProgressContext);

  const [error, setError] = useState<string>();

  const [shop, setShop] = useState<Shop>();

  const [isLoading, setLoading] = useState(false);

  const initRef = useRef(false);

  const logoFileFef = useRef<HTMLInputElement>(null);

  const coverFileFef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (initRef.current) {
      return;
    }

    const { slug } = router.query;

    if (typeof slug === "string" && !isNaN(parseInt(slug))) {
      setLoading(true);
      loadShop(parseInt(slug));
    } else {
      setError("Shop not found");
    }

    initRef.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const loadShop = async (shopId: number) => {
    try {
      var shop = await getShopById(shopId);
      if (!shop) {
        throw "Shop not found";
      }

      var isMember = await isShopMember(shop.id ?? 0);
      if (!isMember) {
        router.push("/account/shops");
        return;
      }
      setShop(shop);
    } catch (error) {
      setError(parseErrorResponse(error));
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
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
        shop.id && (await loadShop(shop.id));
      }
    } catch (error) {
      const msg = parseErrorResponse(error);
      toast.error(msg);
    } finally {
      progressContext.update(false);
      event.target.value = "";
    }
  };

  function menuLink({
    path,
    title,
    active,
    icon,
    suffix
  }: {
    path: string;
    title: string;
    active: boolean;
    icon: ReactNode;
    suffix?: ReactNode;
  }) {
    const href = `/account/shops/${shop?.id}/${path}`;
    return (
      <Link
        href={href}
        replace
        className={`d-flex align-items-center p-2 my-list-item ${
          active ? "active" : ""
        }`}
        onClick={(e) => {
          active && e.preventDefault();
        }}
      >
        {icon}
        <span>{title}</span>
        <div className="flex-grow-1"></div>
        {suffix}
      </Link>
    );
  }

  const currentTime = new Date().getTime();

  const menus = () => (
    <>
      <div className="vstack gap-1">
        {menuLink({
          path: `dashboard`,
          title: "Dashboard",
          active: activeTab === "dashboard",
          icon: (
            <ComputerDesktopIcon
              className="me-2"
              strokeWidth={2}
              width={iconSize}
            />
          )
        })}
        {menuLink({
          path: `products`,
          title: "Products",
          active: activeTab === "products",
          icon: (
            <InboxStackIcon className="me-2" strokeWidth={2} width={iconSize} />
          )
        })}
        {menuLink({
          path: `discounts`,
          title: "Discount",
          active: activeTab === "discounts",
          icon: (
            <ReceiptPercentIcon
              className="me-2"
              strokeWidth={2}
              width={iconSize}
            />
          )
        })}
        {menuLink({
          path: `orders`,
          title: "Orders",
          active: activeTab === "orders",
          icon: (
            <DocumentTextIcon
              className="me-2"
              strokeWidth={2}
              width={iconSize}
            />
          ),
          suffix: <>{shop && <PendingOrderCountView shopId={shop.id ?? 0} />}</>
        })}
        {menuLink({
          path: `subscriptions`,
          title: "Subscriptions",
          active: activeTab === "subscriptions",
          icon: (
            <CurrencyDollarIcon
              className="me-2"
              strokeWidth={2}
              width={iconSize}
            />
          ),
          suffix: (
            <>
              {(shop?.expiredAt ?? 0) <= currentTime && (
                <ExclamationTriangleIcon
                  width={20}
                  className="text-warning ms-2"
                />
              )}
            </>
          )
        })}
        {menuLink({
          path: `setting`,
          title: "Setting",
          active: activeTab === "setting",
          icon: (
            <Cog6ToothIcon className="me-2" strokeWidth={2} width={iconSize} />
          )
        })}
      </div>
    </>
  );

  const headerBar = (shop: Shop) => {
    return (
      <div className="header-bar">
        <div className="container py-4">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">
                <Link href="/account/overview">Profile</Link>
              </li>
              <li className="breadcrumb-item">
                <Link href="/account/shops">Shops</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {shop.name}
              </li>
            </ol>
          </nav>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="container py-3">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-3">
        <Alert message={error} variant="danger" />
      </div>
    );
  }

  if (!shop) {
    return <></>;
  }

  if (customBody) {
    if (shop.status !== "APPROVED") {
      return (
        <>
          {headerBar(shop)}
          <div className="container py-3">
            <Alert
              message={
                shop.status === "DISABLED"
                  ? "Your shop has been disabled."
                  : `We are currently reviewing your shop.`
              }
              variant="warning"
            />
          </div>
        </>
      );
    }

    if (
      (shop.expiredAt ?? 0) < currentTime &&
      activeTab !== "subscriptions" &&
      activeTab !== "renew-subscription"
    ) {
      return (
        <>
          {headerBar(shop)}
          <div className="container py-3">
            <Alert
              message={
                <div>
                  No active subscription.
                  <Link
                    href={`/account/shops/${shop.id}/subscriptions`}
                    className="ms-1 fw-semibold link-anchor"
                  >
                    Manage subscriptions
                  </Link>
                  .
                </div>
              }
              variant="warning"
            />
          </div>
        </>
      );
    }

    return <>{children(shop)}</>;
  }

  return (
    <>
      {headerBar(shop)}

      <div className="container py-3 mb-5">
        <div className="position-relative border rounded bg-white vstack overflow-hidden mb-3">
          <ShopHeading shop={shop} />

          {shop.status === "APPROVED" && (
            <Dropdown
              toggle={
                <AdjustmentsHorizontalIcon width={24} strokeWidth={1.5} />
              }
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
                <ArrowTopRightOnSquareIcon width={20} />
              </Link>
            </Dropdown>
          )}
        </div>

        {shop.status === "APPROVED" ? (
          <div className="row g-3">
            {!hideMenu && (
              <div className="col-12 col-lg-3">
                <div className="rounded border bg-white">
                  <Accordion
                    open={true}
                    header={(open) => {
                      return <span className="fw-bold">Menu</span>;
                    }}
                    headerClassName="px-3 py-2h border-bottom d-flex d-lg-none"
                    bodyClassName=""
                    iconType="plus-minus"
                  >
                    <div className="p-3">{menus()}</div>
                  </Accordion>
                </div>
              </div>
            )}
            <div className={`${hideMenu ? "col-12" : "col-12 col-lg-9"}`}>
              {(shop.expiredAt ?? 0) >= currentTime ||
              activeTab === "subscriptions" ||
              activeTab === "renew-subscription" ? (
                children(shop)
              ) : (
                <div>
                  <Alert
                    message={
                      <div>
                        No active subscription.
                        <Link
                          href={`/account/shops/${shop.id}/subscriptions`}
                          className="ms-1 fw-semibold link-anchor"
                        >
                          Manage subscriptions
                        </Link>
                        .
                      </div>
                    }
                    variant="warning"
                  />
                </div>
              )}
            </div>
          </div>
        ) : (
          <Alert
            message={
              shop.status === "DISABLED"
                ? "Your shop has been disabled."
                : `We are currently reviewing your shop.`
            }
            variant="warning"
          />
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

export default ShopManage;
