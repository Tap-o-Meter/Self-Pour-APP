import {USER_LOGIN, USER_LOGOUT} from '../actions/types';

const initialState = {
  user: null
  // {
  //   _id: '5e560dd9aad21c1f03069dce',
  //   apellidos: 'Murillo',
  //   cardId: '04 50 E8 E2 B2 6A 80',
  //   nombre: 'Marco',
  // },
};
const beerReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      console.log('Logged In');
      return {
        user: action.data,
      };
    case USER_LOGOUT:
      console.log("Logged Out");
      return {
        user: null,
      };
    default:
      return state;
  }
};
export default beerReducer;
