import config from '../config';
import {connect} from 'react-redux';
import actions from '../redux/actions';
import {socket} from '../redux/store';
import LottieView from 'lottie-react-native';
import globalStyles from '../../assets/styles';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import RoundButton from '../components/Buttons/RoundButton';
// import { useFocusEffect } from '@react-navigation/native';

import {View, Text, StyleSheet, Image} from 'react-native';

const Splash = ({navigation, requestDeviceList}) => {
  const {loading, error} = config.animations;

  const animations = [loading, loading, error];
  const messages = ['Conectando...', 'Cargando...', 'Error de conexión'];

  const [index, setIndex] = useState(0);
  const [loop, setLoop] = useState(true);
  const [timesTried, setTimesTried] = useState(0);

  useEffect(() => {
    checkConnection();
    return () => clearTimeout(timeoutId);
  }, [timesTried]);

  let timeoutId;

  const checkConnection = () => {
    socket.connect();
    timeoutId = setTimeout(() => {
      if (socket.connected) {
        setIndex(index + 1);
        requestDeviceList(socket);
      } else if (timesTried > 4) {
        setIndex(2);
        setLoop(false);
      } else setTimesTried(timesTried + 1);
    }, 1500);
  };

  const retry = () => {
    setTimesTried(0);
    setIndex(0);
    setLoop(true);

    checkConnection();
  };

  return (
    <View style={styles.mainContainer}>
      <Image
        style={styles.logo}
        resizeMode="contain"
        source={config.images.splash}
      />

      <Text style={styles.status}>{messages[index]}</Text>

      <LottieView
        style={styles.loading}
        source={animations[index]}
        autoPlay
        loop={loop}
      />

      {!loop ? (
        <RoundButton
          style={styles.retryButton}
          eneable={true}
          caption={'Reintentar'}
          onPress={() => retry()}
        />
      ) : null}
    </View>
  );
};

const dispatchToProps = dispatch => {
  return {
    requestDeviceList: socket => {
      dispatch(actions.requestDeviceList(socket));
    },
  };
};

export default connect(null, dispatchToProps)(Splash);

const styles = StyleSheet.create({
  mainContainer: {
    ...globalStyles.mainContainer,
    alignItems: 'center',
  },
  logo: {
    width: 350,
    height: 350,
    marginTop: 120,
  },
  status: {
    ...globalStyles.texts.header2,
    marginTop: 70,
    textAlign: 'center',
    marginBottom: 20,
  },
  loading: {
    width: 100,
    height: 100,
    backgroundColor: 'transparent',
  },
  retryButton: {
    marginTop: 45,
  },
});
