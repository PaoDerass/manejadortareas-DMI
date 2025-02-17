import { View, Text, Button, StyleSheet,TextInput } from 'react-native'
import React, { useState } from 'react'
import { useContextTarea } from '../Provider/TareaProvider'
import { useNavigation } from '@react-navigation/native'
import { Tarea } from '../Modelos/Tarea'

export default function AgregarTarea() {

  const navegacion = useNavigation()
 // const [texto, setTexto]= useState<string>('')
  const {agregarTarea,getTarea,texto,setTexto} = useContextTarea();


  function agregar(){
    agregarTarea(texto);
    setTexto('')
    getTarea()
    navegacion.navigate('Home' as never)
   

  }

  
  return (
    <View style={style.container}>
      <Text>Agregar tarea</Text>

     

      <TextInput
      placeholder='Agregar descripcion Tarea'
      value={texto}
      onChangeText={setTexto}
      style={style.input}
      >

      </TextInput>

      <Text>Agregar tarea</Text>



     <Button title='Agregar Tarea' onPress={()=>agregar()}></Button>
    </View>
  )
}

const style=StyleSheet.create({
  container:{
    flex:1,
    padding:20,
    justifyContent:'center'
  },
  input:{
    borderWidth:1,
    borderBlockColor:'blue',
    padding:10,
    marginBottom:5
  }
})