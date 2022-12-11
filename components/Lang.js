import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native';
import { MainScreen } from './styles/GL';

// const HEADER_HEIGHT = Platform.OS === "ios" ? 44 : 56;

const Language = () => {
  return (
    <View style={{ flex: 1 }}>
      <View style={MainScreen.container}>
        <View style={MainScreen.textViewCont}>
          <Text style={[MainScreen.text, { fontSize: 16 }]}>Lang</Text>
        </View>
        <View style={[MainScreen.containerAll, { alignItems: 'center', justifyContent: 'center' }]}>
          <Text style={{ fontSize: 24, fontFamily: 'RobotoBold', color: '#442C2E' }}>Скоро появится</Text>
        </View>
      </View>
    </View>
  );

}

const styles = StyleSheet.create({

});

export default Language;