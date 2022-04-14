import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, TextInput } from 'react-native-paper';
import Animated from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { loadAllSubreddits } from './functions';
import Subreddit from './Subreddit';

const HomeScreen = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');

  async function go() {
    setIsLoading(true);
    await loadAllSubreddits(name, (update) => {
      setData(update.sort((x, y) => y.total - x.total));
    });
    setIsLoading(false);
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
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
      <Animated.FlatList
        data={data}
        renderItem={({ item }) => <Subreddit item={item} />}
        keyExtractor={(item) => item.name}
      ></Animated.FlatList>
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
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    marginRight: 16,
  },
  loading: {
    alignSelf: 'center',
  },
  input: {
    flex: 0.5,
    marginRight: 16,
    backgroundColor: 'white',
  },
  button: {},
});
