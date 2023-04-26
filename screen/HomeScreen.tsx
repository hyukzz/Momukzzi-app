import React from 'react';
import { StyleSheet, View, SafeAreaView, Image } from 'react-native';

// @ts-ignore
import Logo from '../assets/MainLogo.png';
import Nav from '../components/Nav';
import { useLocationUpdates } from '../hooks/useLocationUpdates';

const HomeScreen = ({ map }: any) => {
  useLocationUpdates(map);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.view}>
        <Image
          style={{
            width: 140,
            height: 140,
            resizeMode: 'cover',
          }}
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
    height: '100%',
    backgroundColor: 'white',
  },
  view: {
    padding: 12,
  },
});
