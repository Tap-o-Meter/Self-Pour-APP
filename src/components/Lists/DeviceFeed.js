
import React, { useState, useEffect } from 'react';
import { LineCell } from '../cells';
import actions from '../../redux/actions';
import { socket } from '../../redux/store';
import { connect } from 'react-redux';
import config from '../../config';
import LottieView from 'lottie-react-native';

import {
  FlatList,
  RefreshControl,
  Text,
  View,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const DeviceFeed = ({ lines, header, requestDeviceList }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [refreshTxt, setRefreshTxt] = useState('');
  const [timer, setTimer] = useState(null); // Declare the timer variable


  useEffect(() => {
    if (refreshing) {
      clearTimeout(timer);
      setTimeout(() => {
        setRefreshing(false);
        setRefreshTxt('');
      }, 1000);
    }
  }, [setRefreshing, setRefreshTxt, timer]);


  const _renderPost = ({ item, index }) => {
    return item.idKeg.length > 0 ? <LineCell line={item} /> : null;
  };

  const _returnKey = (item) => {
    return item._id.toString();
  };

  const onRefresh = () => {
    setRefreshing(true);
    setRefreshTxt('Buscando');
    requestDeviceList(socket);
    const newTimer = setTimeout(() => {
      if (refreshing) {
        setRefreshing(false);
        Alert.alert('Error', 'Revisar conexión');
      }
    }, 10000);
    setTimer(newTimer); // Set the timer variable
  };

  return (
    <View style={styles.container}>
      {lines.length == 0 ? (
        <View style={styles.emptyBoxWrapper}>
          <LottieView
            style={styles.emptyBox}
            source={config.animaciones.emptyBox}
            autoPlay
            loop
          />
          <Text style={{ color: 'black', fontSize: 16 }}>
            No hay lines
          </Text>
          <TouchableOpacity onPress={onRefresh}>
            <Text style={{ color: 'black' }}>Vales dick!</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          style={styles.deviceList}
          contentContainerStyle={styles.internalList}
          data={lines}
          keyExtractor={_returnKey}
          renderItem={_renderPost}
          // ListHeaderComponent={header}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              title={refreshTxt}
              tintColor={'white'}
              titleColor={'white'}
            />
          }
        />
      )}
    </View>
  );
};

const dispatchToProps = (dispatch) => {
  return {
    requestDeviceList: (socket) => {
      dispatch(actions.requestDeviceList(socket));
    },
  };
};

export default connect(null, dispatchToProps)(DeviceFeed);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },

  deviceList: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: 'transparent',
  },
  internalList: {
    alignItems: 'center',
  },
  emptyBoxWrapper: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyBox: { width: 120, height: 120 },
});
