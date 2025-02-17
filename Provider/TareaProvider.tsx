import { View, Text, Alert } from 'react-native'
import React, { ReactNode, useContext, useState } from 'react'
import { ContextTarea } from '../Context/ContextTarea'
import { Tarea } from '../Modelos/Tarea'
import { useNavigation } from '@react-navigation/native'


interface ViewRect{
    children: ReactNode
}
export default function TareaProvider({children}:ViewRect) {

  const [tarea,setTarea] = useState<Tarea[]> ([]);
  const [texto, setTexto] =useState('');
  const [tareaEditar, setTareaEditar]= useState<Tarea>({id:0,descripcion:''})

 function agregarTarea(text:string){

    if(!text.trim()){
      Alert.alert('Error','El campo no puede quedar vacio')
      return
    }

    try {

      let response;
      //se guarda
      if(tareaEditar.id!=0){
        const nuevaTarea= {descripcion:text}

        response= fetch('http://localhost:5000/tarea',{
          method:'POST',
          headers:{
             'Content-Type':'application/json'
          },
          body:JSON.stringify(nuevaTarea)
        })
      }
      else{
        //se actualizada

        const nuevaTarea= {id:tareaEditar.id,descripcion:text}

        response = fetch('http://localhost:5000/tarea',{
          method:'PUT',
          headers:{
             'Content-Type':'application/json'
          },
          body:JSON.stringify(nuevaTarea)
        })
      }
    

      if(!response){
        Alert.alert('Ocurrio un error')
        return
      }

      Alert.alert('Agregado exitosamente')

      
    } catch (error) {
      
    }
 }

   const getTarea = async () =>{
 
     try {
       
       const response = await fetch('http://localhost:5000/tarea',{
         method:'GET',
         headers:{
           'Content-Type':'application/json'
         }
        })
 
        const respuestaTarea= await response.json()
        
        setTarea(respuestaTarea)
 
     } catch (error) {
       Alert.alert('Error','Ocurrio un error ' + error)
     }
    
 
   }

   const deleteTarea = async (id:number) => {
    try {
      await fetch(`http://localhost:5000/tarea/${id}`, { method: 'DELETE' });
      getTarea(); // Recargar la lista después de eliminar
    } catch (error) {
      console.error('Error al eliminar tarea:', error);
    }
  };
  
  const setEditingTarea = (tarea:Tarea) => {
    setTareaEditar(tarea); // Guardar la tarea seleccionada en el contexto
    setTexto(tarea.descripcion)
  };
  
  return (
   <ContextTarea.Provider value={{tarea,agregarTarea,setTarea,
                          getTarea,deleteTarea,setEditingTarea,
                          texto,setTexto}}>
    {children}
   </ContextTarea.Provider>
  )
}

export const useContextTarea =()=>{
    return useContext(ContextTarea)
}