import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import axios from "axios";
import { useState } from "react";
import { SearchTabs } from "./SearchTabs";

type QueryType = "cnpj" | "municipio";

export function SearchInput({
  setPostos,
  setFiltros,
  moveMap,
  query,
  setQuery,
  setCidade,
}) {
  const [type, setType] = useState<QueryType>("municipio");

  const onSubmit = async () => {
    let queryStr = "";

    const cnpjLimpo = query.replace(/\D/g, "");

    if (cnpjLimpo.length === 14) {
      queryStr += `?cnpj=${cnpjLimpo}`;
    } else {
      queryStr += `?municipio=${query.toUpperCase()}`;
    }

    try {
      const response = await axios.get(
        `http://localhost:8001/api/lpc${queryStr}`,
      );

      setPostos(response.data.postos);
      setFiltros(response.data.filtros);
      setCidade(response.data.cidade);

      //   onOpenChange(false);

      if (response.data.postos) {
        const lat = response.data.postos[0].lat;
        const lng = response.data.postos[0].lng;
        console.log("teste", lat, lng);

        moveMap(lng, lat);
      }

      setQuery("");
      console.log("response", response);
    } catch (err) {
      console.log("err", err);
    }
  };

  return (
    <div className='p-4'>
      {/* <Label htmlFor='sheet-demo-name'>Municipio</Label> */}
      <Input
        id='sheet-demo-name'
        placeholder='Pesquise pela Cidade ou pelo CPNJ'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <Button
        type='submit'
        onClick={onSubmit}
        className='w-full my-2'
        disabled={!query}
      >
        Pesquisar
      </Button>
    </div>
  );
}
