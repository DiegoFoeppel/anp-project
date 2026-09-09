import { Card } from "@/components/ui/Card";
import {
  Map,
  MapMarker,
  MarkerContent,
  MarkerPopup,
  MarkerTooltip,
  MapControls,
  type MapRef,
} from "@/components/ui/map";
import { valores, type Filtros, type Info } from "../data";
import { Button } from "./ui/button";
import { useEffect, useRef, useState } from "react";
import { FuelIcon } from "lucide-react";
import { SheetDemo } from "./Filter";
import axios from "axios";
import { SearchInput } from "./SearchInput";
import { Filters } from "./Filters";
import { cn } from "@/lib/utils";
import BandeiraIcon from "./BandeiraIcon";
import ListInput from "./RenderPostosList";
import RenderPostosList from "./RenderPostosList";

const colors = {
  ETANOL: "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300",
  "DIESEL S10":
    "bg-yellow-50 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300",
  "DIESEL S500":
    "bg-yellow-50 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300",
  "GASOLINA COMUM": "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300",
  "GASOLINA ADITIVADA":
    "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  GNV: "bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-300",
};

export function MyMap() {
  const [mode, setMode] = useState(false);
  const [open, setOpen] = useState(false);
  const [postos, setPostos] = useState<Info[]>([]);
  const [filtros, setFiltros] = useState<Filtros[]>([]);
  const [query, setQuery] = useState("");
  const [cidade, setCidade] = useState("");

  const [multipleFilters, setMultipleFilters] = useState({
    bairro: "",
    distribuidora: "",
    // dataColeta: "",
  });

  const filteredPostos = postos.filter((posto) => {
    // Se estiver no modo de preços, exige que tenha preço/data de coleta
    if (mode && !posto.dataColeta) {
      return false;
    }

    return Object.entries(multipleFilters).every(([chave, valorFiltro]) => {
      // Filtro vazio não restringe
      if (!valorFiltro) return true;

      return posto[chave as keyof typeof posto] === valorFiltro;
    });
  });

  const mapRef = useRef<MapRef>(null);

  const moveMap = (lng: number, lat: number, zoom = 12) => {
    console.log("data2", lng, lat, zoom);
    mapRef.current?.flyTo({
      center: [lng, lat],
      zoom: zoom,
      pitch: 45, // Inclinação da câmera (opcional)
      bearing: 0, // Rotação do mapa (opcional)
      duration: 3000, // Duração da animação em ms (3 segundos)
      essential: true, // Garante que a animação ocorra mesmo com preferência de redução de movimento do SO
    });
  };

  console.log("mode", mode);

  return (
    <div className='flex h-screen w-screen'>
      {/* Painel lateral — não é componente de biblioteca nenhuma, é só um div */}
      <aside className='w-[380px] flex-shrink-0 h-full overflow-y-auto border-r bg-background flex flex-col'>
        <div className='p-4 border-b'>MapANP</div>

        {/* <div className='p-4 '> */}

        <SearchInput
          query={query}
          setQuery={setQuery}
          setPostos={setPostos}
          moveMap={moveMap}
          setFiltros={setFiltros}
          setCidade={setCidade}
        />

        {/* {postos.length > 0 && (
          <p className='mx-4 mb-2'>Cidade selecionada: {cidade}</p>
        )} */}

        {postos.length > 0 && (
          <>
            <p className='mx-4 mb-2'>Cidade selecionada: {cidade}</p>
            <Filters
              filtros={filtros}
              setMultipleFilters={setMultipleFilters}
              multipleFilters={multipleFilters}
              mode={mode}
              setMode={setMode}
            />

            <div className='border-b'></div>

            <RenderPostosList postos={filteredPostos} moveMap={moveMap} />
          </>
        )}

        {/* </div> */}
        {/* <div className='flex-1 overflow-y-auto'>
          <ListaDePostos />
        </div> */}
      </aside>

      {/* Mapa ocupa o resto */}
      <main className='flex-1 h-full'>
        {/* <div className='h-screen p-0 overflow-hidden'> */}
        <Map
          ref={mapRef}
          center={
            postos[0] ? [postos[0].lng, postos[0].lat] : [-38.5434, -3.71839]
          }
          zoom={11}
        >
          <MapControls />
          {postos.length > 0 &&
            filteredPostos.map((location) => (
              <MapMarker
                key={location.id}
                longitude={location.lng}
                latitude={location.lat}
              >
                <MarkerContent>
                  {/* <div className='bg-primary size-4 rounded-full border-2 border-white shadow-lg' /> */}
                  <div className='bg-primary flex h-9 w-9 items-center justify-center rounded-full border-2 border-white text-white shadow-lg dark:bg-black'>
                    {/* <FuelIcon size={18} /> */}
                    <BandeiraIcon bandeira={location.bandeira} />
                  </div>
                </MarkerContent>

                <MarkerTooltip>{location.razaoSocial}</MarkerTooltip>
                <MarkerPopup className='w-75'>
                  <div className='space-y-1'>
                    <p className='text-foreground font-medium'>
                      CNPJ: {location.cnpj}
                    </p>
                    <p className='text-foreground font-medium'>
                      Nome: {location.nome}
                    </p>
                    <p className='text-foreground font-medium'>
                      Distribuidora: {location.distribuidora}
                    </p>
                    <p className='text-foreground font-medium'>
                      Bandeira: {location.bandeira}
                    </p>
                    {/* <p className='text-muted-foreground text-xs'>
                      {location.lat}, {location.lng}
                    </p> */}
                    {location.precos &&
                      location.precos.map((p) => (
                        <div
                          className='flex justify-between text-md'
                          key={p.produto}
                        >
                          <div className='flex gap-2  items-center'>
                            <span
                              // className={[
                              //   colors[p.produto],
                              //   "border-r-8, w-5, h-5",
                              // ]}
                              className={cn(
                                "flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold shadow-sm shrink-0",
                                colors[p.produto] ?? "bg-slate-700 text-white",
                              )}
                            >
                              {p.produto[0]}
                            </span>
                            <p>{p.produto}</p>
                          </div>
                          <p>R$ {p.preco}</p>
                        </div>
                      ))}
                  </div>
                </MarkerPopup>
              </MapMarker>
            ))}
        </Map>
      </main>
    </div>
  );
}

{
  /* /* <SheetDemo
        open={open}
        onOpenChange={setOpen}
        setPostos={setPostos}
        moveMap={moveMap}
      /> */
}
