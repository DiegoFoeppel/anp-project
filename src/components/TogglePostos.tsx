import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export function TogglePostos({ mode, setMode }) {
  return (
    <div className='flex items-center space-x-2'>
      <Switch id='postos-view' checked={mode} onCheckedChange={setMode} />
      <Label htmlFor='postos-view'>Postos com preços</Label>
    </div>
  );
}
