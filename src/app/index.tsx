// src/app/index.tsx
import React, { useState, useMemo } from "react";
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

import { styles } from "../styles/appStyles";
import { POKEMON_DATA } from "../data/pokemon";

const usePokemonSearch = (initialData: any[]) => {
  const [query, setQuery] = useState("");
  const filteredData = useMemo(() => {
    if (!query) return initialData;
    const lower = query.toLowerCase();
    return initialData.filter(
      (poke) =>
        poke.name.toLowerCase().includes(lower) ||
        poke.gen.toLowerCase().includes(lower) ||
        poke.type.toLowerCase().includes(lower),
    );
  }, [query, initialData]);
  return { query, setQuery, filteredData };
};

// Reusable UI Components
const AppButton = ({ title, onPress, backgroundColor = "#D32F2F" }: any) => (
  <TouchableOpacity
    style={[styles.button, { backgroundColor }]}
    onPress={onPress}
  >
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const SearchInput = ({ value, onChangeText, placeholder }: any) => (
  <TextInput
    style={styles.textInput}
    placeholder={placeholder}
    value={value}
    onChangeText={onChangeText}
    placeholderTextColor="#888"
  />
);

const Badge = ({ text, bgColor, textColor }: any) => (
  <View style={[styles.badgeContainer, { backgroundColor: bgColor }]}>
    <Text style={[styles.badgeText, { color: textColor }]}>{text}</Text>
  </View>
);

// NEW COMPONENT: Stat Bar
const StatBar = ({ label, value }: any) => {
  // Assuming a max stat of 255 (actual Pokémon maximum) for the bar width percentage
  const fillPercentage = (value / 255) * 100;
  // Change color based on stat height (Green for high, Orange for mid, Red for low)
  const barColor = value > 110 ? "#48BB78" : value > 80 ? "#ED8936" : "#F56565";

  return (
    <View style={styles.statRow}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
      <View style={styles.statBarBg}>
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

const PokemonCard = ({ name, gen, type, image, onPress }: any) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <Image source={{ uri: image }} style={styles.cardImage} />
    <View style={styles.cardContent}>
      <View style={styles.cardHeader}>
        <Text style={styles.pokemonName}>{name}</Text>
        <Badge text={gen} bgColor="#E0E0E0" textColor="#333" />
      </View>
      <Text style={styles.pokemonType}>Type: {type}</Text>
    </View>
  </TouchableOpacity>
);

const HomeScreen = ({ data, searchQuery, onSearch, onSelectPokemon }: any) => (
  <View style={styles.screenContainer}>
    <Text style={styles.headerTitle}>Pokédex: Legendaries</Text>
    <SearchInput
      placeholder="Search by name, gen, or type..."
      value={searchQuery}
      onChangeText={onSearch}
    />
    <ScrollView
      contentContainerStyle={styles.scrollList}
      showsVerticalScrollIndicator={false}
    >
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
      {data.length === 0 && (
        <Text style={styles.emptyText}>No legendary Pokémon found.</Text>
      )}
    </ScrollView>
  </View>
);

const DetailScreen = ({ pokemon, onBack }: any) => (
  <View style={styles.screenContainer}>
    <View style={styles.navigationRow}>
      <AppButton title="← Back to List" onPress={onBack} />
    </View>

    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.detailCard}>
        <Image source={{ uri: pokemon.imageUrl }} style={styles.detailImage} />
        <Text style={styles.detailName}>{pokemon.name}</Text>
        <View style={styles.badgeRow}>
          <Badge text={pokemon.gen} bgColor="#E0E0E0" textColor="#333" />
          <Badge text={pokemon.type} bgColor="#FFE0B2" textColor="#E65100" />
        </View>

        <Text style={styles.sectionHeader}>Pokédex Entry</Text>
        <Text style={styles.descriptionText}>{pokemon.desc}</Text>

        <Text style={styles.sectionHeader}>Base Stats</Text>
        <View style={styles.statsContainer}>
          {Object.entries(pokemon.stats).map(([statName, statValue]: any) => (
            <StatBar key={statName} label={statName} value={statValue} />
          ))}
        </View>
      </View>
    </ScrollView>
  </View>
);

export default function Index() {
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const { query, setQuery, filteredData } = usePokemonSearch(POKEMON_DATA);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {selectedPokemon ? (
        <DetailScreen
          pokemon={selectedPokemon}
          onBack={() => setSelectedPokemon(null)}
        />
      ) : (
        <HomeScreen
          data={filteredData}
          searchQuery={query}
          onSearch={setQuery}
          onSelectPokemon={setSelectedPokemon}
        />
      )}
    </SafeAreaView>
  );
}
