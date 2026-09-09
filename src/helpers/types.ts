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
