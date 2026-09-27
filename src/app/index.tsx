// ==========================================
// 1. IMPORTS
// ==========================================
// React hooks for managing state and optimizing performance
import React, { useState, useMemo } from "react";
// Core UI components from React Native used to build the interface
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Image,
} from "react-native";

// External files containing our separated design (styles) and hardcoded database (POKEMON_DATA)
import { styles } from "../styles/appStyles";
import { POKEMON_DATA } from "../data/pokemon";

// ==========================================
// 2. CUSTOM HOOKS (BUSINESS LOGIC)
// ==========================================
// This function handles the search bar logic so it doesn't clutter our UI components.
const usePokemonSearch = (initialData: any[]) => {
  // 'query' stores what the user types into the search bar.
  const [query, setQuery] = useState("");

  // 'filteredData' recalculates the list only when 'query' or 'initialData' changes.
  const filteredData = useMemo(() => {
    // If the search bar is empty, show all Pokémon.
    if (!query) return initialData;

    // Convert the search text to lowercase to make the search case-insensitive.
    const lower = query.toLowerCase();

    // Filter the database by matching the typed text against name, gen, or type.
    return initialData.filter(
      (poke) =>
        poke.name.toLowerCase().includes(lower) ||
        poke.gen.toLowerCase().includes(lower) ||
        poke.type.toLowerCase().includes(lower),
    );
  }, [query, initialData]);

  // Returns the current search text, the function to update it, and the resulting filtered list.
  return { query, setQuery, filteredData };
};

// ==========================================
// 3. REUSABLE UI COMPONENTS
// ==========================================

// -- Custom Button --
// Used for the "Back to List" navigation. 'TouchableOpacity' makes it dim when pressed.
const AppButton = ({ title, onPress, backgroundColor = "#D32F2F" }: any) => (
  <TouchableOpacity
    style={[styles.button, { backgroundColor }]}
    onPress={onPress}
  >
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

// -- Search Input --
// The text box at the top of the Home Screen used for filtering the list.
const SearchInput = ({ value, onChangeText, placeholder }: any) => (
  <TextInput
    style={styles.textInput}
    placeholder={placeholder}
    value={value}
    onChangeText={onChangeText}
    placeholderTextColor="#888"
  />
);

// -- Tag / Badge --
// Small colored pills used to display the Generation and Elemental Type of the Pokémon.
const Badge = ({ text, bgColor, textColor }: any) => (
  <View style={[styles.badgeContainer, { backgroundColor: bgColor }]}>
    <Text style={[styles.badgeText, { color: textColor }]}>{text}</Text>
  </View>
);

// -- Stat Progress Bar --
// A dynamic bar that changes width and color based on the Pokémon's specific stat number.
const StatBar = ({ label, value }: any) => {
  // Calculates how wide the colored bar should be (assuming 255 is the max possible stat).
  const fillPercentage = (value / 255) * 100;

  // Decides the color of the bar: Green if > 110, Orange if > 80, otherwise Red.
  const barColor = value > 110 ? "#48BB78" : value > 80 ? "#ED8936" : "#F56565";

  return (
    <View style={styles.statRow}>
      {/* Stat Name (e.g., HP, Atk) */}
      <Text style={styles.statLabel}>{label}</Text>
      {/* Exact Number (e.g., 90) */}
      <Text style={styles.statValue}>{value}</Text>

      {/* The background track for the bar */}
      <View style={styles.statBarBg}>
        {/* The actual colored fill that represents the stat visually */}
        <View
          style={[
            styles.statBarFill,
            { width: `${fillPercentage}%`, backgroundColor: barColor },
          ]}
        />
      </View>
    </View>
  );
};

// -- Main List Card --
// The clickable rectangle for each Pokémon shown on the Home Screen.
const PokemonCard = ({ name, gen, type, image, onPress }: any) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    {/* Pokémon Thumbnail Image */}
    <Image source={{ uri: image }} style={styles.cardImage} />

    <View style={styles.cardContent}>
      <View style={styles.cardHeader}>
        {/* Pokémon Name and Gen Badge */}
        <Text style={styles.pokemonName}>{name}</Text>
        <Badge text={gen} bgColor="#E0E0E0" textColor="#333" />
      </View>
      {/* Pokémon Type */}
      <Text style={styles.pokemonType}>Type: {type}</Text>
    </View>
  </TouchableOpacity>
);

