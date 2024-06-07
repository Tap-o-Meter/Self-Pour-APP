import connexion from './connexion';
import storage from './storage';
import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');
export default {
  width,
  height,
  srmList: [
    {color: '#f7f3bb', srm: 1},
    {color: '#f6df7d', srm: 2},
    {color: '#f5c755', srm: 3},
    {color: '#f5b642', srm: 4},
    {color: '#f1a132', srm: 5},
    {color: '#e7912d', srm: 6},
    {color: '#e18329', srm: 7},
    {color: '#d77428', srm: 8},
    {color: '#d26727', srm: 9},
    {color: '#bc4e22', srm: 10},
    {color: '#c25624', srm: 11},
    {color: '#ca5f25', srm: 12},
    {color: '#bf4d28', srm: 13},
    {color: '#aa3b1d', srm: 14},
    {color: '#ab3f1e', srm: 15},
    {color: '#aa3c1d', srm: 16},
    {color: '#a4341b', srm: 17},
    {color: '#9f331c', srm: 18},
    {color: '#9a2d1a', srm: 19},
    {color: '#942919', srm: 20},
    {color: '#8e2519', srm: 21},
    {color: '#8a2019', srm: 22},
    {color: '#842119', srm: 23},
    {color: '#7d1d17', srm: 24},
    {color: '#771c15', srm: 25},
    {color: '#711c14', srm: 26},
    {color: '#6d1911', srm: 27},
    {color: '#691612', srm: 28},
    {color: '#631511', srm: 29},
    {color: '#601310', srm: 30},
    {color: '#5e1011', srm: 31},
    {color: '#580f0f', srm: 32},
    {color: '#550e10', srm: 33},
    {color: '#52090f', srm: 34},
    {color: '#4d0910', srm: 35},
    {color: '#450a0f', srm: 36},
    {color: '#420f10', srm: 37},
    {color: '#3b0e11', srm: 38},
    {color: '#350e11', srm: 39},
    {color: '#210e0e', srm: 40},
  ],
  images: {
    taps: require('../../assets/taps.jpeg'),
    logo: require('../../assets/LogoV5.png'),
    splash: require('../../assets/images/TOM_orange_logo.png'),
  },
  styleConstants: {
    rowHeight: 50,
  },
  animations: {
    emptyBox: require('../../assets/empty-box.json'),
    conectando: require('../../assets/conectando.json'),
    error: require('../../assets/error.json'),
    check: require('../../assets/check.json'),
    splash: require('../../assets/splash.json'),
    loading: require('../../assets/lottie/loader.json'),
    cita: require('../../assets/cita.json'),
    nfc: require('../../assets/lottie/nfc.json'),
  },
  tabsConfig: {
    activeTintColor: this.colorApp,
    inactiveTintColor: 'gray',
    activeTintColor: '#e91e63',
    style: {
      backgroundColor: 'red',
    },
  },
  home: require('../../assets/homeColor.json'),
  // colorApp: 'rgb(128,34,172)',
  colorApp: '#FF9E1F',
  colors: {
    mainColor: '#FF9E1F',
  },
  concepts: [
    {name: 'Vaso', qty: 16, price: 100, concept: "PINT"},
    {name: 'Taster', qty: 5, price: 100, concept: "TASTER"},
    {name: 'Prueba', qty: 2, price: 100, concept: "FLIGHT"},
  ],
  getConceptNames: function(name){
      return this.concepts.find(concept => concept.concept == name).name;
  },
  ozToMl: function(value, inverted) {
    const oneOZ = 29.5735;

    if (inverted) return (value / oneOZ).toFixed(1);
    return (value * oneOZ).toFixed(1);
  },
  baseUrl: 'http://192.168.1.79:3000/',
  configUrl: 'http://192.168.4.1/wifisave?s=',
  request: connexion.request,
  retrieveData: storage.retrieveData,
  storeData: storage.storeData,
  removeItemValue: storage.removeItemValue,
  emailCheckRegex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  categories: {
    states: [{name: 'Todos'}, {name: 'ON'}, {name: 'OFF'}],
    types: [
      {name: 'Todos'},
      {name: 'Enchufes'},
      {name: 'Apagadores'},
      {name: 'Aparatos'},
    ],
  },
};
