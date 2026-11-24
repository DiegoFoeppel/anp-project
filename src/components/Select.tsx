import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// const items = [
//   { label: "Select a fruit", value: null },
//   { label: "Apple", value: "apple" },
//   { label: "Banana", value: "banana" },
//   { label: "Blueberry", value: "blueberry" },
// ];

export function SelectInvalid({ data, nome, onSelect, value }) {
  return (
    <Field className='w-full mb-2 p-0'>
      <FieldLabel>{nome}</FieldLabel>
      <Select
        value={value}
        onValueChange={(currentValue) => {
          onSelect(currentValue);
        }}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent alignItemWithTrigger={false}>
          <SelectGroup>
            {data.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </Field>
  );
}

export function SelectCombo({ data, nome, onSelect, value }) {
  return (
    <>
      <Combobox
        items={data}
        value={value}
        onValueChange={(currentValue) => {
          onSelect(currentValue);
        }}
      >
        <ComboboxInput placeholder={nome} showClear />
        <ComboboxContent>
          <ComboboxEmpty>Nenhum item encontrado.</ComboboxEmpty>
          <ComboboxList>
            {(item) => (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </>
  );
}
