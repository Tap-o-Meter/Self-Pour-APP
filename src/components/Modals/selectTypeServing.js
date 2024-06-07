/* @flow weak */

import React from 'react';
import config from '../../config';
import Feather from 'react-native-vector-icons/Feather';
import {View, Text, StyleSheet, Modal, TouchableOpacity} from 'react-native';

const SelectTypeServing = ({visible, handleVisible}) => {
  const getServingOptions = () => {
    const options = [
      {name: 'Servir ahora', onPress: () => {}},
      {name: 'Agregar a Orden', onPress: () => {}},
      {name: 'Cancelar', onPress: () => handleVisible(false)},
    ];
    return options.map((option) => (
      <TouchableOpacity style={styles.option} onPress={option.onPress}>
        <Text>{option.name}</Text>
      </TouchableOpacity>
    ));
  };
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      style={styles.container}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.xButton}
          onPress={() => handleVisible(false)}>
          <Feather name="x" size={33} color={'black'} style={{}} />
        </TouchableOpacity>

        <View style={styles.centerContent}>
          <Text style={{paddingBottom: 20}}>Opción para servir</Text>
          {getServingOptions()}
        </View>
      </View>
    </Modal>
  );
};

export default SelectTypeServing;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,.7)',
    height: 100 + '%',
    width: 100 + '%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  xButton: {
    position: 'absolute',
    top: 55,
    right: 13,
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: 'white',
  },
  centerContent: {
    width: 300,
    height: 270,
    borderRadius: 10,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 10,
    backgroundColor: 'whitesmoke',
  },
  option: {
    width: '90%',
    height: '20%',
    borderRadius: 5,
    marginVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: config.colorApp,
  },
});
