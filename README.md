# 🎮 PokéKit - React Native App

Una aplicación móvil moderna para explorar el universo Pokémon, construida con React Native y PokeAPI. Permite navegar por más de 1,000 Pokémon con búsqueda en tiempo real, filtros por tipo, y detalles completos incluyendo estadísticas, movimientos y cadenas evolutivas.

---

## ✨ Características Principales

- **🔍 Búsqueda inteligente** - Búsqueda en tiempo real con debounce sobre 1,025 Pokémon
- **♾️ Scroll infinito** - Carga paginada progresiva para óptima performance
- **🎨 Filtros por tipo** - Filtra hasta por 2 tipos simultáneamente (18 tipos disponibles)
- **📊 Pantalla de detalles completa**
  - Información general (altura, peso, categoría, habilidades)
  - Estadísticas visualizadas con barras de progreso
  - Lista completa de movimientos
  - Cadena evolutiva con 3 layouts adaptativos (lineal, ramificada, simple)
- **🌙 Modo oscuro** - Sistema de temas con persistencia y detección automática del sistema
- **💀 Skeleton loaders** - Placeholders animados durante la carga (mejora UX percibida)
- **🔄 Pull-to-refresh** - Recarga manual de datos
- **🎯 Estados de UI** - Manejo completo de loading, error, y estados vacíos
- **⚡ Optimizaciones**
  - React.memo en componentes críticos
  - Deduplicación de datos
  - Manejo de race conditions en búsquedas concurrentes
  - Virtual lists con FlatList

---

## 🛠️ Stack Tecnológico

### Core
- **React Native** - Framework principal
- **Expo** - Desarrollo y build
- **TypeScript** - Type safety

### State Management & Data
- **Context API** - Manejo de estado global (tema)
- **Custom Hooks** - Lógica reutilizable (usePokemonList, usePokemonSearch, useTypeFilter)
- **AsyncStorage** - Persistencia local

### UI/UX
- **React Native Reanimated** - Animaciones de alto rendimiento
- **Expo Linear Gradient** - Gradientes en cards
- **Lucide React Native** - Sistema de iconos
- **React Native SVG** - Iconos de tipos personalizados
- **React Native Safe Area Context** - Manejo de safe areas

### Navigation
- **Expo Router** - Navegación file-based

### API
- **PokeAPI v2** - Fuente de datos oficial de Pokémon
- **Fetch API** - Requests HTTP nativos

---

## 🚀 Instalación y Uso

### Prerrequisitos

```bash
node >= 18.0.0
npm >= 9.0.0
```

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/pokekit-app.git
cd pokekit-app

# Instalar dependencias
npm install
```

### Desarrollo

```bash
# Iniciar el servidor de desarrollo
npm start

# Ejecutar en iOS (requiere macOS y Xcode)
npm run ios

# Ejecutar en Android (requiere Android Studio)
npm run android

# Ejecutar en web
npm run web
```

---

## 📁 Estructura del Proyecto

```
pokekit-app/
├── app/                      # Screens (Expo Router)
│   ├── index.tsx            # Pantalla principal (lista)
│   ├── pokemon/[id].tsx     # Pantalla de detalle
│   └── _layout.tsx          # Root layout con providers
├── components/              # Componentes reutilizables
│   ├── PokemonCard/         # Card de Pokémon
│   ├── SearchBar/           # Barra de búsqueda
│   ├── TypeFilters/         # Filtros por tipo
│   ├── TypeBadge/           # Badge de tipo
│   ├── Skeletons/           # Loaders animados
│   ├── EmptyStates/         # Estados vacíos
│   └── ThemeToggle/         # Botón de tema
├── context/                 # Context providers
│   └── ThemeContext.tsx     # Manejo de temas
├── hooks/                   # Custom hooks
│   ├── usePokemonList.ts    # Lista principal
│   ├── usePokemonSearch.ts  # Búsqueda
│   └── useTypeFilter.ts     # Filtros por tipo
├── services/                # API services
│   └── pokeapi.ts          # Cliente de PokeAPI
├── types/                   # TypeScript types
│   └── pokemon.ts          # Interfaces de Pokémon
└── utils/                   # Utilidades
    ├── themes.ts           # Paletas de color
    ├── pokemonColors.ts    # Colores por tipo
    └── useThemedStyles.ts  # Hook de estilos con tema
```

---

## 🎓 Aprendizajes Clave

### Optimización de Performance
Este proyecto me permitió profundizar en técnicas de optimización para apps con grandes volúmenes de datos. Implementé scroll infinito con paginación, deduplicación de items con Map, y manejo de race conditions en búsquedas concurrentes usando refs. También aprendí a usar React.memo estratégicamente y a optimizar FlatList con props como `removeClippedSubviews` y `windowSize`.

### Arquitectura Escalable
Desarrollé un sistema de custom hooks que separa la lógica de negocio de la UI, haciendo el código más testeable y mantenible. El sistema de temas con Context API + AsyncStorage me enseñó sobre persistencia y detección automática de preferencias del sistema. La estructura de componentes modulares permite reutilización y facilita el testing.

### UX Consciente
Implementar skeleton loaders en lugar de spinners genéricos mejoró significativamente la percepción de velocidad. El debounce en búsquedas y el manejo granular de estados (loading inicial vs loading more) demuestran atención al detalle en la experiencia del usuario.

---

## 🔮 Próximas Mejoras

- [ ] **Sistema de favoritos** - Guardar Pokémon favoritos con AsyncStorage
- [ ] **Comparador de Pokémon** - Comparar stats lado a lado (2-3 Pokémon)
- [ ] **Filtros avanzados** - Por generación, stats, habilidades
- [ ] **Offline mode** - Cache de Pokémon visitados con SQLite
- [ ] **Animaciones de transición** - Shared element transitions entre pantallas
- [ ] **Haptic feedback** - Vibraciones sutiles en interacciones
- [ ] **Testing** - Unit tests (Jest) + E2E (Detox)
- [ ] **i18n** - Soporte multiidioma (español, inglés, japonés)
- [ ] **Generación de imágenes compartibles** - Cards con stats para redes sociales

---

## 🙏 Agradecimientos

- [PokeAPI](https://pokeapi.co/) - API gratuita de datos de Pokémon

---

<div align="center">
  <p>Hecho con ❤️ y React Native</p>
  <p>⭐ Si te gustó el proyecto, dale una estrella en GitHub!</p>
</div>
