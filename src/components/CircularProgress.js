import React from 'react';
import { Circle, Svg, Text } from 'react-native-svg';

const CircularProgress = ({
  size,
  strokeWidth,
  progress,
  activeStrokeColor,
  inActiveStrokeColor,
  progressValueStyle
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - progress / 100 * circumference;

  return (
    <Svg width={size} height={size}>
      <Circle
        stroke={inActiveStrokeColor}
        fill="none"
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={strokeWidth}
      />
      <Circle
        stroke={activeStrokeColor}
        fill="none"
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={strokeWidth}
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        transform={`rotate(-90, ${size / 2}, ${size / 2})`}
      />
      <Text
        fill={progressValueStyle.color || 'black'}
        fontSize={progressValueStyle.fontSize || '16'}
        x={size / 2}
        y={size / 2 + (progressValueStyle.fontSize || 16) / 3} // Ajuste para centrar verticalmente
        textAnchor="middle"
        fontWeight={progressValueStyle.fontWeight || 'normal'}
      >
        {`${progress}%`}
      </Text>
    </Svg>
  );
};

export default CircularProgress;
