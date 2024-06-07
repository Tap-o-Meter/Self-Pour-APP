import React from 'react';
import config from '../../config';
import Vaso from '../../../assets/vaso.svg';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {View, Text, StyleSheet, TouchableHighlight, Image} from 'react-native';

const LineCell = ({line}) => {
  const {keg, beer} = line;
  const navigation = useNavigation(); //Para poder navegar de un screen a otro

  const srm = () => {
    if (beer.srm > config.srmList.length)
      return {color: '#' + beer.srm.toString(16), srm: 'N/A'};
    else return config.srmList.find(srm => srm.srm === beer.srm);
  };

  return (
    <TouchableHighlight
      style={styles.cardShadow}
      onPress={() =>
        navigation.navigate('tap-info', {
          item: line,
        })
      }>
      <View style={styles.cardContainer}>
        <Text style={styles.noLinea}>#{line.noLinea} </Text>
        <Image
          source={beer.cloudImage ? {uri: beer.cloudImage} : config.images.splash}
          style={styles.imagenBeer}
          resizeMode="contain"
        />

        <View style={styles.textos}>
          <Text numberOfLines={1} style={styles.styleName}>
            {beer.name}
          </Text>
          <Text style={styles.styleStyle}>{beer.style}</Text>
          <Text style={styles.styleKeg}>
            <Text style={{fontSize: 9, fontWeight: '600'}}>ABV:</Text> {keg.abv}
            %<Text style={{fontSize: 9, fontWeight: '600'}}>{'  '}IBU:</Text>{' '}
            {keg.ibu}
          </Text>
        </View>
        {/* <View style={styles.Vasito}>
          <Vaso fill={srm().color} width={40} height={40} style={styles.svg} />
        </View> */}
      </View>
    </TouchableHighlight>
  );
};

export default LineCell;

const styles = StyleSheet.create({
  cardShadow: {
    width: '90%',
    height: 100,
    borderRadius: 6,
    backgroundColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 5,
    marginBottom: 20,
  },
  cardContainer: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 4,
    overflow: 'hidden',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  noLinea: {
    color: 'black',
    marginRight: 1,
    fontSize: 18,
    fontWeight: '600',
    paddingRight: 5,
    paddingTop: 15,
    height: '100%',
    // width: 38,
    // backgroundColor: 'red',
  },
  styleName: {
    width: 180,
    color: 'black',
    fontSize: 18,
    fontWeight: '800',
    maxWidth: '90%',
  },
  styleStyle: {
    color: 'black',
    fontSize: 11,
    fontWeight: '600',
  },
  styleKeg: {
    color: 'black',
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
    flex: 1,
    height: '100%',
    paddingLeft: 15,
  },
  svg: {
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    // elevation: 6,
  },
});
