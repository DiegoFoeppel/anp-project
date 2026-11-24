export function detectarTipoBusca(query: string): "cnpj" | "texto" {
  const soDigitos = query.replace(/\D/g, "");
  if (soDigitos.length >= 11) return "cnpj"; // já parece CNPJ sendo digitado
  return "texto";
}

export function formatarDataBR(
  dataIso: string | Date | null | undefined,
): string {
  if (!dataIso) return "";

  // Se a string for "YYYY-MM-DD", adicionamos "T00:00:00" para evitar
  // que o JavaScript converta para UTC e volte 1 dia por causa do fuso horário BR (-3h).
  const data =
    typeof dataIso === "string" && dataIso.length === 10
      ? new Date(`${dataIso}T00:00:00`)
      : new Date(dataIso);

  if (isNaN(data.getTime())) return "";

  return new Intl.DateTimeFormat("pt-BR").format(data);
}

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
