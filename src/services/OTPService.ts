import makeApiRequest from "../common/makeApiRequest";
import { validateResponse } from "../common/utils";

export async function requestOTP(phone: string) {
  const url = `otp/request?phone=${phone}`;

  const resp = await makeApiRequest(url);

  await validateResponse(resp);

  return resp
    .json()
    .then((json) => json["request_id"] as number)
    .catch((e) => 0);
}
