import React, { useEffect, useState } from "react";
import {
  MapClusterLayer,
  MapMarker,
  MarkerContent,
  MarkerPopup,
  MarkerTooltip,
  useMap,
} from "./ui/map";
import BandeiraIcon from "./BandeiraIcon";
import PostoMarker from "./PostoMarker";
import { PostoDetails } from "./PostoDetails";
import { cn } from "@/lib/utils";

const MapContent = ({ postos, filteredPostos, postosGeojson, combustivel }) => {
  const { map, isLoaded } = useMap();
  const [zoom, setZoom] = useState<number | null>(null);
  const [bounds, setBounds] = useState<maplibregl.LngLatBounds | null>(null);

  const [selectedPosto, setSelectedPosto] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!map || !isLoaded) return;

    // pega valor inicial
    setZoom(map.getZoom());
    setBounds(map.getBounds());

    // atualiza sempre que o usuário mover/der zoom no mapa
    const handleMove = () => {
      setZoom(map.getZoom());
      setBounds(map.getBounds());
    };

    map.on("moveend", handleMove);
    return () => {
      map.off("moveend", handleMove);
    };
  }, [map, isLoaded]);

  console.log("zoom", zoom);

  if (zoom === null || bounds === null) return null;

  const postosVisiveis = filteredPostos.filter((p) =>
    bounds.contains([p.lng, p.lat]),
  );
  const handleClick = (posto) => {
    setSelectedPosto(posto);
    setOpen(true);
  };

  console.log("teste", open);

  return (
    <>
      {/* {zoom < 13 && (
        <MapClusterLayer
          data={postosGeojson}
          clusterRadius={50}
          clusterMaxZoom={13}
          point
          renderPoint={(feature) => (
            <BandeiraIcon bandeira={feature.properties.bandeira} />
          )}
        />
      )} */}
      <PostoDetails
        open={open}
        onOpenChange={() => setOpen((prev) => !prev)}
        posto={selectedPosto}
      />

      {postos.length > 0 &&
        filteredPostos.map((posto) => {
          const produto = posto.precos.find((p) => p.produto === combustivel);

          const preco = produto
            ? produto.preco.toFixed(2).replace(".", ",")
            : null;

          return (
            <MapMarker
              key={posto.codigoSimp}
              longitude={posto.lng}
              latitude={posto.lat}
              onClick={() => handleClick(posto)}
            >
              <MarkerContent className=''>
                <div className='flex flex-row items-center gap-1 rounded-full bg-white p-1 text-[11px] font-semibold text-black shadow-md dark:bg-black dark:text-white border'>
                  {/* <div className='bg-primary flex h-9 w-9 items-center justify-center rounded-full border-2 border-white text-white shadow-lg dark:bg-black'> */}
                  <BandeiraIcon
                    bandeira={posto.bandeira}
                    distribuidora={posto.distribuidora}
                  />
                  {/* </div> */}
                  {preco && <span className=''>{preco ? preco : "--"}</span>}
                </div>
              </MarkerContent>

              <MarkerTooltip>{posto.razaoSocial}</MarkerTooltip>

              {/* <PostoMarker posto={posto} /> */}
            </MapMarker>
          );
        })}
    </>
  );
};

export default MapContent;
