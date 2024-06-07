import React, {useState, useEffect, useImperativeHandle} from 'react';
import {View, Text, StyleSheet, Modal} from 'react-native';
import LottieView from 'lottie-react-native';
import config from '../config';

const Loader = ({animationType, onFail}, ref) => {
  const [loop, setLoop] = useState(true);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('Cargando');
  const [file, setFile] = useState(config.animations.loading);
  const [timeoutId, setTimeoutId] = useState(null);

  useEffect(() => {
    // Limpia el timeout al desmontar el componente
    return () => clearTimeout(timeoutId);
  }, [timeoutId]);

  const setLoading = state => {
    setLoop(true);
    setFile(config.animations.loading);
    setMessage('Cargando');
    setVisible(state);

    // Limpia el timeout anterior si existe
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    if (state) {
      // Inicia el timeout solo si se está activando el loader
      const id = setTimeout(() => {
        if (onFail) onFail();
        else setError('Error');
      }, 5000); // Ajusta este tiempo según tus necesidades
      setTimeoutId(id);
    }
  };

  const setError = message => {
    setFile(config.animations.error);
    setLoop(false);
    setMessage(message);
    setVisible(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  // Exponer setError y setLoading al componente padre usando ref
  useImperativeHandle(ref, () => ({
    setError,
    setLoading,
  }));

  return (
    <Modal transparent={true} animationType={animationType} visible={visible}>
      <View style={styles.wrapper}>
        <View style={styles.loaderContainer}>
          <LottieView
            style={styles.animation}
            source={file}
            autoPlay
            loop={loop}
          />
          <Text style={styles.message}>{message}</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    zIndex: 12,
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loaderContainer: {
    width: 140,
    height: 140,
    backgroundColor: 'white',
    borderRadius: 15,
  },
  animation: {
    position: 'absolute',
    width: 100,
    marginTop: 7,
    alignSelf: 'center',
    height: 100,
    top: -5,
  },
  message: {
    position: 'absolute',
    bottom: 7,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 13,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default React.forwardRef(Loader);