// ==========================================
// 4. MAIN SCREENS (VIEWS)
// ==========================================

// -- Home Screen --
// Displays the search bar and the scrolling list of all Pokémon.
const HomeScreen = ({ data, searchQuery, onSearch, onSelectPokemon }: any) => (
  <View style={styles.screenContainer}>
    {/* Main Title */}
    <Text style={styles.headerTitle}>Pokédex: Legendaries</Text>

    {/* Search Box Component */}
    <SearchInput
      placeholder="Search by name, gen, or type..."
      value={searchQuery}
      onChangeText={onSearch}
    />

    {/* Scrollable Container for the list */}
    <ScrollView
      contentContainerStyle={styles.scrollList}
      showsVerticalScrollIndicator={false}
    >
      {/* Loop through the filtered data array and render a PokemonCard for each item */}
      {data.map((item: any) => (
        <PokemonCard
          key={item.id}
          name={item.name}
          gen={item.gen}
          type={item.type}
          image={item.imageUrl}
          onPress={() => onSelectPokemon(item)}
        />
      ))}

      {/* Fallback text if the search query doesn't match any Pokémon */}
      {data.length === 0 && (
        <Text style={styles.emptyText}>No legendary Pokémon found.</Text>
      )}
    </ScrollView>
  </View>
);

// -- Detail Screen --
// Displays the full information, large image, and stats for a single clicked Pokémon.
const DetailScreen = ({ pokemon, onBack }: any) => (
  <View style={styles.screenContainer}>
    {/* Top Navigation Row holding the Back Button */}
    <View style={styles.navigationRow}>
      <AppButton title="← Back to List" onPress={onBack} />
    </View>

    {/* Scrollable Container for the details, in case it overflows on small screens */}
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.detailCard}>
        {/* Large Pokémon Image */}
        <Image source={{ uri: pokemon.imageUrl }} style={styles.detailImage} />

        {/* Name and Badges */}
        <Text style={styles.detailName}>{pokemon.name}</Text>
        <View style={styles.badgeRow}>
          <Badge text={pokemon.gen} bgColor="#E0E0E0" textColor="#333" />
          <Badge text={pokemon.type} bgColor="#FFE0B2" textColor="#E65100" />
        </View>

        {/* Text Description / Lore */}
        <Text style={styles.sectionHeader}>Pokédex Entry</Text>
        <Text style={styles.descriptionText}>{pokemon.desc}</Text>

        {/* Base Stats Visualization */}
        <Text style={styles.sectionHeader}>Base Stats</Text>
        <View style={styles.statsContainer}>
          {/* Object.entries turns the stats object { HP: 90, Atk: 85 } into an array so we can map over it */}
          {Object.entries(pokemon.stats).map(([statName, statValue]: any) => (
            <StatBar key={statName} label={statName} value={statValue} />
          ))}
        </View>
      </View>
    </ScrollView>
  </View>
);

// ==========================================
// 5. APP ENTRY POINT / ROUTER
// ==========================================
// This is the main function that runs when your app starts.
// It decides whether to show the Home Screen or the Detail Screen.
export default function Index() {
  // 'selectedPokemon' stores whichever Pokémon was clicked. If it is null, we are on the Home Screen.
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  // Call our custom hook to get the search state and filtered list.
  const { query, setQuery, filteredData } = usePokemonSearch(POKEMON_DATA);

  return (
    // SafeAreaView ensures content doesn't get covered by notches or status bars on modern phones.
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Conditional Rendering (Router Logic): 
          If selectedPokemon has data, render the DetailScreen. 
          Otherwise (:), render the HomeScreen. */}
      {selectedPokemon ? (
        <DetailScreen
          pokemon={selectedPokemon}
          onBack={() => setSelectedPokemon(null)} // Resets the state to null to go back
        />
      ) : (
        <HomeScreen
          data={filteredData}
          searchQuery={query}
          onSearch={setQuery}
          onSelectPokemon={setSelectedPokemon} // Updates state with clicked Pokémon
        />
      )}
    </SafeAreaView>
  );
}
