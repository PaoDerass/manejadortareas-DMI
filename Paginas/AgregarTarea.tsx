import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import React, { useEffect } from 'react';
import { useContextTarea } from '../Provider/TareaProvider';
import { useNavigation } from '@react-navigation/native';

export default function AgregarTarea() {
  const navegacion = useNavigation();
  const { agregarTarea, actualizarTarea, getTarea, texto, setTexto, tarea, setEditingTarea } = useContextTarea();

  useEffect(() => {
    if (tarea) {
      setTexto(tarea.descripcion);
    }
  }, [tarea]);

  function guardarTarea() {
    if (tarea) {
      actualizarTarea(tarea.id, texto);
      setEditingTarea(null);
    } else {
      agregarTarea(texto);
    }
    setTexto('');
    getTarea();
    navegacion.navigate('Home' as never);
  }

  return (
    <View style={style.container}>
      <Text>{tarea ? "Editar tarea" : "Agregar tarea"}</Text>
      <TextInput
        placeholder="Descripción de la tarea"
        value={texto}
        onChangeText={setTexto}
        style={style.input}
      />
      <Button title={tarea ? "Actualizar Tarea" : "Agregar Tarea"} onPress={guardarTarea} />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'blue',
    padding: 10,
    marginBottom: 5,
  },
});
