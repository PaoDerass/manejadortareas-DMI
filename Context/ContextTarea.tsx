import { createContext } from "react";
import { Tarea } from "../Modelos/Tarea";

export const ContextTarea= createContext({
    tarea: [] as Tarea[],
    setTarea: (tarea: Tarea[]) =>{},
    agregarTarea: (texto:string) =>{},
    getTarea: ()=>{},
    deleteTarea:(id:number)=>{},
    setEditingTarea:(tarea:Tarea)=>{},
    texto:'',
    setTexto:(texto:string)=>{}

})