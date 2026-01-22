import { TypeBadge } from "@/components/TypeBadge/TypeBadge";
import { EvolutionChain } from "@/types/pokemon";
import { ArrowRight, LucideIcon, MoveVertical, Weight } from "lucide-react-native";
import { Image, Text, View } from "react-native";
import styles from "./about.styles";

type Props = {
  pokemon: {
    description: string;
    height: number;
    weight: number;
    abilities: string[];
    category: string;
    weaknesses: string[];
    evolutionChain: EvolutionChain[];
  };
  currentPokemonId: number;
};

export default function AboutTab({ pokemon, currentPokemonId }: Props) {
  const { description, height, weight, abilities, category, weaknesses, evolutionChain } = pokemon;

  return (
    <View style={styles.container}>
      {/* Descripción */}
      {description && (
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>{description}</Text>
        </View>
      )}

      {/* Pokédex Data Grid */}
      <View style={styles.dataGrid}>
        {/* Height y Weight en una fila */}
        <View style={styles.gridRow}>
          <DataCard label="Weight" value={`${(weight / 10).toFixed(1)} kg`} icon={Weight} />
          <DataCard label="Height" value={`${(height / 10).toFixed(1)} m`} icon={MoveVertical} />
        </View>
      </View>
      <View style={styles.separator} />
      {/* Category */}
      {category && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Category</Text>
          <Text style={styles.categoryText}>{category}</Text>
        </View>
      )}
      <View style={styles.separator} />
      {/* Abilities */}
      {abilities.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Abilities</Text>
          <Text style={styles.abilitiesText}>
            {abilities
              .map((ability) =>
                ability
                  .split("-")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" "),
              )
              .join(", ")}
          </Text>
        </View>
      )}
      <View style={styles.separator} />
      {/* Weaknesses */}
      {weaknesses.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Weaknesses</Text>
          <View style={styles.weaknessesContainer}>
            {weaknesses.map((weakness) => (
              <TypeBadge key={weakness} type={weakness} extend={true} />
            ))}
          </View>
        </View>
      )}

      <View style={styles.separator} />
      {/* Evolutions */}
      {evolutionChain.length > 1 && (
        <>
          <View style={styles.separator} />
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Evolution Chain</Text>
            <EvolutionChainView evolutions={evolutionChain} currentPokemonId={currentPokemonId} />
          </View>
        </>
      )}
    </View>
  );
}

// Componente para cards de datos (Weight/Height)
function DataCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: LucideIcon;
}) {
  return (
    <View style={styles.dataCard}>
      <View>
        <Text style={styles.dataLabel}>{label}</Text>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
          <Icon size={18} color="#64748B" />
          <Text style={styles.dataValue}>{value}</Text>
        </View>
      </View>
    </View>
  );
}

// Componente para mostrar la cadena de evolución
function EvolutionChainView({
  evolutions,
  currentPokemonId,
}: {
  evolutions: EvolutionChain[];
  currentPokemonId: number;
}) {
  return (
    <View style={styles.evolutionChain}>
      {evolutions.map((evolution, index) => {
        const isCurrentPokemon = evolution.id === currentPokemonId;
        const isLastItem = index === evolutions.length - 1;

        return (
          <View key={evolution.id} style={styles.evolutionRow}>
            {/* Card de evolución */}
            <View style={[styles.evolutionCard, isCurrentPokemon && styles.evolutionCardCurrent]}>
              {/* Imagen */}
              <Image
                source={{ uri: evolution.image }}
                style={styles.evolutionImage}
                resizeMode="contain"
              />

              {/* Info */}
              <View style={styles.evolutionInfo}>
                <Text style={styles.evolutionNumber}>
                  #{evolution.id.toString().padStart(3, "0")}
                </Text>
                <Text style={styles.evolutionName}>
                  {evolution.name.charAt(0).toUpperCase() + evolution.name.slice(1)}
                </Text>
                {evolution.minLevel && (
                  <Text style={styles.evolutionLevel}>Lv. {evolution.minLevel}</Text>
                )}
              </View>
            </View>

            {/* Flecha (excepto en el último) */}
            {!isLastItem && (
              <View style={styles.evolutionArrow}>
                <ArrowRight size={24} color="#94A3B8" strokeWidth={2.5} />
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
}
