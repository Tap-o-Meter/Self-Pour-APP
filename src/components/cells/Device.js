import React, {useState, useEffect} from 'react';
import config from '../../config';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import actions from '../../redux/actions';
import {socket} from '../../redux/store';
import {useDispatch, useSelector, connect} from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Switch,
} from 'react-native';

const Device = (props) => {
  const {dispositivos} = useSelector((state) => state.device);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [liked, setLiked] = useState(
    !!+dispositivos.find((el) => el._id === props.item._id).state,
  );
  const likeToggled = () => {
    dispatch(actions.changeState(props.item._id, socket));
    const bulbIcon = liked ? config.images.bulbOn : config.images.bulbOff;
  };
  return (
    <View style={styles.celda}>
      <View style={styles.deviceToggle}>
        <Icon name={'light-switch'} size={40} color={'black'} />
      </View>
      <TouchableOpacity
        style={{flex: 1}}
        onPress={() => navigation.navigate('Device', {item: props.item})}>
        <View style={styles.deviceInfoContainer}>
          <Text style={styles.deviceName}>{props.item.name} </Text>
          <Text style={styles.deviceStatus}>extra data</Text>
          <Switch
            value={liked}
            onValueChange={() => likeToggled()}
            style={styles.icon}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  celda: {
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255 ,.85)',
    marginTop: 10,
    alignItems: 'center',
    width: 92 + '%',
    height: 69,
    borderWidth: 0,
    borderRadius: 18,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: 'black',
    shadowOffset: {width: 1, height: 5},
    shadowOpacity: 0.4,
    shadowRadius: 14,
    elevation: 5,
  },
  deviceToggle: {
    marginLeft: 15,
    borderColor: 'gray',
    borderWidth: 0,
    borderRadius: 25,
    paddingHorizontal: 0,
  },
  deviceInfoContainer: {
    marginLeft: 5,
  },
  deviceName: {
    fontSize: 13,
    fontWeight: '800',
    color: 'black',
    textTransform: 'uppercase',
  },
  deviceStatus: {
    fontSize: 12,
    color: 'gray',
  },
  bulb: {
    width: 32,
    height: 32,
  },
  icon: {
    position: 'absolute',
    right: 15,
    height: 25,
    transform: [{scaleX: 0.85}, {scaleY: 0.85}],
  },
});

export default Device;
