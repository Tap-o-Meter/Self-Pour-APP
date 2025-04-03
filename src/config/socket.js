// import io from 'socket.io-client';
// // const url = 'http://192.168.0.171:3000/';
// const url = 'http://192.168.1.79:3000/';
// // const url = 'https://chikilla-real-time-taps.herokuapp.com/';
// var socket = io(url);
// socket.disconnect();
// export default socket;


import io from 'socket.io-client';

export let socket = null;
export let url = 'http://192.168.1.182:3000';

export function connectSocket(newUrl) {
  // Desconectamos el socket anterior si existe
  if (socket) {
    socket.disconnect();
  }

  // Actualizamos la URL global
  url = newUrl;

  // Creamos una nueva instancia con la URL actualizada
  socket = io(url);

  return socket;
}

connectSocket(url);
socket.disconnect();