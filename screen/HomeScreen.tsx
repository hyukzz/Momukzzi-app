import React from 'react';
import { StyleSheet, View, SafeAreaView, Image } from 'react-native';

import { LOGO_URL } from '@env';
import Nav from '../components/Nav';
const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.view}>
        <Image
          style={{ width: 140, height: 150, resizeMode: 'contain' }}
          source={{
            uri: LOGO_URL,
          }}
        />

        <Nav />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: 'white',
    height: '100%',
  },
  view: {
    padding: 12,
  },
});
