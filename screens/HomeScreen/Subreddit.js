import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import Progress from './Progress';

const Subreddit = ({ item }) => {
  const iconStyle = {
    backgroundColor: item.color,
  };
  return (
    <Animated.View style={styles.container}>
      <View style={[styles.icon, iconStyle]}>
        <Text style={styles.iconText}>
          {item.name.toUpperCase().substring(0, 1)}
        </Text>
      </View>
      <View style={styles.progressContainer}>
        <View style={styles.row}>
          <Text style={styles.nameText}>
            {item.name} ({item.total})
          </Text>
          <View style={styles.percentContainer}>
            <Text style={styles.percentText}>{item.percent}%</Text>
          </View>
        </View>

        <Progress progress={item.percent} />
      </View>
    </Animated.View>
  );
};

export default Subreddit;

const styles = StyleSheet.create({
  container: {
    paddingLeft: 16,
    paddingRight: 32,
    paddingVertical: 8,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  icon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  nameText: {
    fontSize: 12,
    flex: 1,
    marginBottom: 4,
    color: 'black',
    marginRight: 4,
  },
  totalText: {
    fontSize: 12,
    color: 'black',
  },
  progressContainer: {
    flex: 1,
  },
  totalContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    flex: 0.1,
  },
  row: {
    flexDirection: 'row',
  },
  percentText: {
    fontSize: 10,
    color: 'black',
  },
  percentContainer: {
    borderRadius: 10,
    paddingHorizontal: 6,
    backgroundColor: 'lightgrey',
    height: 14,
    marginTop: 2,
  },
});
