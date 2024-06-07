/* @flow */

import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import config from '../config';

export default class IconList extends Component {
  render() {
    const iconList = [
      'stove',
      'silverware',
      'google-controller',
      'sofa',
      'bed-empty',
      'garage',
      'pool',
      'shower',
      'desk-lamp',
      'home',
      'bowling',
      'weight',
      'dumbbell',
      'tree',
      'toolbox',
    ];
    return (
      <FlatList
        style={styles.container}
        showsVerticalScrollIndicator={false}
        data={iconList}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.cell}
            onPress={() => this.props.selectedIcon(item)}>
            <Icon name={item} size={40} color={'black'} style={styles.icons} />
          </TouchableOpacity>
        )}
        //Setting the number of column
        numColumns={4}
        keyExtractor={(item, index) => index}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 100 + '%',
  },
  cell: {
    width: '25%',
    flexDirection: 'column',
    margin: 1,
  },
  icons: {
    alignSelf: 'center',
    height: 45,
    width: 45,
  },
});
