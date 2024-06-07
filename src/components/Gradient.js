import React from 'react';
import {StyleSheet} from 'react-native';
import Svg, {Rect, Defs, LinearGradient, Stop} from 'react-native-svg';

const Gradient = ({color1, color2, opacity1, opacity2, offset1, offset2}) => {
  const stopColor1 = color1 || 'black';
  const stopColor2 = color2 || '#1e272e';
  const stopOpacity1 = opacity1 || '1';
  const stopOpacity2 = opacity2 || '1';
  const offSet1 = offset1 || '0%';
  const offSet2 = offset2 || '100%';
  return (
    <Svg style={StyleSheet.absoluteFill} height="100%" width="100%">
      <Defs>
        <LinearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="grad">
          <Stop
            stopColor={stopColor1}
            stopOpacity={stopOpacity1}
            offset={offSet1}
          />
          <Stop
            stopColor={stopColor2}
            stopOpacity={stopOpacity2}
            offset={offSet2}
          />
        </LinearGradient>
      </Defs>
      <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad)" />
    </Svg>
  );
};

export default Gradient;
