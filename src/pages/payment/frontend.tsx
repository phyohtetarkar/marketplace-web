import { GetServerSideProps } from "next";
import Link from "next/link";
import { ShopSubscription } from "../../common/models";
import { getSubscription } from "../../services/SubscriptionService";

function SubscriptionResult({
  subscription
}: {
  subscription: ShopSubscription;
}) {
  const title = () => {
    if (subscription.status === "SUCCESS") {
      return <h2 className="text-success">Subscription Success</h2>;
    }

    if (subscription.status === "PENDING") {
      return <h2 className="text-warning">Transaction is pending</h2>;
    }

    if (subscription.status === "FAILED") {
      return <h2 className="text-danger">Subscription Failed</h2>;
    }

    return <></>;
  };

  return (
    <div className="container py-3">
      <div className="vstack mt-5 align-items-center">
        {title()}
        {subscription.shop && (
          <Link
            href={`/account/shops/${subscription.shop.slug}/subscriptions`}
            className="link-anchor mt-3"
          >
            Go to subscriptions
          </Link>
        )}
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;

  const readBody = () =>
    new Promise<{
      invoiceNo: string;
      respCode: string;
    }>((resolve, reject) => {
      let body = "";
      let jsonStr;
      req.on("data", (chunk) => {
        body += chunk;
      });
      req.on("end", () => {
        try {
          console.log(body);
          const ary = body.split("=");
          if (ary.length > 1) {
            jsonStr = Buffer.from(
              ary[1].replace("%3D", "="),
              "base64url"
            ).toString();
            console.log(jsonStr);

            const result = JSON.parse(jsonStr) as {
              invoiceNo: string;
              respCode: string;
            };

            resolve(result);
          } else {
            reject(undefined);
          }
        } catch (error) {
          reject(error);
        }
      });

      req.read();
    });

  try {
    if (req.method === "POST") {
      const result = await readBody();

      console.log(result);

      if (result.respCode !== "2000") {
        throw undefined;
      }

      const subscription = await getSubscription(result.invoiceNo);

      if (!subscription) {
        throw "Subscription not found";
      }

      if (!subscription.status) {
        return {
          redirect: {
            statusCode: 302,
            destination: `/account/shops/${subscription.shop?.slug}/subscriptions`
          }
        };
      }

      return {
        props: {
          subscription: subscription
        }
      };
    }

    return {
      redirect: {
        permanent: false,
        destination: "/"
      }
    };
  } catch (error) {
    console.log(error);
  }

  return {
    redirect: {
      statusCode: 302,
      destination: "/"
    }
  };
};

export default SubscriptionResult;
