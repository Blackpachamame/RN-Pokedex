import { pokemonTypeGradients } from "./pokemonGradients";

/**
 * Función helper para obtener el degradado de un tipo
 * Si el tipo no existe, devuelve un degradado gris neutro
 */
export function getTypeGradient(type: string): [string, string, string] {
  return pokemonTypeGradients[type.toLowerCase()] || ["#A8A77A", "#948F68", "#7D7857"];
}

/**
 * Función para obtener degradado cuando hay múltiples tipos
 * Usa el color primario del primer tipo y termina con el segundo tipo
 */
export function getMultiTypeGradient(types: string[]): [string, string, string] {
  if (types.length === 0) {
    return ["#A8A77A", "#948F68", "#7D7857"]; // neutral
  }

  if (types.length === 1) {
    return getTypeGradient(types[0]);
  }

  // Para pokémon con 2 tipos: mezclar ambos degradados
  const [color1Start] = pokemonTypeGradients[types[0].toLowerCase()] || ["#A8A77A"];
  const [, , color2End] = pokemonTypeGradients[types[1].toLowerCase()] || ["#7D7857"];

  // Crear un color intermedio mezclando ambos
  const midColor = blendColors(color1Start, color2End, 0.5);

  return [color1Start, midColor, color2End];
}

/**
 * Helper para mezclar dos colores hexadecimales
 */
function blendColors(color1: string, color2: string, ratio: number): string {
  const hex = (color: string) => parseInt(color.replace("#", ""), 16);
  const r1 = (hex(color1) >> 16) & 0xff;
  const g1 = (hex(color1) >> 8) & 0xff;
  const b1 = hex(color1) & 0xff;

  const r2 = (hex(color2) >> 16) & 0xff;
  const g2 = (hex(color2) >> 8) & 0xff;
  const b2 = hex(color2) & 0xff;

  const r = Math.round(r1 * (1 - ratio) + r2 * ratio);
  const g = Math.round(g1 * (1 - ratio) + g2 * ratio);
  const b = Math.round(b1 * (1 - ratio) + b2 * ratio);

  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}
