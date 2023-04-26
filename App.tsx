import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { store } from './store/store';
import HomeScreen from './screen/HomeScreen';
import ShopInfo from './components/ShopInfo';

export default function App(): JSX.Element {
  const Stack = createNativeStackNavigator();

  return (
    <>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ShopInfo"
              component={ShopInfo}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
}
