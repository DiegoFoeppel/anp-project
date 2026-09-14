export type Info = {
  id: string;
  cnpj: string;
  nome: string;
  municipio: string;
  estado: string;
  bandeira: string;
  distribuidora: string;
  cep: string;
  razaoSocial: string;
  fantasia: string;
  endereco: string;
  bairro: string;
  lat: number;
  lng: number;
  dataColeta: string;
  precos: Preco[];
};

export type Filtros = {
  bairros: string[];
  distribuidora: string[];
  ceps: string[];
};

export type Preco = {
  produto: string;
  preco: string;
};

export const colors = {
  ETANOL: "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300",
  "DIESEL S10":
    "bg-yellow-50 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300",
  "DIESEL S500":
    "bg-yellow-50 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300",
  "GASOLINA COMUM": "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300",
  "GASOLINA ADITIVADA":
    "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  GNV: "bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-300",
};

export const tiposCombustiveis = [
  "GASOLINA COMUM",
  "DIESEL S500",
  "GNV",
  "ETANOL",
  "DIESEL S10",
  "GASOLINA ADITIVADA",
];
