import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';

const App = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  function getTotals(result) {
    const totals = [];
    const children = result.data.data.children;
    children.forEach(child => {
      const subreddit = child.data.subreddit;
      const match = totals.find(x => x.subreddit === subreddit);
      if (match) {
        match.total += 1;
      } else {
        totals.push({
          subreddit,
          total: 1,
        });
      }
    });
    return totals;
  }

  async function getAllComments() {
    setIsLoading(true);
    let result = await axios.get(
      'https://www.reddit.com/user/mgp23/comments.json?limit=100',
    );

    const totals = getTotals(result);
    setData(
      totals.map(x => {
        return {
          subreddit: x.subreddit,
          total: x.total,
        };
      }),
    );
    while (result.data.data.after && result.data.data.after.length > 0) {
      result = await axios.get(
        `https://www.reddit.com/user/mgp23/comments.json?limit=100&after=${result.data.data.after}`,
      );
      await new Promise(resolve => setTimeout(resolve, 1000));
      const newTotals = getTotals(result);
      newTotals.forEach(x => {
        const match = totals.find(y => y.subreddit === x.subreddit);
        if (match) {
          match.total += 1;
        } else {
          totals.push({
            subreddit: x.subreddit,
            total: 1,
          });
        }
      });
      setData(
        totals
          .sort((x, y) => x.total - y.total)
          .map(z => {
            return {
              subreddit: z.subreddit,
              total: z.total,
            };
          }),
      );
    }
    setIsLoading(false);
  }

  useEffect(() => {
    getAllComments();
  }, []);

  const styles = StyleSheet.create({
    container: {
      padding: 40,
    },
    loading: {
      alignSelf: 'center',
    },
  });

  return (
    <View style={styles.container}>
      {data &&
        data
          .sort((x, y) => {
            return y.total - x.total;
          })
          .map(x => {
            return (
              <Text key={x.subreddit}>
                {x.subreddit} : {x.total}
              </Text>
            );
          })}
      {isLoading && <ActivityIndicator style={styles.loading} />}
    </View>
  );
};
export default App;
