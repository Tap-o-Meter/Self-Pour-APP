import {ADD_BEER, DELETE_BEER, SYNC_DATA} from './types';
export default {
  addBeer: beer => {
    return {
      type: ADD_BEER,
      data: beer,
    };
  },
  deleteBeer: key => {
    return {
      type: DELETE_BEER,
      data: key,
    };
  },
  syncData: data => {
    return {
      type: SYNC_DATA,
      data,
    };
  },
};
