import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navegacion from './Componentes/Navegacion';
import TareaProvider from './Provider/TareaProvider';

export default function App() {
  return (

    <TareaProvider>
        <Navegacion></Navegacion>
    </TareaProvider>
    
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
