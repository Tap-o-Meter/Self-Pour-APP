import React, {useMemo} from 'react';
import config from '../../config';
import {socket} from '../../redux/store';
import {useDispatch, useSelector} from 'react-redux';
import ProgressBar from '../progressBar';
import actions from '../../redux/actions';
import LottieView from 'lottie-react-native';
import RoundButton from '../Buttons/RoundButton';
import globalStyles from '../../../assets/styles';
import {useNavigation} from '@react-navigation/native';
// import CircularProgress from 'react-native-circular-progress-indicator';
import CircularProgress from '../CircularProgress';

import {
  Text,
  View,
  Modal,
  Animated,
  Dimensions,
  StyleSheet,
  BackHandler,
} from 'react-native';
import {red} from 'react-native-reanimated';

function PouringModal(props, ref) {
  const {onCancelPress, concept, lineId} = props;
  const {width} = Dimensions.get('window');
  const {ozToMl} = config;

  const {user} = useSelector(state => state.userReducer);

  const [progress, setProgress] = React.useState(0);
  const [hintText, setHintText] = React.useState('');
  const [visible, setVisible] = React.useState(false);
  const [_visible, _setVisible] = React.useState(false);
  const [LivePoured, setLivePoured] = React.useState(0);
  const [pouredPercentage, setPouredPercentage] = React.useState(0);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const optionsRef = React.useRef();
  const animValue = React.useRef(new Animated.Value(0)).current;

  const finishedRef = React.useRef();

  const UserBalance = 20;

  React.useEffect(() => {
    if (ref) {
      ref.current = {
        setVisible: _setVisible,
        setHintText,
      };
    }
  }, [ref]);

  React.useEffect(() => {
    let backHandler;
    if (_visible) {
      const ml_qty = ozToMl(concept.qty);

      backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        null,
      );

      socket.on('updated_pour_status', msg => {
        const {pouredVolume} = msg;
        if (lineId == msg.lineId) {
          console.log('pouredVolume: ' + pouredVolume);
          const fixed_volume = ozToMl(pouredVolume, true);
          const fixed_percentage = (100 * pouredVolume) / ml_qty;
          const ml_qty2 = ozToMl(concept.qty);

          setPouredPercentage(fixed_percentage.toFixed(0));
          setLivePoured(fixed_volume);
        }
      });

      socket.on('finished_pour', msg => {
        console.log('pouring_finished');
        handleFinished();
        console.log(msg);
      });

      setVisible(true);
      setProgress(1);

      Animated.timing(animValue, {
        duration: 200,
        toValue: 1,
        useNativeDriver: true,
      }).start();
    } 
    else {
      Animated.timing(animValue, {
        duration: 200,
        toValue: 0,
        useNativeDriver: true,
      }).start(() => {
        setVisible(false);
        setProgress(0);
        setHintText('');
      });
    }

    return () => {
      socket.off('updated_pour_status');
      socket.off('finished_pour');
      if (backHandler) backHandler.remove();
    };
  }, [_visible, animValue]);

  const backdropAnimStyle = {opacity: animValue};

  const promptAnimStyle = {
    transform: [
      {
        translateY: animValue.interpolate({
          inputRange: [0, 1],
          outputRange: [500, 0],
        }),
      },
    ],
  };

  const cancelHandler = () => {
    optionsRef.current.scrollToEnd({animated: true});
  };

  const confirmCancelHandler = () => {
    // onCancelPress();
    // setProgress(0);
    // optionsRef.current.scrollTo({x: 0, y: 0, animated: true});
    socket.emit('client_stop', {lineId});
    _setVisible(false);
    dispatch(actions.logOut());
    navigation.navigate('LockScreen');
  };

  const confirmContinueHandler = () => {
    optionsRef.current.scrollTo({x: 0, y: 0, animated: true});
  };

  const handleFinished = () => {
    if(user.type) user.beers[concept.concept.toLowerCase()] -= 1;
    else doneHandler();

    console.log('finished');
    setHintText('¡Listo!');
    finishedRef.current.scrollToEnd({animated: true});
  };

  const doneHandler = () => {
    // socket.emit('client_stop', {lineId});
    _setVisible(false);
    dispatch(actions.logOut());
    navigation.navigate('LockScreen');
  };

  return (
    <Modal visible={visible} transparent={true}>
      <View style={styles.wrapper}>
        <Animated.View
          style={[styles.backdrop, StyleSheet.absoluteFill, backdropAnimStyle]}
        />

        <Animated.View style={[styles.container, promptAnimStyle]}>
          <Text style={styles.hint}>{hintText || 'Sirviendo ...'}</Text>

          <Animated.ScrollView
            ref={finishedRef}
            contentContainerStyle={{backgroundColor: 'transparent'}}
            horizontal={true}
            decelerationRate={'normal'}
            scrollEnabled={true}
            showsHorizontalScrollIndicator={false}
            snapToInterval={width}>
            <View>
              <View style={styles.cardContent}>
                <View style={styles.content}>
                  <View style={styles.progressContainer}>
                    <CircularProgress
                      activeStrokeColor={globalStyles.colors.red}
                      progressValueStyle={styles.progressValueStyle}
                      inActiveStrokeColor={globalStyles.colors.lightGray}
                      size={200}
                      strokeWidth={10}
                      progress={pouredPercentage}
                    />
                  </View>
                  <View style={styles.pouringData}>
                    <View style={{paddingLeft: 35}}>
                      <Text style={styles.dataHeaders}>Servido:</Text>
                      <Text style={[styles.dataValues]}>
                        <Text style={styles.bold}>{LivePoured} Oz</Text> /{' '}
                        {concept.qty} Oz
                      </Text>

                      {/* <Text style={styles.dataHeaders}>Saldo restante:</Text>
                      <Text style={[styles.dataValues, styles.bold]}>
                        {(UserBalance - LivePoured).toFixed(2)} Oz
                      </Text>
                      <ProgressBar
                        fill={globalStyles.colors.red}
                        progress={progress}
                      /> */}
                    </View>
                  </View>
                </View>
              </View>

              <View style={{width}}>
                <Animated.ScrollView
                  style={{height: 125}}
                  ref={optionsRef}
                  contentContainerStyle={{backgroundColor: 'transparent'}}
                  horizontal={true}
                  decelerationRate={'normal'}
                  scrollEnabled={false}
                  showsHorizontalScrollIndicator={true}>
                  <View
                    style={{
                      alignItems: 'center',
                      marginTop: 10,
                      width,
                      paddingHorizontal: 25,
                    }}>
                    <Text>
                      <Text style={styles.bold}>{concept.name}</Text> {''}
                      {concept.qty} Oz
                    </Text>
                    <RoundButton
                      style={styles.cancelButton}
                      type={'lg'}
                      onPress={cancelHandler}
                      caption="CANCEL"
                      eneable={pouredPercentage > 70}
                    />
                  </View>
                  <View
                    style={{
                      alignItems: 'center',
                      marginTop: 10,
                      width,
                      paddingHorizontal: 25,
                    }}>
                    <Text style={styles.bold}>¿Deseas cancelar?</Text>
                    <View style={[styles.twoOptions]}>
                      <RoundButton
                        style={styles.optionButton}
                        type={'md'}
                        caption="Cancelar"
                        eneable
                        onPress={confirmCancelHandler}
                      />
                      <RoundButton
                        style={styles.optionButton}
                        type={'md'}
                        color={globalStyles.colors.lightGreen}
                        caption="Continuar"
                        eneable
                        onPress={confirmContinueHandler}
                      />
                    </View>
                  </View>
                </Animated.ScrollView>
              </View>
            </View>

            <View>
              <View style={{flex: 1, alignItems: 'center', justifyContent:'center'}}>
                {/* Here there should be an animation of a check in a circle */}
                {user && user.beers ? (
                  <>
                    <Text style={styles.dataHeaders}>Saldo restante:</Text>
                    <View style={styles.availableConcepts}>
                      <View style={styles.conceptWrapper}>
                        <Text style={styles.qtyAvalable}>
                          {user.beers.pint}
                        </Text>
                        <Text style={styles.qtyPromt}>Cervezas</Text>
                      </View>
                      <View style={styles.conceptWrapper}>
                        <Text style={styles.qtyAvalable}>
                          {user.beers.taster}
                        </Text>
                        <Text style={styles.qtyPromt}>Taster</Text>
                      </View>
                      <View style={styles.conceptWrapper}>
                        <Text style={styles.qtyAvalable}>
                          {user.beers.flight}
                        </Text>
                        <Text style={styles.qtyPromt}>Pruebas</Text>
                      </View>
                    </View>
                  </>
                ) : null}
              </View>
              <View
                style={{
                  height: 125,
                  alignItems: 'center',
                  marginTop: 10,
                  width,
                  paddingHorizontal: 25,
                }}>
                <RoundButton
                  style={styles.cancelButton}
                  type={'lg'}
                  onPress={doneHandler}
                  caption="Done"
                  color={globalStyles.colors.lightGreen}
                  eneable
                />
              </View>
            </View>
          </Animated.ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  backdrop: {
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  container: {
    position: 'absolute',
    bottom: 0,
    height: 400,
    width: Dimensions.get('window').width,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  cardContent: {
    width: Dimensions.get('window').width,
    paddingBottom: 15,
    paddingHorizontal: 25,
  },
  hint: {
    ...globalStyles.texts.header2,
    marginVertical: 20,
    paddingHorizontal: 25,
  },
  content: {
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  progressContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  progressValueStyle: {
    fontWeight: '100',
    color: 'red',
    paddingBottom: 5,
    fontSize: 40,
  },
  pouringData: {
    flex: 1,
    justifyContent: 'center',
  },
  dataHeaders: {
    ...globalStyles.texts.header5,
    color: globalStyles.colors.gray,
    paddingBottom: 5,
    textTransform: 'uppercase',
  },
  dataValues: {
    ...globalStyles.texts.header2,
    color: globalStyles.colors.gray,
    fontWeight: '400',
    marginBottom: 18,
  },
  bold: {
    fontWeight: 'bold',
    color: globalStyles.colors.lightBlack,
  },
  LottieView: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  animation: {width: 225, height: 225, marginTop: -10},
  cancelButton: {
    position: 'absolute',
    bottom: 25,
  },
  twoOptions: {
    flexDirection: 'row',
    paddingTop: 17,
  },
  optionButton: {
    marginHorizontal: 10,
  },

  availableConcepts: {
    flexDirection: 'row',
    marginTop:10,
    marginBottom:10,
    // backgroundColor:'red'
  },
  conceptWrapper: {
    marginLeft: 20,
    marginRight:20,
    alignItems: 'center',
  },
  qtyAvalable: {
    ...globalStyles.texts.header1,
    color: globalStyles.colors.lightBlack,
    fontWeight: '400',
    textAlign: 'right',
  },
  qtyPromt: {
    color: globalStyles.colors.lightBlack,
    textTransform: 'uppercase',
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'left',
  },
});

export default React.forwardRef(PouringModal);
