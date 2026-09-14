import { colors } from "@/helpers/types";
import { cn } from "@/lib/utils";
import React from "react";

const PostoItem = ({ item }) => {
  return (
    <div className='flex justify-between text-align text-md' key={item.produto}>
      <div className='flex items-center gap-2'>
        <span
          className={cn(
            "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold shadow-sm leading-none",
            colors[item.produto] ?? "bg-slate-700 text-white",
          )}
        >
          {item.produto[0]}
        </span>

        <p>{item.produto}</p>
      </div>

      <p>R$ {item.preco}</p>
    </div>
  );
};

export default PostoItem;
