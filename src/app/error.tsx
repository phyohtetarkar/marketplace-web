"use client";

import { parseErrorResponse } from "@/common/utils";
import Alert from "@/components/Alert";

export default function Error({ error }: { error: Error }) {
  return (
    <div className="container py-4">
      <Alert message={parseErrorResponse(error, true)} variant="danger" />
    </div>
  );
}
