import {Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

export default {
  mainContainer: {
    display: 'flex',
    width: 100 + '%',
    height: 100 + '%',
  },
  header: {
    backgroundColor: 'transparent',
    width: 100 + '%',
    height: 110,
    paddingTop: 45,
    paddingLeft: 30,
  },
  smButton: {
    width: '40%',
    height: 52,
    borderRadius: 50,
  },
  lgButton: {
    width: width * 0.9,
    marginLeft: width * 0.05,
    marginRight: width * 0.05,
    height: 52,
    borderRadius: 50,
  },
};
