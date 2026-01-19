/**
 * Degradados armónicos para cada tipo de Pokémon
 * Cada gradiente usa 3 colores del mismo tono/familia
 * Formato: [color-inicio, color-medio, color-fin]
 *
 * Los colores base están basados en los colores oficiales más utilizados
 * por la comunidad de desarrollo de apps Pokémon
 */

export const pokemonTypeGradients: Record<string, [string, string, string]> = {
  // Verde vibrante → Verde medio → Verde oscuro
  grass: ["#7AC74C", "#5FA83C", "#4A8C2F"],
  // Naranja fuego → Naranja oscuro → Rojo fuego
  fire: ["#EE8130", "#E66B1F", "#D95514"],
  // Azul agua claro → Azul agua medio → Azul agua oscuro
  water: ["#6390F0", "#4A7AD6", "#3264C4"],
  // Amarillo eléctrico → Amarillo dorado → Amarillo oscuro
  electric: ["#F7D02C", "#E6BE1C", "#D4A814"],
  // Verde lima → Verde oliva → Verde oscuro
  bug: ["#A6B91A", "#8FA314", "#788C10"],
  // Beige claro → Beige medio → Marrón claro
  normal: ["#A8A77A", "#948F68", "#7D7857"],
  // Púrpura → Púrpura oscuro → Púrpura intenso
  poison: ["#A33EA1", "#8F2D8E", "#7A1E7B"],
  // Amarillo tierra → Ocre → Marrón tierra
  ground: ["#E2BF65", "#D4A84E", "#C1923B"],
  // Rosa claro → Rosa medio → Rosa oscuro
  fairy: ["#D685AD", "#C86F9B", "#B85A89"],
  // Rojo intenso → Rojo oscuro → Rojo profundo
  fighting: ["#C22E28", "#A82420", "#8E1A18"],
  // Rosa intenso → Rosa medio → Rosa oscuro
  psychic: ["#F95587", "#E5416F", "#D12F5B"],
  // Amarillo dorado → Ocre → Marrón piedra
  rock: ["#B6A136", "#A18E2A", "#8C7B1F"],
  // Púrpura oscuro → Púrpura profundo → Índigo
  ghost: ["#735797", "#614782", "#51376D"],
  // Cian claro → Cian medio → Turquesa
  ice: ["#96D9D6", "#7CC5C2", "#63B1AE"],
  // Índigo brillante → Púrpura índigo → Púrpura oscuro
  dragon: ["#6F35FC", "#5E26E0", "#4E18C4"],
  // Marrón → Marrón oscuro → Marrón profundo
  dark: ["#705746", "#5E4638", "#4D362A"],
  // Gris acero → Gris medio → Gris oscuro
  steel: ["#B7B7CE", "#A1A1B8", "#8B8BA2"],
  // Lila claro → Lila medio → Lila oscuro
  flying: ["#A98FF3", "#957ADF", "#8165CB"],
};
