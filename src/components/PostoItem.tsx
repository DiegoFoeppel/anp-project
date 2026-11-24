import { colors, formatarDataBR } from "@/helpers/functions";
import { cn } from "@/lib/utils";

const PostoItem = ({ item }) => {
  // Garante que o valor venha como número e formatado em BRL (Ex: R$ 5,89)
  const precoFormatado =
    typeof item.preco === "number"
      ? item.preco.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })
      : `R$ ${item.preco}`;

  return (
    <div
      className='flex items-center justify-between border-b border-border/50 py-2.5 last:border-0'
      key={item.produto}
    >
      {/* Esquerda: Badge com Inicial + Nome do Produto */}
      <div className='flex items-center gap-2.5'>
        <span
          className={cn(
            "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white shadow-sm leading-none",
            colors[item.produto] ?? "bg-slate-700 text-white",
          )}
        >
          {item.produto ? item.produto[0].toUpperCase() : "?"}
        </span>

        <span className='text-sm font-medium text-foreground'>
          {item.produto}
        </span>
      </div>

      {/* Direita: Preço em destaque + Data de coleta */}
      <div className='text-right'>
        <p className='text-base font-bold text-foreground leading-tight'>
          {precoFormatado}
        </p>
        <p className='text-[11px] text-muted-foreground mt-0.5'>
          {formatarDataBR(item.dataColeta)}
        </p>
      </div>
    </div>
  );
};

// const PostoItem = ({ item }) => {
//   return (
//     <div className='flex justify-between text-align text-md' key={item.produto}>
//       <div className='flex items-center gap-2'>
//         <span
//           className={cn(
//             "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold shadow-sm leading-none",
//             colors[item.produto] ?? "bg-slate-700 text-white",
//           )}
//         >
//           {item.produto[0]}
//         </span>

//         <p>{item.produto}</p>
//       </div>

//       <div className='flex flex-col my-1'>
//         <p>R$ {item.preco}</p>
//         <p className=' my-2 text-xs text-muted-foreground'>
//           {formatarDataBR(item.dataColeta)}
//         </p>
//       </div>
//     </div>
//   );
// };

export default PostoItem;
