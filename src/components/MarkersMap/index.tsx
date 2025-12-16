import { memo, useState } from "react";
import L from "leaflet";
import { CircleMarker, Popup } from "react-leaflet";
//icons
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import type { IFetchedUser } from "../../types/fetchedUsers.interface";
//redux
import { useSelector } from "react-redux";
import { selectFilteredUsers } from "../../redux/usersSelector";
import type { RootState } from "../../redux/store";
import PopupMap from "../PopupMap";

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const MarkersMap = () => {
  const [activeUser, setActiveUser] = useState<IFetchedUser | null>(null);

  const users = useSelector((state: RootState) => {
    return selectFilteredUsers(state);
  });

  return (
    <>
      {users.map((user) => (
        <CircleMarker
          key={user.id}
          center={[user.location.lat, user.location.lon]}
          radius={5}
          color="blue"
          fillColor="blue"
          fillOpacity={0.5}
          eventHandlers={{
            click: () => {
              setActiveUser(user);
            },
          }}
        />
      ))}

      {activeUser && (
        <Popup position={[activeUser.location.lat, activeUser.location.lon]}>
          <PopupMap user={activeUser} />
        </Popup>
      )}
    </>
  );
};

export default memo(MarkersMap);
