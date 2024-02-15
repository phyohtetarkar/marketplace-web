"use client";

import { parseErrorResponse } from "@/common/utils";

export default function Error({ error }: { error: Error }) {
  return (
    <div className="container py-4">
      <h4>Something went wrong...</h4>
      <div className="invisible">{parseErrorResponse(error, true)}</div>
    </div>
  );
}
