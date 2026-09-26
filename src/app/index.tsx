// src/app/index.tsx
import React, { useState, useMemo } from 'react';
import { Text, View, TextInput, TouchableOpacity, ScrollView, SafeAreaView, StatusBar } from 'react-native';

// Import data and styles using relative paths from the app folder
import { styles } from '../styles/appStyles';
import { POKEMON_DATA } from '../data/pokemon';

const usePokemonSearch = (initialData: any[]) => {
  const [query, setQuery] = useState('');
  const filteredData = useMemo(() => {
    if (!query) return initialData;
    const lower = query.toLowerCase();
    return initialData.filter((poke) => 
      poke.name.toLowerCase().includes(lower) || 
      poke.gen.toLowerCase().includes(lower) ||
      poke.type.toLowerCase().includes(lower)
    );
  }, [query, initialData]);
  return { query, setQuery, filteredData };
};

const AppButton = ({ title, onPress, backgroundColor = '#D32F2F' }: any) => (
  <TouchableOpacity style={[styles.button, { backgroundColor }]} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const SearchInput = ({ value, onChangeText, placeholder }: any) => (
  <TextInput style={styles.textInput} placeholder={placeholder} value={value} onChangeText={onChangeText} placeholderTextColor="#888" />
);

const Badge = ({ text, bgColor, textColor }: any) => (
  <View style={[styles.badgeContainer, { backgroundColor: bgColor }]}>
    <Text style={[styles.badgeText, { color: textColor }]}>{text}</Text>
  </View>
);

const PokemonCard = ({ name, gen, type, onPress }: any) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <View style={styles.cardHeader}>
      <Text style={styles.pokemonName}>{name}</Text>
      <Badge text={gen} bgColor="#E0E0E0" textColor="#333" />
    </View>
    <Text style={styles.pokemonType}>Type: {type}</Text>
  </TouchableOpacity>
);

const HomeScreen = ({ data, searchQuery, onSearch, onSelectPokemon }: any) => (
  <View style={styles.screenContainer}>
    <Text style={styles.headerTitle}>Pokédex: Legendaries</Text>
    <SearchInput placeholder="Search by name, gen, or type..." value={searchQuery} onChangeText={onSearch} />
    <ScrollView contentContainerStyle={styles.scrollList}>
      {data.map((item: any) => (
        <PokemonCard key={item.id} name={item.name} gen={item.gen} type={item.type} onPress={() => onSelectPokemon(item)} />
      ))}
      {data.length === 0 && <Text style={styles.emptyText}>No legendary Pokémon found.</Text>}
    </ScrollView>
  </View>
);

const DetailScreen = ({ pokemon, onBack }: any) => (
  <View style={styles.screenContainer}>
    <View style={styles.navigationRow}>
       <AppButton title="← Back to List" onPress={onBack} />
    </View>
    <View style={styles.detailCard}>
      <Text style={styles.detailName}>{pokemon.name}</Text>
      <View style={styles.badgeRow}>
        <Badge text={pokemon.gen} bgColor="#E0E0E0" textColor="#333" />
        <Badge text={pokemon.type} bgColor="#FFE0B2" textColor="#E65100" />
      </View>
      <Text style={styles.sectionHeader}>Pokédex Entry</Text>
      <Text style={styles.descriptionText}>{pokemon.desc}</Text>
    </View>
  </View>
);

export default function Index() {
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const { query, setQuery, filteredData } = usePokemonSearch(POKEMON_DATA);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {selectedPokemon ? (
        <DetailScreen pokemon={selectedPokemon} onBack={() => setSelectedPokemon(null)} />
      ) : (
        <HomeScreen data={filteredData} searchQuery={query} onSearch={setQuery} onSelectPokemon={setSelectedPokemon} />
      )}
    </SafeAreaView>
  );
}