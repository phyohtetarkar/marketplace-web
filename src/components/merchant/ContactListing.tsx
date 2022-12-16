import { PhoneIcon, XCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

function ContactListing() {
  const list = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <div>
      <div className="hstack">
        <Link href="#">
          <a className="btn btn-primary h-100 ms-auto">Create new</a>
        </Link>
      </div>
      <div className="d-flex flex-wrap gap-3 py-3">
        {list.map((i) => (
          <div className="hstack border rounded p-2" key={i}>
            <PhoneIcon width={15} className="flex-shrink-0" />
            <span className="text-dark ms-1 small">09-24442122</span>
            <div role="button" className="link-danger ms-2">
              <XCircleIcon className="flex-shrink-0" width={20} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ContactListing;
