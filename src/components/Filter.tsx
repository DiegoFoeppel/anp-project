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

export function SheetDemo({ open, onOpenChange, setPostos, moveMap }) {
  const [type, setType] = useState<QueryType>("municipio");
  const [query, setQuery] = useState("");

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
      onOpenChange(false);

      if (response.data.postos) {
        const lat = response.data.postos[0].lat;
        const lng = response.data.postos[0].lng;
        console.log("teste", lat, lng);

        moveMap(lng, lat);
      }
      console.log("response", response);
    } catch (err) {
      console.log("err", err);
    }
  };

  // const handleQuery = (value: string) => {
  //   const cnpjLimpo = value.replace(/\D/g, "");

  //   if (cnpjLimpo.length === 14) {
  //     setType("cnpj");
  //     setQuery(cnpjLimpo);
  //   }

  //   setType("municipio");
  //   setQuery(value.trim());
  // };

  console.log("type", type, query);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger render={<Button variant='outline'>Open</Button>} />
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filtrar dados</SheetTitle>
          <SheetDescription>
            Filtre a busca para visualizar os postos através dos filtros abaixo.
          </SheetDescription>
        </SheetHeader>

        {/* <div className='grid flex-1 auto-rows-min gap-6 px-4'> */}
        {/* <SearchTabs /> */}
        <div className='grid gap-3'>
          {/* <Label htmlFor='sheet-demo-name'>Municipio</Label> */}
          <Input
            id='sheet-demo-name'
            placeholder='Pesquise pela Cidade ou pelo CPNJ'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <Button type='submit' onClick={onSubmit}>
          Pesquisar
        </Button>

        <SheetFooter>
          <Button type='submit' onClick={onSubmit}>
            Save changes
          </Button>
          <SheetClose render={<Button variant='outline'>Close</Button>} />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
