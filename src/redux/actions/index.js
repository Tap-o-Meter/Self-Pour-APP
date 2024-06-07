import Beer from './beer';
import User from './user';
import { UPDATE_LIST, REQUES_LIST, UPDATE_POUR_STATUS} from './types';

export default {
  ...Beer,
  ...User,
  updateDeviceList: (deviceList) => {
    console.log('updateDeviceList');
    return {
      type: UPDATE_LIST,
      data: deviceList,
    };
  },

  requestDeviceList: (socket) => {
    return {
      type: REQUES_LIST,
      socket: socket,
    };
  },

  updatePourStatus: (pouredVolume,lineId) =>{ 

    return {
      type: UPDATE_POUR_STATUS,
      data: pouredVolume
    }
  }
};
