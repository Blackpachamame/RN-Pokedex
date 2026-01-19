import { FC } from "react";
import { SvgProps } from "react-native-svg";

import BugIcon from "@/assets/types/bug.svg";
import DarkIcon from "@/assets/types/dark.svg";
import DragonIcon from "@/assets/types/dragon.svg";
import ElectricIcon from "@/assets/types/electric.svg";
import FairyIcon from "@/assets/types/fairy.svg";
import FightingIcon from "@/assets/types/fighting.svg";
import FireIcon from "@/assets/types/fire.svg";
import FlyingIcon from "@/assets/types/flying.svg";
import GhostIcon from "@/assets/types/ghost.svg";
import GrassIcon from "@/assets/types/grass.svg";
import GroundIcon from "@/assets/types/ground.svg";
import IceIcon from "@/assets/types/ice.svg";
import NormalIcon from "@/assets/types/normal.svg";
import PoisonIcon from "@/assets/types/poison.svg";
import PsychicIcon from "@/assets/types/psychic.svg";
import RockIcon from "@/assets/types/rock.svg";
import SteelIcon from "@/assets/types/steel.svg";
import WaterIcon from "@/assets/types/water.svg";

export const pokemonTypeIcons: Record<string, FC<SvgProps>> = {
  fire: FireIcon,
  water: WaterIcon,
  grass: GrassIcon,
  electric: ElectricIcon,
  bug: BugIcon,
  normal: NormalIcon,
  poison: PoisonIcon,
  ground: GroundIcon,
  fairy: FairyIcon,
  fighting: FightingIcon,
  psychic: PsychicIcon,
  rock: RockIcon,
  ghost: GhostIcon,
  ice: IceIcon,
  dragon: DragonIcon,
  dark: DarkIcon,
  steel: SteelIcon,
  flying: FlyingIcon,
};
