import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import { getCities, getPostos } from "@/services/postosService";
import { detectarTipoBusca } from "@/helpers/functions";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import type {
  CidadeOption,
  CidadeOption2,
  Props,
  QueryType,
} from "@/helpers/types";
import { useCitiesQuery } from "@/hooks/useCitiesQuery";

const defaultCity = {
  municipio: "FORTALEZA",
  uf: "CE",
};

export function SearchInput({
  setPostos,
  setFiltros,
  moveMap,
  query,
  setQuery,
  setCidade,
  setLoadMode,
  cidade,
}) {
  const [type, setType] = useState<QueryType>("municipio");

  const debouncedSearchTerm = useDebounce(query, 500);
  const tipo = detectarTipoBusca(query);
  const [open, setOpen] = useState(false);
  const [loadingBusca, setLoadingBusca] = useState(false);
  const [selectedCity, setSelectedCity] = useState<CidadeOption2 | null>(null);

  const {
    data: cidades = [],
    isLoading,
    error,
  } = useCitiesQuery(debouncedSearchTerm);

  const opcoes: CidadeOption[] =
    cidades.length > 0 &&
    cidades.map((c: { municipio: string; uf: string }) => ({
      municipio: c.municipio,
      uf: c.uf,
      label: `${c.municipio} - ${c.uf}`,
      value: `${c.municipio}-${c.uf}`,
    }));

  const onSubmit = async ({ municipio, uf, cnpj }: Props) => {
    setLoadingBusca(true);
    let queryStr = "";
    // if (selectedCity) {
    //   queryStr += `?municipio=${selectedCity?.municipio}&uf=${selectedCity?.uf}`;
    // }

    if (tipo === "cnpj") {
      queryStr += `?cnpj=${query}`;
    }

    if (tipo === "texto") {
      queryStr += `?municipio=${municipio}&uf=${uf}`;
    }

    try {
      const data = await getPostos(queryStr);

      console.log("data aq", data);

      setPostos(data.postos);
      setFiltros(data.filtros);
      setCidade(data.cidade);

      const lat = data.cidade.lat;
      const lng = data.cidade.lng;

      moveMap(lng, lat);

      setQuery("");
    } catch (err) {
      console.log("err", err);
    } finally {
      setLoadingBusca(false);
    }
  };

  const handleSelect = async (opcao) => {
    setOpen(false);
    setSelectedCity({
      municipio: opcao.municipio,
      uf: opcao.uf,
    }); // aqui os DOIS valores saem juntos

    await new Promise((resolve) => setTimeout(resolve, 0));

    onSubmit({
      municipio: opcao.municipio,
      uf: opcao.uf,
    });
  };

  const cnpjCompleto = query.replace(/\D/g, "").length === 14;

  return (
    <div className='flex flex-col gap-4'>
      <Button
        onClick={() => setOpen(true)}
        variant='outline'
        className='w-full my-2'
      >
        Pesquisar postos
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command>
          <CommandInput
            placeholder='Digite o nome de uma cidade...'
            value={query}
            onValueChange={(value) => setQuery(value)}
          />
          <CommandList>
            {tipo === "texto" && (
              <>
                <CommandEmpty>Nenhuma cidade encontrada.</CommandEmpty>
                <CommandGroup heading='Cidades'>
                  {opcoes.length > 0 &&
                    opcoes.map((opcao) => (
                      <CommandItem
                        key={opcao.value}
                        value={opcao.value}
                        onSelect={() => handleSelect(opcao)}
                      >
                        {opcao.label}
                      </CommandItem>
                    ))}
                </CommandGroup>
              </>
            )}

            {tipo === "cnpj" && (
              <CommandGroup heading='CNPJ'>
                <CommandItem
                  disabled={!cnpjCompleto}
                  onSelect={() => onSubmit(query.replace(/\D/g, ""))}
                >
                  {cnpjCompleto
                    ? `Buscar posto com CNPJ ${query}`
                    : `Digite os 14 dígitos do CNPJ... (${query.replace(/\D/g, "").length}/14)`}
                </CommandItem>
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </CommandDialog>
    </div>
  );
}

{
  /* <Label htmlFor='sheet-demo-name'>Municipio</Label> */
}
{
  /* <Input
        id='sheet-demo-name'
        placeholder='Pesquise pela Cidade ou pelo CPNJ'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      /> */
}

{
  /* <p>{query}</p>
      <p>{selectedCity?.municipio}</p> */
}

{
  /* <Button
        type='submit'
        onClick={onSubmit}
        className='w-full my-2'
        disabled={!selectedCity}
      >
        Pesquisar
      </Button> */
}
