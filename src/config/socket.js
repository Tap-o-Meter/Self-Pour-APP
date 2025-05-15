import AsyncStorage from '@react-native-async-storage/async-storage';
import io from 'socket.io-client';

import Zeroconf from 'react-native-zeroconf';

const zeroconf = new Zeroconf();

zeroconf.on('start', () => {
    console.log('Escaneo iniciado');
  });

zeroconf.on('resolved', service => {
  console.log('Servicio descubierto:', service);

  if (service.host === 'tom-server.local.') {
    console.log('La IP de hola.local es:', service.addresses[0]);
    zeroconf.stop(); // Si ya obtuviste la IP, puedes detener el escaneo.
  }
});

zeroconf.on('found', service => {
    console.log('Servicio encontrado:', service);
    }
);

// Manejar errores
zeroconf.on('error', err => {
  console.log('Zero conf Error:', err);
});

zeroconf.on('stop', () => {
    console.log('Escaneo detenido');
    });

// Iniciar el escaneo
// Comienza a escanear servicios
zeroconf.scan('http', 'tcp', 'local.')
// zeroconf.scan(undefined, undefined, undefined, 'DNSSD');




// URL por defecto
const default_url = 'http://192.168.1.59:3001';
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
  return default_url;
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
    const finalUrl = newUrl || await loadSocketUrl() || default_url;
    console.log(`Conectando a ${finalUrl}`);
    
    connectSocket(finalUrl);

    return socket;
}
