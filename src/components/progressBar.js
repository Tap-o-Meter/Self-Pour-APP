import React, {useState, useEffect, useMemo} from 'react';
import {View, StyleSheet} from 'react-native';
import Svg, {Rect} from 'react-native-svg';
import Animated, {
  Easing,
  useSharedValue,
  withTiming,
  useAnimatedProps,
} from 'react-native-reanimated';

const AnimatedRect = Animated.createAnimatedComponent(Rect);

const Progress = ({progress, fill}) => {
  const fillColor = fill || '#3498DB';
  const animatedProgress = useSharedValue(0);

  useEffect(() => {
    //   animatedProgress.value = withTiming(progress, { duration: 500, easing: Easing.ease });
    animatedProgress.value = progress;
  }, [progress]);

  const animatedProps = useAnimatedProps(() => {
    return {
      width: `${animatedProgress.value * 100}%`,
    };
  });

  return (
    <View style={styles.container}>
      <Svg height="20" width="100%">
        <Rect
          width="100%"
          height="100%"
          fill={fillColor}
          style={{opacity: 0.4}}
        />
        <AnimatedRect
          height="100%"
          fill={fillColor}
          animatedProps={animatedProps}
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 7,
    borderRadius: 10,
    overflow: 'hidden',
  },
});

export default Progress;

// const App = () => {
//   const [progress, setProgress] = useState(0.6);

//   return (
//     <View style={styles.appContainer}>
//       <Progress progress={progress} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   appContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   container: {
//     width: '80%',
//     height: 20,
//     borderRadius: 10,
//     overflow: 'hidden',
//   },
// });

// export default App;
