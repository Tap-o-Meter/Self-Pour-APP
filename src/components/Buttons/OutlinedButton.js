import config from '../../config';
import globalStyles from '../../../assets/styles';
import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';

const OutlinedButton = ({
  onPress,
  eneable,
  caption,
  color,
  style,
}) => {
  const opacity = eneable ? 1 : 0.4;

  var args = {opacity};

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={!eneable}
      style={[styles.root, style, args]}>
      <Text style={styles.caption}>{caption}</Text>
    </TouchableOpacity>
  );
};

export default OutlinedButton;

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: globalStyles.colors.red,
    borderWidth: 1,
    borderRadius: 10,
    width: 135,
    height: 120,
  },
  caption: {
    color: globalStyles.colors.red,
    fontSize: 18,
    // fontFamily: 'roboto-regular',
  },
});
