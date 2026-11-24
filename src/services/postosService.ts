import { api } from "@/api/axios";

export async function getCities(city: string) {
  const res = await api.get(`/api/postos/cidades?cidade=${city}`);
  // return res.data.directions;
  return res.data.cidades;
}

export async function getPostos(queryStr: string) {
  if (!queryStr) return;

  const res = await api.get(`/api/lpc${queryStr}`);
  // return res.data.directions;
  return res.data;
}
