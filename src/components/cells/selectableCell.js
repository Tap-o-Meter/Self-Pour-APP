/* @flow */

import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
// import {CheckBox} from 'react-native-elements';
import config from '../../config';

export default class SelectableCell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
    };
  }

  get name() {
    return this.props.rooms.find((el) => el._id === this.props.item.room).name;
  }
  render() {
    const {checked} = this.state;
    const {item, removeRoom, roomsToAdd} = this.props;
    checked ? roomsToAdd(item._id) : removeRoom(item._id);
    return (
      <View style={styles.cell}>
        {/* <CheckBox
          style={styles.checkBox}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checked={checked}
          onPress={() => this.setState({checked: !checked})}
        /> */}
        <View>
          <Text style={styles.device}>{item.name}</Text>
          <Text style={styles.room}>
            {item.room ? this.name : 'Dispositivo sin asociar'}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cell: {
    width: '100%',
    height: 65,
    paddingHorizontal: 5,
    alignItems: 'center',
    flexDirection: 'row',
  },
  device: {
    color: config.colorApp,
    fontSize: 16,
    fontWeight: 'bold',
  },
  room: {
    color: 'gray',
  },
});
