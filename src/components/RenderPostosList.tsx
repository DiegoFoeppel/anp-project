import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { BANDEIRA_LOGOS } from "./BandeiraIcon";
import { Funnel, SlidersHorizontal } from "lucide-react";

import { formatarDataBR } from "@/helpers/functions";
import { MapPin, Fuel } from "lucide-react";

const PostoItem = ({ posto, onClick }) => {
  // precoExibicao vem injetado pela nossa função getPostosParaLista (ex: 5.79)
  const temPreco = typeof posto.precoExibicao === "number";

  const precoFormatado = temPreco
    ? posto.precoExibicao.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      })
    : "Indisponível";

  return (
    <div
      onClick={() => onClick(posto)}
      className='group cursor-pointer rounded-xl border bg-card p-4 transition-all hover:border-primary/40 hover:shadow-md flex flex-col justify-between gap-3'
    >
      {/* Cabeçalho: Nome + Preço em Destaque */}
      <div className='flex items-start justify-between gap-3'>
        <div className='flex items-center gap-2.5 min-w-0'>
          {/* Logo da Bandeira */}
          {BANDEIRA_LOGOS[posto.distribuidora] ? (
            <img
              src={BANDEIRA_LOGOS[posto.distribuidora]}
              alt={`Bandeira ${posto.distribuidora}`}
              className='h-7 w-7 shrink-0 object-contain rounded-md border p-0.5'
            />
          ) : (
            <div className='flex h-7 w-7 shrink-0 items-center justify-center rounded-md border bg-muted text-muted-foreground'>
              <Fuel className='h-4 w-4' />
            </div>
          )}

          {/* Nome e Razão Social */}
          <div className='min-w-0'>
            <h3 className='truncate font-semibold text-sm text-foreground group-hover:text-primary transition-colors'>
              {posto.nome || posto.razaoSocial || "Posto sem nome"}
            </h3>
            <p className='truncate text-xs text-muted-foreground'>
              {posto.distribuidora || "Bandeira Branca"}
            </p>
          </div>
        </div>

        {/* Preço em Destaque */}
        <div className='text-right shrink-0'>
          {temPreco ? (
            <>
              <span className='block text-base font-bold text-foreground leading-tight'>
                {precoFormatado}
              </span>
              {posto.dataColeta && (
                <span className='text-[10px] text-muted-foreground'>
                  {formatarDataBR(posto.dataColeta)}
                </span>
              )}
            </>
          ) : (
            <span className='inline-block rounded-md bg-muted px-2 py-1 text-[11px] font-medium text-muted-foreground'>
              Sem preço
            </span>
          )}
        </div>
      </div>

      {/* Localização e Endereço */}
      <div className='flex items-center gap-1.5 text-xs text-muted-foreground pt-1 border-t border-border/40'>
        <MapPin className='h-3.5 w-3.5 shrink-0 text-muted-foreground/70' />
        <div className='flex flex-col'>
          <span>{posto.endereco}</span>
          <span>{posto.bairro ? ` ${posto.bairro}` : ""}</span>
        </div>
        {/* <p className='truncate'>
          {posto.endereco}
          {posto.bairro ? ` • ${posto.bairro}` : ""}
        </p> */}
      </div>
    </div>
  );
};

// const PostoItem = ({ posto, onClick }) => {
//   const temPreco = posto.precos.length > 0;

//   return (
//     <div
//       onClick={() => onClick(posto)}
//       className='group cursor-pointer rounded-xl border bg-card p-4 transition-all hover:border-primary/40 hover:shadow-sm'
//     >
//       {/* Nome + status */}
//       <div className='flex items-center justify-between gap-3'>
//         <div className='min-w-0'>
//           <div className='flex gap-2'>
//             {BANDEIRA_LOGOS[posto.bandeira] ? (
//               <img
//                 src={BANDEIRA_LOGOS[posto.bandeira]}
//                 alt='Logo Bandeira Posto'
//                 className='h-6 w-6'
//               />
//             ) : null}
//             <h3 className='truncate font-semibold text-sm'>
//               {posto.nome ?? "Sem nome"}
//             </h3>
//           </div>

//           <p className='mt-1 truncate text-xs text-muted-foreground'>
//             {posto.razaoSocial}
//           </p>
//         </div>

//         <div
//           className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${
//             temPreco
//               ? "bg-green-100 text-green-700"
//               : "bg-muted text-muted-foreground"
//           }`}
//         >
//           {temPreco ? "Com preço" : "Sem preço"}
//         </div>
//       </div>

//       {/* Localização */}
//       <div className='mt-3'>
//         <p className='text-sm'>{posto.endereco}</p>

//         <p className='text-xs text-muted-foreground'>
//           {posto.bairro} -{" "}
//           {posto.distribuidora ?? "Distribuidora não informada"}
//         </p>
//       </div>

//       {/* Informações secundárias */}
//       {/* <div className='mt-3 flex items-center gap-2 text-xs text-muted-foreground'>
//         <span>{posto.distribuidora ?? "Distribuidora não informada"}</span>
//       </div> */}
//     </div>
//   );
// };

const RenderPostosList = ({ postos, moveMap }) => {
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    const text = e.target.value;
    setSearch(text);
  };

  const filteredPostos = useMemo(() => {
    const cleanSearch = search.trim().toLowerCase();

    // Se a busca estiver vazia após o trim, retorna a lista completa
    if (!cleanSearch) return postos;

    return postos.filter((posto) => {
      const nome = (posto.nome ?? "").toLowerCase();
      const razaoSocial = (posto.razaoSocial ?? "").toLowerCase();

      return nome.includes(cleanSearch) || razaoSocial.includes(cleanSearch);
    });
  }, [postos, search]);

  const handleMove = (posto) => {
    moveMap(posto.lng, posto.lat, 15);
  };

  return (
    <div className='flex flex-col flex-1 min-h-0'>
      <Input
        value={search}
        onChange={handleSearch}
        placeholder='Digite o nome do posto'
      />

      <p className='mt-2.5'>Total de Postos: {filteredPostos.length}</p>
      {/* <Funnel /> */}
      {/* <SlidersHorizontal /> */}
      <div
        className='no-scrollbar flex-1 overflow-y-auto space-y-3 pb-4 my-4'
        // onClick={handleMove}
      >
        {filteredPostos.map((p) => (
          <PostoItem key={p.codigoSimp} posto={p} onClick={handleMove} />
        ))}
      </div>
    </div>
  );
};

export default RenderPostosList;
