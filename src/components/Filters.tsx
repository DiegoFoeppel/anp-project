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
import { Select } from "./Select";
import { TogglePostos } from "./TogglePostos";

type QueryType = "cnpj" | "municipio";

export function Filters({
  filtros,
  multipleFilters,
  setMultipleFilters,
  mode,
  setMode,
}) {
  console.log("teste", multipleFilters);

  return (
    <div className='p-4 space-y-4'>
      {/* <Label htmlFor='sheet-demo-name'>Municipio</Label> */}
      <TogglePostos mode={mode} setMode={() => setMode((prev) => !prev)} />

      <Select
        data={filtros.bairros}
        nome='Bairro'
        value={multipleFilters.bairro}
        onSelect={(valor) => {
          console.log("valor", valor);
          setMultipleFilters((prev) => ({
            ...prev,
            bairro: valor,
          }));
        }}
      />

      <Select
        data={filtros.distribuidoras}
        nome='Distribuidora'
        value={multipleFilters.distribuidora}
        onSelect={(valor) =>
          setMultipleFilters((prev) => ({
            ...prev,
            distribuidora: valor,
          }))
        }
      />
    </div>
  );
}
