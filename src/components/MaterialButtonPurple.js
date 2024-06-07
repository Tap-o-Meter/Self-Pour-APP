import React, {Component} from 'react';
import config from '../config';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';

const MaterialButtonPurple = ({onPress, eneable, style, caption}) => (
  <TouchableOpacity
    onPress={onPress}
    disabled={!eneable}
    style={[styles.root, style, {opacity: eneable ? 1 : 0.8}]}>
    <Text style={styles.caption}>{caption}</Text>
  </TouchableOpacity>
);

export default MaterialButtonPurple;

const styles = StyleSheet.create({
  root: {
    backgroundColor: config.colors.mainColor,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 7,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.35,
    shadowRadius: 5,
    elevation: 2,
    minWidth: 88,
    paddingLeft: 16,
    paddingRight: 16,
    flex: 1,
  },
  caption: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'roboto-regular',
  },
});
