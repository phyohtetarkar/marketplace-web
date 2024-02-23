import { redirect } from "next/navigation";

export async function POST(request: Request) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  let nextPathname = pathname.replace("payment", "subscriptions");

  if (request.method === "POST") {
    try {
      const formData = await request.formData();
      const data = formData.get("paymentResponse");
      if (data) {
        const jsonStr = Buffer.from(data.toString(), "base64url").toString();

        const result = JSON.parse(jsonStr) as {
          invoiceNo: string;
          respCode: string;
          respDesc: string;
        };

        if (process.env.NODE_ENV === "development") {
            console.log(result);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  redirect(process.env.NEXT_PUBLIC_BASE_URL + nextPathname);
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  let nextPathname = pathname.replace("payment", "subscriptions");

  redirect(process.env.NEXT_PUBLIC_BASE_URL + nextPathname);
}
