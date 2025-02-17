import { View, Text, FlatList, Button, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { useContextTarea } from '../Provider/TareaProvider';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
  const navigation = useNavigation();
  const { tarea, getTarea, deleteTarea, setEditingTarea } = useContextTarea();

  useEffect(() => {
    getTarea();
  }, []);

  return (
    <View style={style.container}>
      <FlatList
        data={tarea}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={style.tareaContainer}>
            <Text style={style.tarea}>{item.descripcion}</Text>
            <View style={style.buttonContainer}>
              <TouchableOpacity
                style={style.buttonEdit}
                onPress={() => {
                  setEditingTarea(item);
                  navigation.navigate('Agregar Tarea' as never);
                }}
              >
                <Text style={style.buttonText}>Editar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={style.buttonDelete}
                onPress={() => deleteTarea(item.id)}
              >
                <Text style={style.buttonText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <Button title='Refrescar tareas' onPress={getTarea} />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  tareaContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tarea: {
    fontSize: 18,
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  buttonEdit: {
    backgroundColor: 'blue',
    padding: 8,
    borderRadius: 5,
  },
  buttonDelete: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
