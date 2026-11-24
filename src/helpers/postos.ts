// helpers/postos.ts
import { type Info } from "./types";
export interface Preco {
  produto: string;
  preco: number;
}

export interface Info2 {
  razaoSocial: string;
  bairro?: string;
  bandeira?: string;
  precos: Preco[];
  [key: string]: any;
}

// export const postosLista = (
//   data: Info[],
//   combustivel: string,
//   ordem: string,
//   multipleFilters: Record<string, any>,
//   mode?: boolean,
// ) => {
//   if (!data || data.length === 0) return [];

//   return data
//     .map((posto) => {
//       const itemPreco = posto.precos?.find(
//         (p) => p.produto.toUpperCase() === combustivel.toUpperCase(),
//       );

//       return {
//         ...posto,
//         precoExibicao: itemPreco ? itemPreco.preco : null,
//       };
//     })
//     .sort((a, b) => {
//       if (a.precoExibicao === null) return 1;
//       if (b.precoExibicao === null) return -1;

//       if (ordem === "MENOR_PRECO") return a.precoExibicao - b.precoExibicao;
//       if (ordem === "MAIOR_PRECO") return b.precoExibicao - a.precoExibicao;
//       if (ordem === "NOME") return a.razaoSocial.localeCompare(b.razaoSocial);
//       return 0;
//     });
// };

interface Posto {
  bairro?: string;
  bandeira?: string;
  [key: string]: any;
}

interface Filtros {
  bairro?: string;
  bandeira?: string;
  [key: string]: any;
}

export const aplicarFiltros = (posto: Posto, filtros: Filtros): boolean => {
  return Object.entries(filtros).every(([chave, valorFiltro]) => {
    // Se o filtro não foi selecionado, for 'TODOS' ou vazio, deixa o posto passar
    // Ignora a chave 'exibirPreco' aqui pois já foi tratada acima

    // Se o filtro não foi selecionado, for 'TODOS' ou string vazia "", deixa o posto passar
    if (!valorFiltro) return true;

    const valorPosto = posto[chave as keyof typeof posto];

    // Se o valor for string, faz comparação case-insensitive
    if (typeof valorPosto === "string") {
      return valorPosto.toLowerCase() === String(valorFiltro).toLowerCase();
    }

    return valorPosto === valorFiltro;
  });
};

export const getPreco = (postos: Info[], combustivel: string) => {
  const data = postos.map((posto) => {
    const itemPreco = posto.precos?.find(
      (p: any) => p.produto.toUpperCase() === combustivel.toUpperCase(),
    );

    return {
      ...posto,
      precoExibicao: itemPreco ? itemPreco.preco : null,
    };
  });

  return data;
};

// 1. Derivação para o Mapa
export const getPostosParaMapa = (
  postos: any[],
  filtros: Record<string, any>,
  combustivel: string,
  mode: boolean,
) => {
  if (!postos) return [];
  return getPreco(postos, combustivel).filter((posto) => {
    if (mode && posto.precoExibicao === null) {
      return false;
    }
    return aplicarFiltros(posto, filtros);
  });
};

// 2. Derivação para a Lista
export const getPostosParaLista = (
  postos: any[],
  combustivelAtivo: string,
  filtros: Record<string, any>,
  ordem: string = "MENOR_PRECO",
  mode: boolean,
) => {
  if (!postos) return [];

  return getPreco(postos, combustivelAtivo).filter((posto) => {
    // apenas precos -> mode true posto.precoExibicao !== null
    // todos mode = false
    if (mode && posto.precoExibicao === null) {
      return false;
    }

    return aplicarFiltros(posto, filtros);
  });

  // .sort((a, b) => {
  //   if (ordem === "MENOR_PRECO") return a.precoExibicao - b.precoExibicao;
  //   if (ordem === "MAIOR_PRECO") return b.precoExibicao - a.precoExibicao;
  //   if (ordem === "NOME") return a.razaoSocial.localeCompare(b.razaoSocial);
  //   if (ordem === "") return;
  //   return 0;
  // });
};
