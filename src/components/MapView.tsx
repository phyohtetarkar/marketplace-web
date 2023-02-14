import { MapIcon } from "@heroicons/react/24/outline";
import { MapPinIcon } from "@heroicons/react/24/solid";
import { Location } from "../common/models";

export interface MapViewProps {
  location: Location;
}

function MapView(props: MapViewProps) {
  const { location } = props;
  return (
    <div className="ratio ratio-16x9 rounded border">
      <div className="position-absolute bg-light start-0 end-0 top-0 bottom-0 d-flex">
        <MapPinIcon width={46} className="text-muted m-auto" />
      </div>
      <iframe
        width="100%"
        height="100%"
        style={{
          border: 0
        }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src={`https://www.google.com/maps/embed/v1/place?key=${
          process.env.NEXT_PUBLIC_MAP_API_KEY ?? ""
        }&q=${location.latitude},${location.longitude}`}
      ></iframe>
    </div>
  );
}

export default MapView;
