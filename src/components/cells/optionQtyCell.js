import React from 'react';
import config from '../../config';
// import Vaso from '../../../assets/vaso.svg';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

const OptionQtyCell = ({item, onPress}) => {
  // const image = (name) => {
  //   const images = {
  //     TASTER: require(`../../../assets/taster.png`),
  //     PINT: require(`../../../assets/pint.png`),
  //     GROWLER: require(`../../../assets/growler.png`),
  //   };
  //   return images[name];
  // };
  return (
    <TouchableOpacity onPress={() => onPress()}>
      <View style={styles.container}>
        <View>
          <Text numberOfLines={1} style={styles.styleName}>
            {item.qty}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default OptionQtyCell;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    width: '80%',
    backgroundColor: 'transparent',
    height: 80,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(245,245,245,.7)',
    marginBottom: 20,
    borderRadius: 10,
    alignItems: 'flex-start',
    paddingLeft: 25,
    justifyContent: 'center',
  },
  styleName: {
    textAlign: 'center',
    color: 'whitesmoke',
    fontSize: 18,
    fontWeight: '800',
    maxWidth: '90%',
  },
  styleKeg: {
    color: 'whitesmoke',
    fontSize: 13,
  },
});
