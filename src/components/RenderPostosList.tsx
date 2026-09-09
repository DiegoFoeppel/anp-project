import React, { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { BANDEIRA_LOGOS } from "./BandeiraIcon";

import shellLogo from "../../public/shell.svg";
import ipirangaLogo from "../../public/ipiranga.png";
import petrobrasLogo from "../../public/petrobras-8.svg";
import aleLogo from "../../public/ale.png";
import spLogo from "../../public/sp-logo-2.png";

const PostoItem = ({ posto, onClick }) => {
  return (
    <div
      onClick={() => onClick(posto)}
      className='group cursor-pointer rounded-xl border bg-card p-4 transition-all hover:border-primary/40 hover:shadow-sm'
    >
      {/* Nome + status */}
      <div className='flex items-center justify-between gap-3'>
        <div className='min-w-0'>
          <div className='flex gap-2'>
            {BANDEIRA_LOGOS[posto.bandeira] ? (
              <img
                src={BANDEIRA_LOGOS[posto.bandeira]}
                alt='Logo Bandeira Posto'
                className='h-6 w-6'
              />
            ) : null}
            <h3 className='truncate font-semibold text-sm'>
              {posto.nome ?? "Sem nome"}
            </h3>
          </div>

          <p className='mt-1 truncate text-xs text-muted-foreground'>
            {posto.razaoSocial}
          </p>
        </div>

        <div
          className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${
            posto.dataColeta
              ? "bg-green-100 text-green-700"
              : "bg-muted text-muted-foreground"
          }`}
        >
          {posto.dataColeta ? "Com preço" : "Sem preço"}
        </div>
      </div>

      {/* Localização */}
      <div className='mt-3'>
        <p className='text-sm'>{posto.endereco}</p>

        <p className='text-xs text-muted-foreground'>
          {posto.bairro} -{" "}
          {posto.distribuidora ?? "Distribuidora não informada"}
        </p>
      </div>

      {/* Informações secundárias */}
      {/* <div className='mt-3 flex items-center gap-2 text-xs text-muted-foreground'>
        <span>{posto.distribuidora ?? "Distribuidora não informada"}</span>
      </div> */}
    </div>
  );
};

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
    console.log("cliquei", posto);
    moveMap(posto.lng, posto.lat, 15);
  };

  return (
    <div className='p-4 flex flex-col flex-1 min-h-0'>
      <Input
        value={search}
        onChange={handleSearch}
        placeholder='Digite o nome do posto'
      />

      <p className='mt-2.5'>Total de Postos: {filteredPostos.length}</p>

      <div
        className='no-scrollbar flex-1 overflow-y-auto space-y-3 pb-4 my-4'
        // onClick={handleMove}
      >
        {filteredPostos.map((p) => (
          <PostoItem key={p.id} posto={p} onClick={handleMove} />
        ))}
      </div>
    </div>
  );
};

export default RenderPostosList;
