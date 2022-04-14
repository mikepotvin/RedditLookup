import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, TextInput } from 'react-native-paper';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDecay,
  withSpring,
  withTiming,
  SlideInUp,
  SlideInDown,
} from 'react-native-reanimated';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';
import {
  getHeaderStartX,
  getHeaderStartY,
  loadAllSubreddits,
} from './functions';
import Subreddit from './Subreddit';

const HomeScreen = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const headerStyle = {
    width: width * 0.7,
  };
  const listStyle = {
    marginTop: styles.header.height + 32,
  };
  const headerY = useSharedValue(getHeaderStartY(height, styles.header.height));
  const headerX = useSharedValue(getHeaderStartX(width, headerStyle.width));

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: headerY.value,
        },
        {
          translateX: headerX.value,
        },
      ],
    };
  });

  useEffect(() => {
    if (isLoading) {
      headerY.value = withTiming(insets.top + 16, {
        duration: 500,
      });
      headerX.value = withTiming(16, {
        duration: 500,
      });
    }
  }, [isLoading]);

  async function go() {
    setIsLoading(true);
    await loadAllSubreddits(name, (update) => {
      setData(update.sort((x, y) => y.total - x.total));
    });
    setIsLoading(false);
  }
  return (
    <SafeAreaView style={styles.container}>
      {data && data.length > 0 && (
        <Animated.FlatList
          entering={SlideInDown}
          data={data}
          style={listStyle}
          renderItem={({ item }) => <Subreddit item={item} />}
          keyExtractor={(item) => item.name}
        ></Animated.FlatList>
      )}

      <Animated.View style={[styles.header, headerStyle, animatedStyle]}>
        <View style={{ flexDirection: 'row' }}>
          <TextInput
            type="flat"
            dense
            onBlur={go}
            label="Username"
            style={styles.input}
            value={name}
            onChangeText={(text) => setName(text)}
          />
          {isLoading && <ActivityIndicator />}
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  header: {
    position: 'absolute',
    height: 50,
  },
  headerText: {
    fontSize: 20,
    marginRight: 16,
  },
  loading: {
    alignSelf: 'center',
  },
  input: {
    marginRight: 16,
    flex: 1,
    backgroundColor: 'white',
  },
  button: {},
});
