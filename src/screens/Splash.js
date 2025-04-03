import config from '../config';
import {connect} from 'react-redux';
import actions from '../redux/actions';
import {socket, initSocket} from '../redux/store';
import LottieView from 'lottie-react-native';
import globalStyles from '../../assets/styles';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import RoundButton from '../components/Buttons/RoundButton';
import { useFocusEffect } from '@react-navigation/native';

import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  Alert, 
  Platform, 
  Modal, 
  TextInput, 
  TouchableOpacity 
} from 'react-native'

// const Splash = ({navigation, requestDeviceList}) => {
//   const {loading, error} = config.animations;

//   const animations = [loading, loading, error];
//   const messages = ['Conectando...', 'Cargando...', 'Error de conexión'];

//   const [index, setIndex] = useState(0);
//   const [loop, setLoop] = useState(true);
//   const [timesTried, setTimesTried] = useState(0);

//   useEffect(() => {
//     checkConnection();
//     return () => clearTimeout(timeoutId);
//   }, [timesTried]);

//   let timeoutId;

//   const checkConnection = () => {
//     socket.connect();
//     timeoutId = setTimeout(() => {
//       if (socket.connected) {
//         setIndex(index + 1);
//         requestDeviceList(socket);
//       } else if (timesTried > 4) {
//         setIndex(2);
//         setLoop(false);
//       } else setTimesTried(timesTried + 1);
//     }, 1500);
//   };

//   const retry = () => {
//     setTimesTried(0);
//     setIndex(0);
//     setLoop(true);

//     checkConnection();
//   };

//   return (
//     <View style={styles.mainContainer}>
//       <Image
//         style={styles.logo}
//         resizeMode="contain"
//         source={config.images.splash}
//       />

//       <Text style={styles.status}>{messages[index]}</Text>

//       <LottieView
//         style={styles.loading}
//         source={animations[index]}
//         autoPlay
//         loop={loop}
//       />

//       {!loop ? (
//         <RoundButton
//           style={styles.retryButton}
//           eneable={true}
//           caption={'Reintentar'}
//           onPress={() => retry()}
//         />
//       ) : null}
//     </View>
//   );
// };

// const dispatchToProps = dispatch => {
//   return {
//     requestDeviceList: socket => {
//       dispatch(actions.requestDeviceList(socket));
//     },
//   };
// };

// export default connect(null, dispatchToProps)(Splash);

// const styles = StyleSheet.create({
//   mainContainer: {
//     ...globalStyles.mainContainer,
//     alignItems: 'center',
//   },
//   logo: {
//     width: 350,
//     height: 350,
//     marginTop: 120,
//   },
//   status: {
//     ...globalStyles.texts.header2,
//     marginTop: 70,
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   loading: {
//     width: 100,
//     height: 100,
//     backgroundColor: 'transparent',
//   },
//   retryButton: {
//     marginTop: 45,
//   },
// });


const Splash = ({ navigation, requestDeviceList }) => {
  const { loading, error } = config.animations;
  const animations = [loading, loading, error];
  const messages = ['Conectando...', 'Cargando...', 'Error de conexión'];

  const [index, setIndex] = useState(0);
  const [loop, setLoop] = useState(true);
  const [timesTried, setTimesTried] = useState(0);

  // Estados para el modal en Android
  const [modalVisible, setModalVisible] = useState(false);
  const [newUrl, setNewUrl] = useState(null);

  useEffect(() => {
    checkConnection();
    return () => clearTimeout(timeoutId);
  }, [timesTried]);

  let timeoutId;

  const checkConnection = (url) => {
    const _url = url || newUrl || "http://192.168.1.182:3000";
    initSocket(_url)
    timeoutId = setTimeout(() => {
      if (socket?.connected) {
        setIndex(index + 1);
        requestDeviceList(socket);
      } else if (timesTried > 4) {
        setIndex(2);
        setLoop(false);
      } else {
        setTimesTried(timesTried + 1);
      }
    }, 1500);
  };

  const retry = (url) => {
    setTimesTried(0);
    setIndex(0);
    setLoop(true);
    checkConnection(url);
  };

  const handleRetry = () => {
    if (Platform.OS === 'ios') {
      // Alert.prompt está disponible solo en iOS
      Alert.prompt(
        'Cambiar URL',
        'Ingresa la nueva URL para conectar:',
        [
          {
            text: 'Cancelar',
            style: 'cancel',
            onPress: () => {
              // Si cancela, reintenta la conexión con la URL actual
              retry();
            },
          },
          {
            text: 'Aceptar',
            onPress: (url) => {
              // Actualizamos la URL en el socket y reintentamos la conexión
              initSocket(url);
              retry();
            },
          },
        ],
        'plain-text',
        config.url // Valor actual por defecto
      );
    } else {
      // Para Android mostramos un modal personalizado
      setNewUrl(null);
      setModalVisible(true);
    }
  };

  const handleModalAceptar = () => {
    // Reinicializamos el socket con la nueva URL y cerramos el modal
    console.log(newUrl);
    setModalVisible(false);
    retry(newUrl);
    // console.log(socket);
  };

  const handleModalCancelar = () => {
    setModalVisible(false);
    retry();
    // console.log(socket);
    
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
          onPress={handleRetry}
        />
      ) : null}

      {/* Modal para Android */}
      {Platform.OS === 'android' && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
            retry();
          }}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Cambiar URL</Text>
              <Text style={styles.modalText}>Ingresa la nueva URL para conectar:</Text>
              <TextInput
                style={styles.modalInput}
                onChangeText={setNewUrl}
                value={newUrl}
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="http://nueva-url.com"
              />
              <View style={styles.modalButtons}>
                <TouchableOpacity onPress={handleModalCancelar} style={styles.modalButton}>
                  <Text style={styles.modalButtonText}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleModalAceptar} style={styles.modalButton}>
                  <Text style={styles.modalButtonText}>Aceptar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
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
  // Estilos para el modal en Android
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    elevation: 10
  },
  modalTitle: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 10
  },
  modalText: {
    fontSize: 16,
    color: 'black',
    marginBottom: 10
  },
  modalInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: 'black'
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  modalButtonText: {
    fontSize: 16,
    color: '#007AFF'
  },
});
