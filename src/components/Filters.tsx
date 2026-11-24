import { SelectCombo } from "./Select";
import { TogglePostos } from "./TogglePostos";

export function Filters({
  filtros,
  multipleFilters,
  setMultipleFilters,
  mode,
  setMode,
}) {
  return (
    <div className='space-y-4'>
      {/* <Label htmlFor='sheet-demo-name'>Municipio</Label> */}
      <TogglePostos mode={mode} setMode={() => setMode((prev) => !prev)} />

      <SelectCombo
        data={filtros.bairros}
        nome='Bairro'
        value={multipleFilters.bairro}
        onSelect={(valor) => {
          setMultipleFilters((prev) => ({
            ...prev,
            bairro: valor,
          }));
        }}
      />

      <SelectCombo
        data={filtros.bandeiras}
        nome='Distribuidora'
        value={multipleFilters.bandeira}
        onSelect={(valor) =>
          setMultipleFilters((prev) => ({
            ...prev,
            distribuidora: valor,
          }))
        }
      />
    </div>
  );
}
