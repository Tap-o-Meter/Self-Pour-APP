// import config from '../config';
// import {socket} from '../redux/store';
// import {Loader} from '../components';
// import actions from '../redux/actions';
// import globalStyles from '../../assets/styles';
// import {useDispatch, useSelector} from 'react-redux';
// import Icon from 'react-native-vector-icons/Ionicons';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// import AndroidPrompt from '../components/Modals/AndroidPrompt';
// import React, {useState, useEffect, useRef} from 'react';

// import RoundButton from '../components/Buttons/RoundButton';
// import NfcManager, {NfcEvents} from 'react-native-nfc-manager';

// import {
//   View,
//   Text,
//   FlatList,
//   StyleSheet,
//   Image,
//   Dimensions,
//   TouchableOpacity,
// } from 'react-native';

// const {height, width} = Dimensions.get('window');

// const LockScreen = ({navigation}) => {
//   const dispatch = useDispatch();
//   const {fullInfoLines} = useSelector(state => state.beerReducer);

//   const [userId, setUserId] = useState(null);

//   const loaderRef = useRef();
//   const androidPromptRef = useRef();

//   useEffect(() => {
//     socket.on('validated user', msg => {
//       if (msg.confirmation == 'success') {
//         loaderRef.current.setLoading(false);
//         dispatch(actions.logIn(msg.data));
//         navigation.navigate('Main');
//       } else loaderRef.current.setError('No hay usurio');
//     });

//     NfcManager.setEventListener(NfcEvents.DiscoverTag, handleNfcTagDiscovered);

//     return () => {
//       NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
//     };
//   }, [userId, loaderRef]);

//   const handleVisible = async () => {
//     await NfcManager.registerTagEvent();
//     if (Platform.OS === 'android') {
//       androidPromptRef.current.setVisible(true);
//     }
//   };

//   const handleNfcTagDiscovered = tag => {
//     NfcManager.unregisterTagEvent().catch(() => 0);

//     const formattedString = tag.id.replace(/(..)/g, '$1 ').trim();
//     console.warn(formattedString);
//     setUserId(formattedString);
//     loaderRef.current.setLoading(true);

//     socket.emit('getWorker', {cardId: formattedString});

//     if (Platform.OS === 'android') androidPromptRef.current.setVisible(false);
//   };

//   const onTimeoutReached = () => {
//     console.log('Error');
//     loaderRef.current.setError('Error');
//   };

//   const renderProduct = ({item}) => {
//     return (
//       <View style={styles.cardShadow}>
//         <View style={styles.cardContainer}>
//           <Image
//             style={styles.productImage}
//             resizeMode="cover"
//             source={{uri: item.beer.cloudImage}}
//           />
//           <View style={styles.productInfo}>
//             <Text style={styles.productName}>{item.beer.name}</Text>
//             <Text style={[styles.productStyle]}>{item.beer.style}</Text>
//             <Text style={styles.productStyle}>
//               <Text style={styles.productDetails}>IBU:</Text>
//               {' ' + item.beer.ibu + ' '} -
//               <Text style={styles.productDetails}> ABV:</Text>
//               {' ' + item.beer.abv}
//             </Text>
//           </View>
//         </View>
//       </View>
//     );
//   };

//   return (
//     <View style={styles.mainContainer}>
//       <View style={styles.header}>
//         <Text style={styles.titleHeader}>MENÚ DE CERVEZAS</Text>
//       </View>

//       {fullInfoLines && fullInfoLines.length > 0 ? (
//         <FlatList
//           style={styles.productList}
//           horizontal={true}
//           data={fullInfoLines}
//           snapToInterval={width * 0.9}
//           decelerationRate={'fast'}
//           renderItem={renderProduct}
//           keyExtractor={item => item._id}
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={styles.internalList}
//         />
//       ) : (
//         <View style={styles.emptyBoxWrapper}>
//           <Text style={{fontSize: 20, color: 'black', fontWeight: 'bold'}}>
//             No hay cervezas disponibles
//           </Text>

//           <RoundButton
//             style={styles.reloadButton}
//             color={globalStyles.colors.lightGreen}
//             eneable={true}
//             caption={'Recargar'}
//             onPress={() => {
//               dispatch(actions.requestDeviceList(socket));
//             }}
//           />
//         </View>
//       )}

//       <RoundButton
//         style={styles.startButton}
//         eneable={true}
//         caption={'Iniciar'}
//         onPress={() => handleVisible()}
//       />
//       <AndroidPrompt
//         ref={androidPromptRef}
//         onCancelPress={() => {
//           NfcManager.unregisterTagEvent().catch(() => 0);
//         }}
//       />
//       <Loader ref={loaderRef} animationType={'fade'} />
//     </View>
//   );
// };

import config from '../config';
import {socket} from '../redux/store';
import {Loader} from '../components';
import actions from '../redux/actions';
import globalStyles from '../../assets/styles';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AndroidPrompt from '../components/Modals/AndroidPrompt';
import React, {useState, useEffect, useRef} from 'react';
import RoundButton from '../components/Buttons/RoundButton';
import NfcManager, {NfcEvents} from 'react-native-nfc-manager';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Platform,            // 1️⃣
} from 'react-native';

