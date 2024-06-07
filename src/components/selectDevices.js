/* @flow */

import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {SelectableCell} from './cells';
import {connect} from 'react-redux';

class SelectDevices extends Component {
  constructor(props) {
    super(props);
    this._renderPost = this._renderPost.bind(this);
  }
  _renderPost({item, index}) {
    return (
      <SelectableCell
        item={item}
        rooms={this.props.rooms}
        roomsToAdd={this.props.roomsToAdd}
        removeRoom={this.props.removeRoom}
      />
    );
  }
  _returnKey(item) {
    return item._id.toString();
  }
  render() {
    return (
      <FlatList
        style={styles.container}
        data={this.props.dispositivos}
        keyExtractor={this._returnKey}
        renderItem={this._renderPost}
      />
    );
  }
}
const mapStateToProps = (state) => {
  return {rooms: state.rooms.cuartos};
};
const dispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, dispatchToProps)(SelectDevices);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    marginTop: 10,
  },
});
