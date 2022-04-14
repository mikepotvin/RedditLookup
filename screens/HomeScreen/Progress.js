import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from 'react-native-reanimated';

const Progress = ({ progress }) => {
  const amount = useSharedValue(0);

  useEffect(() => {
    amount.value = withSpring(progress);
  }, [progress]);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      width: `${amount.value}%`,
    };
  });
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.progress, animatedStyles]} />
    </View>
  );
};

export default Progress;

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    height: 12,
    backgroundColor: '#AEAEAE',
  },
  progress: {
    borderRadius: 16,
    height: 12,
    backgroundColor: '#759CC9',
    width: '0%',
  },
});
