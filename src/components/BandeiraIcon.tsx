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

const BandeiraIcon = ({ bandeira }) => {
  if (BANDEIRA_LOGOS[bandeira]) {
    return (
      <img
        src={BANDEIRA_LOGOS[bandeira]}
        alt='Logo da marca'
        className='size-9 rounded-full object-cover'
      />
    );
  }

  return <FuelIcon size={18} />;
};

export default BandeiraIcon;
