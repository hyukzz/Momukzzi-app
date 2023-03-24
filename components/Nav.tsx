import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';

import { navData } from '../data/navData';

const Nav = () => {
  return (
    <FlatList
      data={navData}
      keyExtractor={(item) => item.id}
      horizontal
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.touchableOpacity} activeOpacity={0.7}>
          <View>
            <Image
              style={{
                width: 120,
                height: 100,
                resizeMode: 'contain',
              }}
              source={{ uri: item.image }}
            />
            <Text style={styles.text}>{item.title}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default Nav;

const styles = StyleSheet.create({
  touchableOpacity: {
    padding: 8,
    paddingTop: 16,
    paddingBottom: 24,
    backgroundColor: '#FAE39C',
    margin: 8,
    width: 160,
    alignItems: 'center',
  },
  text: {
    marginTop: 8,
    paddingTop: 8,
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});
