import React from "react";
import { MarkerPopup } from "./ui/map";
import { cn } from "@/lib/utils";
import { colors } from "@/helpers/types";
import PostoItem from "./PostoItem";

const PostoMarker = ({ posto }) => {
  return (
    <MarkerPopup className='w-75'>
      <div className='space-y-1'>
        <p className='text-foreground font-medium'>CNPJ: {posto.cnpj}</p>

        <p className='text-foreground font-medium'>Nome: {posto.razaoSocial}</p>

        <p className='text-foreground font-medium'>
          Distribuidora: {posto.distribuidora}
        </p>

        {posto.precos.length > 0 &&
          posto.precos.map((i) => <PostoItem item={i} key={i.produto} />)}
      </div>
    </MarkerPopup>
  );
};

export default PostoMarker;
