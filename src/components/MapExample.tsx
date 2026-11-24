import { Map, MapControls, type MapRef } from "@/components/ui/map";
import { type Filtros, type Info } from "../helpers/types";
import { SearchInput } from "./SearchInput";
import { Filters } from "./Filters";
import RenderPostosList from "./RenderPostosList";
import { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import MapContent from "./MapContent";
import { SelectCombo, SelectInvalid } from "./Select";
import MapClick from "./MapClick";
import { tiposCombustiveis } from "@/helpers/functions";
import { type Cidade } from "../helpers/types";
import { getPostosParaLista, getPostosParaMapa } from "@/helpers/postos";
import { MapPin } from "lucide-react";

export function MyMap() {
  const [mode, setMode] = useState(false);
  const [postos, setPostos] = useState<Info[]>([]);
  const [filtros, setFiltros] = useState<Filtros[]>([]);
  const [query, setQuery] = useState("Fortal");
  const [cidade, setCidade] = useState<Cidade | null>(null);
  const [geojson, setGeojson] = useState(null);
  const [loadMode, setLoadMode] = useState(null);
  const [ordem, setOrdem] = useState("");

  const [combustivel, setCombustivel] = useState(() => {
    return localStorage.getItem("combustivel") ?? "";
  });

  const [multipleFilters, setMultipleFilters] = useState({
    bairro: "",
    bandeira: "",
  });

  console.log(multipleFilters);

  const postosParaMapa = useMemo(
    () => getPostosParaMapa(postos, multipleFilters, combustivel, mode),
    [postos, multipleFilters, combustivel, mode],
  );

  const postosParaLista = useMemo(
    () => getPostosParaLista(postos, combustivel, multipleFilters, ordem, mode),
    [postos, combustivel, multipleFilters, ordem, mode],
  );

  const mapRef = useRef<MapRef>(null);

  const moveMap = (lng: number, lat: number, zoom = 12) => {
    mapRef.current?.flyTo({
      center: [lng, lat],
      zoom: zoom,
      pitch: 45, // Inclinação da câmera (opcional)
      bearing: 0, // Rotação do mapa (opcional)
      duration: 3000, // Duração da animação em ms (3 segundos)
      essential: true, // Garante que a animação ocorra mesmo com preferência de redução de movimento do SO
    });
  };

  const handleCombustivelChange = (combustivel: string) => {
    if (!combustivel) return;

    setCombustivel(combustivel);

    localStorage.setItem("combustivel", combustivel);
  };

  console.log("selected cit");

  console.log("filtros", filtros);
  return (
    <div className='flex h-screen w-screen'>
      <aside className='w-[380px] flex-shrink-0 h-full overflow-y-auto border-r bg-background flex flex-col p-4'>
        {/* <div className='p-4 border-b'> */}
        <div className='border-b mb-2'>
          <h2 className='my-1'>MapANP</h2>
        </div>

        {/* <div className='border-b mb-2'> */}
        {/* <p className=''>Preferência de Combustível</p> */}
        <SelectInvalid
          data={tiposCombustiveis}
          nome='Combustível'
          value={combustivel}
          onSelect={handleCombustivelChange}
        />

        {/* </div> */}

        <SearchInput
          query={query}
          setQuery={setQuery}
          setPostos={setPostos}
          moveMap={moveMap}
          setFiltros={setFiltros}
          setCidade={setCidade}
        />

        <div className='border-b'></div>

        {postos.length > 0 && (
          <>
            <p className='my-2 flex flex-row items-center gap-2'>
              <MapPin size={16} />
              {cidade?.nome}, {cidade?.uf}
            </p>
            <Filters
              filtros={filtros}
              setMultipleFilters={setMultipleFilters}
              multipleFilters={multipleFilters}
              mode={mode}
              setMode={setMode}
            />

            <div className='border-b mb-4'></div>

            <RenderPostosList postos={postosParaLista} moveMap={moveMap} />
          </>
        )}
      </aside>

      <main className='flex-1 h-full'>
        <Map
          ref={mapRef}
          center={
            postos[0] ? [postos[0].lng, postos[0].lat] : [-38.5434, -3.71839]
          }
          zoom={11}
        >
          <MapClick setPostos={setPostos} setLoadMode={setLoadMode} />

          <MapContent
            postos={postos}
            filteredPostos={postosParaMapa}
            postosGeojson={geojson}
            combustivel={combustivel}
          />

          <MapControls />
        </Map>
      </main>
    </div>
  );
}

// const loadGeojson = async () => {
//   try {
//     const response = await axios.get(
//       "http://localhost:8001/api/postos/geojson",
//     );

//     setGeojson(response.data);
//   } catch (err) {
//     console.log("err", err);
//   }
// };

// useEffect(() => {
//   loadGeojson();
// }, []);
{
  /* /* <SheetDemo
  open={open}
  onOpenChange={setOpen}
  setPostos={setPostos}
  moveMap={moveMap}
  /> */
}

// {selectedPoint && (
//   <MapPopup
//     key={`${selectedPoint.coordinates[0]}-${selectedPoint.coordinates[1]}`}
//     longitude={selectedPoint.coordinates[0]}
//     latitude={selectedPoint.coordinates[1]}
//     onClose={() => setSelectedPoint(null)}
//     closeOnClick={false}
//     focusAfterOpen={false}
//     closeButton
//     className='w-34'
//   >
//     <div className='text-[13px]'>
//       <p className='text-muted-foreground'>
//         Teste:{" "}
//         <span className='text-foreground font-medium'>
//           {selectedPoint.properties.id}
//         </span>
//       </p>
//       {/* <p className='text-muted-foreground'>
//         Tsunami:{" "}
//         <span className='text-foreground'>
//           {selectedPoint.properties?.tsunami === 1 ? "Yes" : "No"}
//         </span>
//       </p> */}
//     </div>
//   </MapPopup>
// )}

// {
//   postos.length > 0 &&
//     filteredPostos.map((location) => (
//       <MapMarker
//         key={location.id}
//         longitude={location.lng}
//         latitude={location.lat}
//       >
//         <MarkerContent>
//           <div className='bg-primary flex h-9 w-9 items-center justify-center rounded-full border-2 border-white text-white shadow-lg dark:bg-black'>
//             <BandeiraIcon bandeira={location.bandeira} />
//           </div>
//         </MarkerContent>

//         <MarkerTooltip>{location.razaoSocial}</MarkerTooltip>

//         <MarkerPopup className='w-75'>
//           <div className='space-y-1'>
//             <p className='text-foreground font-medium'>CNPJ: {location.cnpj}</p>

//             <p className='text-foreground font-medium'>Nome: {location.nome}</p>

//             <p className='text-foreground font-medium'>
//               Distribuidora: {location.distribuidora}
//             </p>

//             <p className='text-foreground font-medium'>
//               Bandeira: {location.bandeira}
//             </p>

//             {location.precos &&
//               location.precos.map((p) => (
//                 <div className='flex justify-between text-md' key={p.produto}>
//                   <div className='flex items-center gap-2'>
//                     <span
//                       className={cn(
//                         "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold shadow-sm",
//                         colors[p.produto] ?? "bg-slate-700 text-white",
//                       )}
//                     >
//                       {p.produto[0]}
//                     </span>

//                     <p>{p.produto}</p>
//                   </div>

//                   <p>R$ {p.preco}</p>
//                 </div>
//               ))}
//           </div>
//         </MarkerPopup>
//       </MapMarker>
//     ));
// }
