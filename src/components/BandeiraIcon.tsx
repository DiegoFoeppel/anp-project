import { FuelIcon } from "lucide-react";

import {
  shellLogo,
  ipirangaLogo,
  petrobrasLogo,
  aleLogo,
  spLogo,
} from "../helpers/logos";

export const BANDEIRA_LOGOS: Record<string, string> = {
  RAIZEN: shellLogo,
  IPIRANGA: ipirangaLogo,
  VIBRA: petrobrasLogo,
  ALE: aleLogo,
  SP: spLogo,
};

const BandeiraIcon = ({ bandeira, distribuidora }) => {
  const logo = distribuidora.split(" ")[0];
  const res = bandeira ? bandeira : logo;

  if (BANDEIRA_LOGOS[res]) {
    return (
      <img
        src={BANDEIRA_LOGOS[res]}
        alt='Logo da marca'
        className='size-4.5 rounded-full object-cover'
      />
    );
  }

  return <FuelIcon size={18} />;
};

export default BandeiraIcon;
