import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { store } from './store/store';
import HomeScreen from './screen/HomeScreen';
import ShopInfo from './components/ShopInfo';
export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="ShopInfo" component={ShopInfo} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
