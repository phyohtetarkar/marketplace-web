import { XCircleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

function SocialListing() {
  const list = [1, 2, 3];
  return (
    <div>
      <div className="hstack">
        <Link href="#">
          <a className="btn btn-primary h-100 ms-auto">Create new</a>
        </Link>
      </div>
      <div className="d-flex flex-wrap gap-3 py-3">
        {list.map((i) => (
          <div className="hstack rounded border p-2" key={i}>
            <Image
              className="flex-shrink-0"
              src="/images/icons8-facebook-48.png"
              alt="facebook"
              width={28}
              height={28}
            />
            <span className="text-dark ms-1 small">Shopping Center</span>
            <div role="button" className="link-danger ms-2">
              <XCircleIcon className="flex-shrink-0" width={20} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SocialListing;
