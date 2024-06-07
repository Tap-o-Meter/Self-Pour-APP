import {ADD_BEER, DELETE_BEER, SYNC_DATA, REQUES_LIST, UPDATE_POUR_STATUS} from '../actions/types';

const initialState = {
  theresData: false,
  beers: [],
  kegs: [],
  lines: [],
  fullInfoLines:[],
  pouredVolume:0
};
const beerReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BEER:
      return {};
    case DELETE_BEER:
      return {};
    case UPDATE_POUR_STATUS:
      console.warn(`ahora si: ${action.data}`);
      state.pouredVolume = action.data;
      return {...state};
    case REQUES_LIST:
        action.socket.emit('worker connected');
        return state;
    case SYNC_DATA:
      const {beers,kegs,lines} = action.data;
      var fullDataHolder = lines.map(line => {
        const keg = kegs.find(keg => keg._id == line.idKeg)
        const beer = beers.find(beer => beer._id == keg.beerId)
        return {...line,keg,beer}
      });
      return {
        theresData: true,
        beers: action.data.beers,
        kegs: action.data.kegs,
        lines: action.data.lines,
        fullInfoLines: fullDataHolder
      };
    default:
      return state;
  }
};
export default beerReducer;
