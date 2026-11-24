// "use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

export default function CommandBasic({
  data,
  value,
  setQuery,
  query,
  onSelect,
  onSubmit,
  tipo,
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className='flex flex-col gap-4'>
      <Button
        onClick={() => setOpen(true)}
        variant='outline'
        className='w-full my-2'
      >
        Pesquisar cidade
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command>
          <CommandInput
            placeholder='Digite o nome de uma cidade...'
            value={value}
            onValueChange={(value) => setQuery(value)}
          />
          <CommandList>
            {tipo === "texto" && (
              <>
                <CommandEmpty>Nenhuma cidade encontrada.</CommandEmpty>
                <CommandGroup heading='Cidades'>
                  {data.length > 0 &&
                    data.map((opcao) => (
                      <CommandItem
                        key={opcao.value}
                        value={opcao.value}
                        onSelect={() => {
                          setOpen(false);
                          onSelect(opcao.municipio, opcao.uf); // aqui os DOIS valores saem juntos
                          onSubmit(opcao.municipio, opcao.uf);
                        }}
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
                  onSelect={() => onBuscarCnpj(query.replace(/\D/g, ""))}
                >
                  {cnpjCompleto
                    ? `Buscar posto com CNPJ ${formatarCnpj(query)}`
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
