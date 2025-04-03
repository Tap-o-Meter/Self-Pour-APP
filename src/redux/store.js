import actions from './actions';
import {createStore} from 'redux';
import {combineReducers} from 'redux';
import {socket, connectSocket, setUpSocket} from '../config/socket';
import beerReducer from './reducers/beerReducer';
import userReducer from './reducers/userReducer';

var Store;

export default {
  configureStore: initial => {
    const reducers = combineReducers({
      beerReducer,
      userReducer,
    });
    const store = createStore(reducers, initial);
    Store = store;
    return store;
  },
  currentStore: () => store,
};

const setUpSocketHandlers = () => {
  if (!socket) {
    console.log('Socket not initialized');
    return;
  }
  socket.on('connect', () => {
    console.log('Socket connected mdfk');
    // socket.emit('setUserSocket', Store.getState().account.user._id);
  });
  
  socket.on('chat message', msg => {
    // console.log(msg.kegs);
    //socket.emit('setUserSocket', Store.getState().account.user._id);
  });
  
  socket.on('sync data', msg => {
    // console.log(msg.kegs);
    Store.dispatch(actions.syncData(msg));
    //socket.emit('setUserSocket', Store.getState().account.user._id);
  });
  socket.on('Linelist', deviceList => {
    console.log('List updated');
    // console.warn(deviceList);
    Store.dispatch(actions.syncData(deviceList));
    // Store.dispatch(actions.updateDeviceList(deviceList.lines));
  });
  
  // socket.on('updated_pour_status', msg => {
  
  //   const {lineId, pouredVolume} = msg;
  //   if (lineId == 'ID_PREESTABLECIDO') {
  //    Store.dispatch(actions.updatePourStatus(pouredVolume,lineId))
  //   };
  // });
  
  // socket.on('validated user', msg => {
  //   console.warn(msg.confirmation == "success")
  //   if(msg.confirmation == "success") Store.dispatch(actions.logIn(msg.data))
  // });
  
  socket.io.on('error', error => {
    console.log(error);
  });
}
// xHandlers();

const initSocket = (url) => {
  setUpSocket(url).then(() => {
    // console.log('Socket connected');
    setUpSocketHandlers();
  });
};

export {socket, initSocket};

