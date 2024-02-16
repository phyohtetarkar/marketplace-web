import makeApiRequest from "@/common/makeApiRequest";
import { parseErrorResponse, validateResponse } from "@/common/utils";
import { RiDeleteBinLine } from "@remixicon/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { useSWRConfig } from "swr";

interface BannerItemProps {
  id: number;
  image: string;
  sorting: boolean;
}

const deleteBanner = async (id: number) => {
  const url = "/admin/banners/" + id;
  const resp = await makeApiRequest({
    url,
    options: {
      method: "DELETE",
    },
    authenticated: true,
  });

  await validateResponse(resp);
};

function BannerItem(props: BannerItemProps) {
  const router = useRouter();
  const { mutate } = useSWRConfig();

  const { id, image, sorting } = props;

  const [deleting, setDeleting] = useState(false);

  // const { attributes, listeners, setNodeRef, transform, transition, node } =
  //   useSortable({ id: id, resizeObserverConfig: { disabled: true } });

  // const style = {
  //   transform: CSS.Transform.toString(transform),
  //   transition
  // };

  return (
    <div
      className="rounded border position-relative"
      style={{
        width: 200
      }}
      // style={{
      //   ...style,
      //   width: 200,
      //   cursor: sorting ? "move" : "pointer",
      //   zIndex: node.current === document.activeElement ? 10 : 0
      // }}
      // ref={setNodeRef}
      // {...attributes}
      // {...listeners}
    >
      <div
        className="ratio ratio-16x9"
        onClick={() => {
          // if (!sorting) {
          //   navigation(`${id}`);
          // }
          router.push(`/admin/banners/${id}`);
        }}
      >
        <img
          src={image}
          alt="Banner"
          className="rounded"
          style={{ objectFit: "cover" }}
          draggable={sorting}
        />
      </div>

      {!sorting && (
        <button
          className="btn btn-sm btn-danger position-absolute top-0 end-0 m-2 rounded"
          disabled={deleting}
          onClick={() => {
            if (deleting) {
              return;
            }
            setDeleting(true);
            deleteBanner(id)
              .then(() => {
                toast.success("Banner deleted successfully");
                mutate("/admin/banners");
              })
              .catch((e) => {
                toast.error(parseErrorResponse(e))
              })
              .finally(() => setDeleting(false));
          }}
        >
          <RiDeleteBinLine size={16} />
        </button>
      )}
    </div>
  );
}

export default BannerItem;
