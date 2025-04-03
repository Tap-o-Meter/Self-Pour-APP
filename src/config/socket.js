// import io from 'socket.io-client';

// export let socket = null;
// export let url = 'http://192.168.1.182:3000';

// export function connectSocket(newUrl) {
//   // Desconectamos el socket anterior si existe
//   if (socket) {
//     socket.disconnect();
//   }

//   // Actualizamos la URL global
//   url = newUrl;

//   // Creamos una nueva instancia con la URL actualizada
//   socket = io(url);

//   return socket;
// }

// connectSocket(url);
// socket.disconnect();

import AsyncStorage from '@react-native-async-storage/async-storage';
import io from 'socket.io-client';

// URL por defecto
const default_url = 'http://192.168.0.182:3000';
// Variable para la instancia del socket
export let socket = null;

// Función para cargar la URL almacenada o usar la por defecto
export async function loadSocketUrl() {
  try {
    const storedUrl = await AsyncStorage.getItem('socket_url');
    if (storedUrl) {
      return storedUrl;
    }
  } catch (error) {
    console.error("Error al cargar la URL almacenada:", error);
  }
  return url;
}

// Función para conectar el socket con la URL que se le pase
export function connectSocket(newUrl) {
  // Si ya existe un socket, desconéctalo
  if (socket) {
    socket.disconnect();
  }
  
  // Actualiza la URL global y crea una nueva instancia de socket
  socket = io(newUrl);

  socket.connect();
  
  // Una vez conectado, guarda la URL en AsyncStorage
  socket.once('connect', async () => {
    try {
      await AsyncStorage.setItem('socket_url', newUrl);
      console.log("Conexión exitosa, URL guardada:", newUrl);
    } catch (error) {
      console.error("Error al guardar la URL:", error);
    }
  });
  
  return socket;
}

export async function setUpSocket(newUrl) {
    const finalUrl = newUrl || await loadSocketUrl();
    console.log(`Conectando a ${finalUrl}`);
    
    connectSocket(finalUrl);

    return socket;
}

// init();
// socket.disconnect();


