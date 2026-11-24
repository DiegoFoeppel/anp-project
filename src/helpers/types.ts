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
  precoExibicao: number | null;
};

export type Filtros = {
  bairros: string[];
  distribuidora: string[];
  ceps: string[];
};

export type Preco = {
  produto: string;
  preco: number;
};

export type QueryType = "cnpj" | "municipio";

export type Cidade = {
  nome: string;
  uf: string;
  lat: number;
  lng: number;
};

export type CidadeOption = {
  municipio: string;
  uf: string;
  label: string; // "Fortaleza - CE", pro que aparece na tela
  value: string; // "FORTALEZA-CE", chave única pro Command usar internamente
};

export type CidadeOption2 = {
  municipio: string;
  uf: string;
};

export type Props = {
  municipio?: string;
  uf?: string;
  cnpj?: string;
};
