import { useEffect, useState } from "react";
import {
  useMap,
  Map,
  MarkerContent,
  MapMarker,
  MarkerPopup,
  MarkerTooltip,
} from "./ui/map";
import { Button } from "./ui/button";
import axios from "axios";

// For child components inside Map, use the useMap hook
function MapClick({ setPostos, setLoadMode }) {
  const { map, isLoaded } = useMap();
  const [coordinates, setCoordinates] = useState(null);

  useEffect(() => {
    if (!map || !isLoaded) return;

    const handleClick = (e) => {
      console.log("Clicked at:", e.lngLat);
      const { lat, lng } = e.lngLat;

      setCoordinates({ lat: lat, lng: lng });
      setLoadMode("postos-raio");
    };

    map.on("contextmenu", handleClick);

    return () => {
      map.off("contextmenu", handleClick);
    };
  }, [map, isLoaded]);

  if (!coordinates) return null;

  const handleLoad = async () => {
    try {
      if (!coordinates) return;

      const { lat, lng } = coordinates;
      const response = await axios.get(
        `http://localhost:8001/api/lpc/coordinates?lat=${lat}&lng=${lng}`,
      );

      setPostos(response.data.postos);
      console.log("response", response.data);
    } catch (err) {
      console.log("err", err);
    }
  };

  return (
    <MapMarker latitude={coordinates.lat} longitude={coordinates.lng}>
      <MarkerContent>
        <div className='bg-primary size-4 rounded-full border-2 border-white shadow-lg' />
      </MarkerContent>

      <MarkerPopup>
        <p>Buscar postos próximos: </p>
        <Button onClick={handleLoad}> Carregar postos</Button>
      </MarkerPopup>

      <MarkerTooltip>
        Clique no marker para pesquisar postos próximos
      </MarkerTooltip>
    </MapMarker>
  );
}

export default MapClick;
