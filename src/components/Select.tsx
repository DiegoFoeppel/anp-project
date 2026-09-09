import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";

export function Select({ data, nome, onSelect, value }) {
  return (
    <Combobox
      items={data}
      value={value}
      onValueChange={(value) => {
        onSelect(value);
      }}
    >
      <ComboboxInput placeholder={nome} showClear />
      <ComboboxContent>
        <ComboboxEmpty>Nenhum item encontrado.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem
              key={item}
              value={item}
              onSelect={(currentValue) => {
                console.log("current value", currentValue);
                onSelect(currentValue);
              }}
            >
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
