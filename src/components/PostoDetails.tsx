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
import PostoItem from "./PostoItem";

// - Abre drawer/sheet com: nome, endereço, bandeira, todos os produtos
//           com preço + data da coleta, botão "Como chegar" (deep link Google
//           Maps).

export function PostoDetails({ posto, open, onOpenChange }) {
  console.log("teste dentro", open, posto);
  if (!posto) return;

  const temPrecos = posto.precos.length > 0;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger render={<Button variant='outline'>Open</Button>} />
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Detalhes do posto</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        {/* <div className='grid flex-1 auto-rows-min gap-6 px-4'> */}
        <div className='grid flex-1 auto-rows-min gap-6 px-4'>
          <p>Nome: {posto?.razaoSocial}</p>
          <p>Endereço: {posto?.endereco}</p>
          <p>Bairro: {posto?.bairro}</p>
          <p>Distribuidora: {posto?.distribuidora}</p>
          <p>Data Coleta: {posto?.dataColeta}</p>

          {temPrecos &&
            posto.precos.map((produto) => (
              <PostoItem item={produto} key={produto.produto} />
            ))}
        </div>
        <SheetFooter>
          {/* <Button type='submit'>Save changes</Button> */}
          <SheetClose render={<Button variant='outline'>Fechar</Button>} />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
