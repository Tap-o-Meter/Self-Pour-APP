import React from 'react';
import config from '../../config';
// import Vaso from '../../../assets/vaso.svg';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

const QtyCell = ({item, onPress}) => {
  // const {kegs, beers, lines} = useSelector((state) => state.beerReducer);
  // const navigation = useNavigation(); //Para poder navegar de un screen a otro
  // const line = lines.find((line) => line.noLinea === item._id);
  // const keg = kegs.find((keg) => keg._id === line.idKeg); //Encontrar de los barriles, un  barril y que ese barril tenga el mismo id que el barril de la linea
  // const beer = beers.find((beer) => beer._id === keg.beerId);
  const image = (name) => {
    const images = {
      TASTER: require(`../../../assets/taster.png`),
      PINT: require(`../../../assets/pint.png`),
      GROWLER: require(`../../../assets/growler.png`),
    };
    return images[name];
  };
  return (
    <TouchableOpacity onPress={(item) => onPress()}>
      <View style={styles.container}>
        <Image source={image(item.concept)} style={styles.imagenBeer} />

        <View style={styles.textos}>
          <Text numberOfLines={1} style={styles.styleName}>
            {item.concept}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default QtyCell;

const styles = StyleSheet.create({
  container: {
    width: 150,
    backgroundColor: 'transparent',
    height: 150,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(245,245,245,.7)',
    marginBottom: 20,
    marginHorizontal: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noLinea: {
    color: 'white',
    marginRight: 5,
    fontSize: 18,
    fontWeight: '600',
    width: 38,
    //backgroundColor: 'red',
  },
  styleName: {
    textAlign: 'center',
    color: 'whitesmoke',
    fontSize: 18,
    fontWeight: '800',
    maxWidth: '90%',
  },
  styleStyle: {
    color: 'rgba(255,255,255,.6)',
    fontSize: 11,
    fontWeight: '600',
  },
  styleKeg: {
    color: 'whitesmoke',
    fontSize: 13,
  },
  Vasito: {
    flex: 1,
    alignItems: 'flex-end',
  },
  imagenBeer: {
    width: 80,
    height: 80,
    borderRadius: 5,
  },
  textos: {
    textAlign: 'center',
  },
  svg: {
    shadowColor: 'white',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    // elevation: 6,
  },
});
