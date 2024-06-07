import config from '../../config';
import globalStyles from '../../../assets/styles';
import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';

const MaterialButtonPurple = ({
  onPress,
  eneable,
  type,
  caption,
  color,
  style,
}) => {
  const opacity = eneable ? 1 : 0.8;
  const backgroundColor = color ? color : globalStyles.colors.red;

  var args = {backgroundColor, opacity};

  args = type === 'lg' ? {...globalStyles.lgButton, ...args}  : {...globalStyles.smButton, ...args};

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={!eneable}
      style={[styles.root, style, args]}>
      <Text style={styles.caption}>{caption}</Text>
    </TouchableOpacity>
  );
};

export default MaterialButtonPurple;

const styles = StyleSheet.create({
  root: {
    backgroundColor: globalStyles.colors.red,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.35,
    shadowRadius: 5,
    elevation: 2,
    paddingLeft: 16,
    paddingRight: 16,
  },
  caption: {
    color: globalStyles.colors.lightGray,
    fontSize: 18,
    // fontFamily: 'roboto-regular',
  },
});