const {height, width} = Dimensions.get('window');

const LockScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {fullInfoLines} = useSelector(state => state.beerReducer);
  const [userId, setUserId] = useState(null);

  const loaderRef = useRef();
  const androidPromptRef = useRef();

  // 2️⃣ Suscripción única al evento del socket
  useEffect(() => {
    const onValidated = msg => {
      if (msg.confirmation === 'success') {
        loaderRef.current.setLoading(false);
        dispatch(actions.logIn(msg.data));
        navigation.navigate('Main');
      } else {
        loaderRef.current.setError('No hay usuario');
      }
    };

    socket.on('validated user', onValidated);
    return () => {
      socket.off('validated user', onValidated);
    };
  }, [dispatch, navigation]);

  // 2️⃣ Listener único para NFC
  useEffect(() => {
    NfcManager.setEventListener(NfcEvents.DiscoverTag, handleNfcTagDiscovered);
    return () => {
      NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
    };
  }, []);

  // 3️⃣ Resetea loader antes de cada escaneo
  const handleVisible = async () => {
    console.log('handleVisible');
    loaderRef.current.setError(null);
    loaderRef.current.setLoading(false);
    await NfcManager.registerTagEvent();
    if (Platform.OS === 'android') {
      androidPromptRef.current.setVisible(true);
    }
  };

  const handleNfcTagDiscovered = tag => {
    NfcManager.unregisterTagEvent().catch(() => 0);

    const formattedString = tag.id.replace(/(..)/g, '$1 ').trim();
    console.warn('Tag leída:', formattedString);
    setUserId(formattedString);
    loaderRef.current.setLoading(true);

    socket.emit('getWorker', {cardId: formattedString});

    if (Platform.OS === 'android') {
      androidPromptRef.current.setVisible(false);
    }
  };

  const renderProduct = ({item}) => (
    <View style={styles.cardShadow}>
      <View style={styles.cardContainer}>
        <Image
          style={styles.productImage}
          resizeMode="cover"
          source={{uri: item.beer.cloudImage}}
        />
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{item.beer.name}</Text>
          <Text style={styles.productStyle}>{item.beer.style}</Text>
          <Text style={styles.productStyle}>
            <Text style={styles.productDetails}>IBU:</Text>
            {' ' + item.beer.ibu + ' '} -
            <Text style={styles.productDetails}> ABV:</Text>
            {' ' + item.beer.abv}
          </Text>
        </View>
      </View>
    </View>
  );

  const handleReload = () => {
    dispatch(actions.requestDeviceList(socket));
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <Text style={styles.titleHeader}>MENÚ DE CERVEZAS</Text>
      </View>

      {fullInfoLines && fullInfoLines.length ? (
        <FlatList
          style={styles.productList}
          horizontal
          data={fullInfoLines}
          snapToInterval={width * 0.9}
          decelerationRate="fast"
          renderItem={renderProduct}
          keyExtractor={item => item._id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.internalList}
        />
      ) : (
        <View style={styles.emptyBoxWrapper}>
          <Text style={styles.emptyText}>No hay cervezas disponibles</Text>
          <RoundButton
            style={styles.reloadButton}
            color={globalStyles.colors.lightGreen}
            eneable={true}
            caption="Recargar"
            onPress={handleReload}
          />
        </View>
      )}

      <RoundButton
        style={styles.startButton}
        eneable={true}
        caption="Iniciar"
        onPress={()=> handleVisible()}
      />
      <AndroidPrompt
        ref={androidPromptRef}
        onCancelPress={() => {
          NfcManager.unregisterTagEvent().catch(() => 0);
        }}
      />
      <Loader ref={loaderRef} animationType="fade" />
    </View>
  );
};

export default LockScreen;

const styles = StyleSheet.create({
  mainContainer: {
    ...globalStyles.mainContainer,
    alignItems: 'center',
  },
  header: {
    ...globalStyles.header,
  },
  titleHeader: {
    ...globalStyles.texts.header1,
  },
  productList: {
    // backgroundColor: 'red',
    maxHeight: height * 0.7,
  },
  internalList: {paddingBottom: 20, paddingTop: 20, paddingRight: width * 0.05},
  cardShadow: {
    marginLeft: width * 0.05,
    marginRight: width * 0.05,
    width: width * 0.8,
    height: '100%',
    borderRadius: 6,
    backgroundColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 5,
  },
  cardContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 6,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: '85%',
    // backgroundColor: 'red',
  },
  productInfo: {
    width: '100%',
    height: '15%',
    marginTop: 10,
    paddingLeft: 10,
  },
  productName: {
    ...globalStyles.texts.header2,
  },
  productStyle: {
    ...globalStyles.texts.body,
  },
  productDetails: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  startButton: {
    marginTop: 20,
  },
  emptyBoxWrapper: {
    width: '100%',
    height: height * 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reloadButton: {
    marginTop: 45,
    width: '30%',
  },
  emptyText: { fontSize: 20, color: 'black', fontWeight: 'bold' },
});
