import config from '../config';
import {connect} from 'react-redux';
import actions from '../redux/actions';
import {socket} from '../redux/store';
import Icon from 'react-native-vector-icons/Feather';
import globalStyles from '../../assets/styles';
import React, {useState, useEffect} from 'react';

import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

const Staff = ({navigation}) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            name="arrow-left"
            size={35}
            color={globalStyles.colors.lightBlack}
          />
        </TouchableOpacity>
        <Text style={styles.titleHeader}>Opciones de Administrador</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: globalStyles.colors.white,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    ...globalStyles.header,
    flexDirection: 'row',

  },
  titleHeader: {
    ...globalStyles.texts.header1,
    textTransform: 'uppercase',
    marginLeft: 10,
  },
});

export default Staff;
