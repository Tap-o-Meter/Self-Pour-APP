import io from 'socket.io-client';
// const url = 'http://192.168.0.171:3000/';
const url = 'http://192.168.1.79:3000/';
// const url = 'https://chikilla-real-time-taps.herokuapp.com/';
const socket = io(url);
socket.disconnect();
export default socket;
