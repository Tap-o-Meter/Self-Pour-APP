import React from 'react';
import config from '../../config';
import { useSelector } from 'react-redux';
import LottieView from 'lottie-react-native';
import globalStyles from '../../../assets/styles';
import RoundButton from '../Buttons/RoundButton';

import {
  View,
  Text,
  Modal,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
} from 'react-native';

function AndroidPrompt(props, ref) {
  const {onCancelPress} = props;
  
  const {user} = useSelector(state => state.userReducer);
  
  const [hintText, setHintText] = React.useState('');
  const [visible, setVisible] = React.useState(false);
  const [_visible, _setVisible] = React.useState(false);
  const animValue = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (ref) {
      ref.current = {
        setVisible: _setVisible,
        setHintText,
      };
    }
  }, [ref]);

  React.useEffect(() => {
    if (_visible) {
      setVisible(true);
      Animated.timing(animValue, {
        duration: 300,
        toValue: 1,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animValue, {
        duration: 300,
        toValue: 0,
        useNativeDriver: true,
      }).start(() => {
        setVisible(false);
        setHintText('');
      });
    }
  }, [_visible, animValue]);

  const backdropAnimStyle = {
    opacity: animValue,
  };

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
    onCancelPress();
    _setVisible(false);
  };

  return (
    <Modal visible={visible} transparent={true}>
      <View style={styles.content}>
        <Animated.View
          style={[styles.backdrop, StyleSheet.absoluteFill, backdropAnimStyle]}
        />

        <Animated.View style={[styles.container, promptAnimStyle]}>
          <Text style={styles.hint}>
            {hintText || 'Deslice su tarjeta \npara iniciar'}
          </Text>
          <View  style={styles.LottieView}>
          <LottieView
            style={styles.animation}
            source={config.animations.nfc}
            autoPlay
            loop
          />
          </View>
          <RoundButton
            style={styles.cancelButton}
            type={'lg'}
            onPress={cancelHandler}
            caption="CANCEL"
            eneable
          />
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  backdrop: {
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  container: {
    position: 'absolute',
    bottom: 0,
    height: 350,
    width: Dimensions.get('window').width,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 25,
    paddingHorizontal: 25,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  hint: {
    ...globalStyles.texts.header2,
    marginBottom: 20,
  },
  LottieView: {
    // backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },  
  animation: {width: 225, height: 225, marginTop: -10},
  cancelButton: {
    position: 'absolute',
    bottom: 25,
    // borderWidth: 1,
    // borderColor: '#ccc',
    // borderRadius: 8,
    // padding: 15,
  },
});

export default React.forwardRef(AndroidPrompt);
