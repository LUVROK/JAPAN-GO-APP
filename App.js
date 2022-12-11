import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Navigate } from './navigate';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';

const App = () => {

  const [loaded] = useFonts({
    RobotoBold: require('./assets/fonts/Roboto-Bold.ttf'),
    RobotoLight: require('./assets/fonts/Roboto-Light.ttf'),
    RobotoRegular: require('./assets/fonts/Roboto-Regular.ttf'),
    NotoSansBold: require('./assets/fonts/NotoSans-Bold.ttf'),
    NotoSansLight: require('./assets/fonts/NotoSans-Light.ttf'),
    NotoSansMedium: require('./assets/fonts/NotoSans-Medium.ttf'),
    NotoSansRegular: require('./assets/fonts/NotoSans-Regular.ttf'),
    NotoSansSemiBold: require('./assets/fonts/NotoSans-SemiBold.ttf')
  });

  return (
    <NavigationContainer>
      <StatusBar hidden />
      <Navigate />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({

});

export default App;