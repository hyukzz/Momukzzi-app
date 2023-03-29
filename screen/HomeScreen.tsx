import React from 'react';
import { StyleSheet, View, SafeAreaView, Image } from 'react-native';

// @ts-ignore
import Logo from '../assets/MainLogo.png';
import Nav from '../components/Nav';
import { useLocationUpdates } from '../hooks/useLocationUpdates';

type MapType = {
  map: Location;
};

const HomeScreen = ({ map }: MapType) => {
  useLocationUpdates(map);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.view}>
        <Image
          style={{ width: 150, height: 150, resizeMode: 'contain' }}
          source={Logo}
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
