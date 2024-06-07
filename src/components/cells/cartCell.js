import React from 'react';
import config from '../../config';
// import Vaso from '../../../assets/vaso.svg';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {View, Text, StyleSheet, TouchableHighlight, Image} from 'react-native';

const CartCell = ({item}) => {
  const {kegs, beers, lines} = useSelector((state) => state.beerReducer);
  const navigation = useNavigation(); //Para poder navegar de un screen a otro
  const line = lines.find((line) => line.noLinea === item._id);
  const keg = kegs.find((keg) => keg._id === line.idKeg); //Encontrar de los barriles, un  barril y que ese barril tenga el mismo id que el barril de la linea
  const beer = beers.find((beer) => beer._id === keg.beerId);

  // if (keg == undefined) {
  //   console.log(line);
  // }
  // const beer = beers.find((beer) => {
  //   return beer._id === keg.beerId;
  // });

  const srm = () => {
    if (beer.srm > config.srmList.length)
      return {color: '#' + beer.srm.toString(16), srm: 'N/A'};
    else return config.srmList.find((srm) => srm.srm === beer.srm);
  };

  // const srm = config.srmList.find(srm => srm.srm === beer.srm);
  return (
    <TouchableHighlight
      onPress={() =>
        navigation.navigate('SelectQty', {
          noLinea: line.noLinea,
        })
      }>
      <View style={styles.container}>
        <Image
          source={beer.cloudImage ? {uri: beer.cloudImage} : config.images.logo}
          style={styles.imagenBeer}
        />

        <View style={styles.textos}>
          <Text numberOfLines={1} style={styles.styleName}>
            {beer.name}
          </Text>

          <Text style={styles.styleKeg}>
            {item.concept}
            <Text style={{fontSize: 9, fontWeight: '600'}}>{'  '}</Text>{' '}
            {item.qty}L
          </Text>
        </View>
        <View style={styles.Vasito}>
          {
            //<Vaso fill={srm().color} width={40} height={40} style={styles.svg} />
          }
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default CartCell;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'transparent',
    height: 90,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(245,245,245,.5)',
    paddingLeft: 8,
    flexDirection: 'row',
    paddingRight: 20,
    alignItems: 'center',
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
    width: 180,
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
    marginLeft: 20,
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
