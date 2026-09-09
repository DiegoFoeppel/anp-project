import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useState } from "react";

type Tabs = "cidade" | "cnpj";

export function SearchTabs({}) {
  const [activeTab, setActiveTab] = useState<Tabs>("cidade");
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const query = e.target.value;
    const cnpjLimpo = query.replace(/\D/g, "");
    setQuery(cnpjLimpo);
  };

  console.log("uqr", query);

  return (
    <Tabs
      defaultValue='cidade'
      className='mx-4'
      value={activeTab}
      onValueChange={setActiveTab}
    >
      <TabsList>
        <TabsTrigger value='cidade'>Postos da Cidade</TabsTrigger>
        <TabsTrigger value='cnpj'>CNPJ</TabsTrigger>
      </TabsList>
      <TabsContent value='cidade'>
        <div className=''>
          <Label htmlFor='municipio'>Município</Label>
          <Input
            id='municipio'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </TabsContent>
      <TabsContent value='cnpj'>
        <div className=''>
          <Label htmlFor='cnpj'>CNPJ</Label>
          <Input id='cnpj' value={query} onChange={(e) => handleChange(e)} />
        </div>
      </TabsContent>
    </Tabs>
  );
}
