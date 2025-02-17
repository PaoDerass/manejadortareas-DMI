import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { useContextTarea } from '../Provider/TareaProvider';

export default function Buscador() {
  const { tarea } = useContextTarea();
  const [search, setSearch] = useState('');
  const [filteredTareas, setFilteredTareas] = useState(tarea);

  const handleSearch = (text:string) => {
    setSearch(text);
    if (text) {
      const filtered = tarea.filter((t) =>
        t.descripcion.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredTareas(filtered);
    } else {
      setFilteredTareas(tarea);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Buscar tarea..."
        value={search}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredTareas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text style={styles.tarea}>{item.descripcion}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
  tarea: {
    fontSize: 18,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: 'black',
  },
});
