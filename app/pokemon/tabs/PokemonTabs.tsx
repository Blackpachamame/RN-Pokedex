import { useState } from "react";
import { View } from "react-native";
import PokemonTabButton from "./PokemonTabButton";
import styles from "./styles";
import POKEMON_TABS, { PokemonTabKey } from "./types";

export type PokemonTab = "about" | "stats" | "evolutions";

type Props = {
  activeTab: PokemonTab;
  onTabChange: (tab: PokemonTab) => void;
};

export default function PokemonTabs({ onTabChange }: Props) {
  const [activeTab, setActiveTab] = useState<PokemonTabKey>("about");

  const handleTabPress = (tab: PokemonTabKey) => {
    setActiveTab(tab);
    onTabChange(tab);
  };

  return (
    <View style={styles.tabsContainer}>
      {POKEMON_TABS.map(({ key, label }) => (
        <PokemonTabButton
          key={key}
          label={label}
          isActive={key === activeTab}
          onPress={() => handleTabPress(key)}
        />
      ))}
    </View>
  );
}
