import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import config from '../config';
import {PropTypes} from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';

const InputField = ({
  labelText,
  labelTextSize,
  labelColor,
  textColor,
  borderColor,
  inputType,
  customStyle,
  onChangeText,
  showCheckmark,
  autoFocus,
  autoCapitalize,
}) => {
  const [secureInput, setSecureInput] = useState(inputType === 'password');
  const [scaleCheckmark, setScaleCheckmark] = useState(new Animated.Value(0));

  const toggleShowPassword = () => {
    setSecureInput(!secureInput);
  };

  const scaleIcon = (value) => {
    Animated.timing(scaleCheckmark, {
      toValue: value,
      duration: 400,
      easing: Easing.easeOutBack,
    }).start();
  };

  const fontSize = labelTextSize || 14;
  const color = labelColor || 'white';
  const inputColor = textColor || 'white';
  const borderBottomColor = borderColor || 'transparent';
  const keyboardType = inputType === 'email' ? 'email-address' : 'default';
  const iconScale = scaleCheckmark.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 1.6, 1],
  });
  const scaleValue = showCheckmark ? 1 : 0;
  scaleIcon(scaleValue);
  return (
    <View style={[styles.wrapper, customStyle]}>
      <Text style={[styles.label, {fontSize, color}]}>{labelText}</Text>
      {inputType === 'password' ? (
        <TouchableOpacity
          onPress={this.toggleShowPassword}
          style={styles.showButton}>
          <Text style={styles.showButtonText}>
            {secureInput ? 'Show' : 'Hide'}
          </Text>
        </TouchableOpacity>
      ) : null}

      <Animated.View
        style={[{transform: [{scale: iconScale}]}, styles.checkmarkWrapper]}>
        <Icon name={'check'} color={config.colors.mainColor} size={20} />
      </Animated.View>
      <TextInput
        autoCorrect={false}
        autoCapitalize={autoCapitalize}
        style={[{color: inputColor, borderBottomColor}, styles.inputField]}
        secureTextEntry={secureInput}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        autoFocus={autoFocus}
      />
    </View>
  );
};

export default InputField;

InputField.propTypes = {
  labelText: PropTypes.string.isRequired,
  labelTextSize: PropTypes.number,
  labelColor: PropTypes.string,
  textColor: PropTypes.string,
  borderColor: PropTypes.string,
  inputType: PropTypes.string.isRequired,
  customStyle: PropTypes.object,
  onChangeText: PropTypes.func,
  showCheckmark: PropTypes.bool.isRequired,
  autoFocus: PropTypes.bool,
  autoCapitalize: PropTypes.string,
};

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    // borderWidth: 1,
  },
  label: {
    fontWeight: '400',
    marginTop: 5,
    marginBottom: 10,
  },
  inputField: {
    borderBottomWidth: 1,
    paddingVertical: 5,
    paddingRight: 30,
    fontSize: 15,
  },
  showButton: {
    position: 'absolute',
    right: 0,
    top: 5,
  },
  showButtonText: {
    color: config.colors.mainColor,
    fontWeight: '700',
  },
  checkmarkWrapper: {
    position: 'absolute',
    right: 0,
    bottom: 12,
  },
});
