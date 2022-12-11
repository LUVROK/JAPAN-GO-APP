import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, Pressable, ImageBackground, Alert, Animated, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MainScreen } from './styles/GL';
import { AntDesign } from '@expo/vector-icons';
import ButtonHKK from './ButtonHKK';

const STATUS_BAR_HEIGHT = Platform.OS === "ios" ? 0 : StatusBar.currentHeight; //отдельно высота для ios формочки
// const HEADER_HEIGHT = Platform.OS === "ios" ? 44 : 56;
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const Main = () => {
  const [touch, setTouch] = useState('noup');
  const [returnedData, setReturnedData] = useState([])
  const navigation = useNavigation();

  const hundleHiragana = async (setTask) => {
    navigation.navigate('Main_HiraganScreen');
  }

  const hundleKatakana = async (setTask) => {
    navigation.navigate('Main_KatakanaScreen');
  }

  const hundleKanjiLvl1 = async (setTask) => {
    navigation.navigate('Kanji_1');
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={[MainScreen.textViewCont, styles.shadow]}>
        <Text style={[MainScreen.text, { fontSize: 16 }]}>JAPAN <Text style={{ color: 'red', fontFamily: 'RobotoBold' }}>GO</Text></Text>
      </View>
      <ScrollView style={MainScreen.containerAll}>
        <Text style={[MainScreen.text, { marginTop: 0, paddingBottom: 0, marginBottom: 0, fontSize: 18 }]}>Слоговые азбуки</Text>
        <View style={MainScreen.trainerContainer}>
          <ButtonHKK hundleHiragana={hundleHiragana} messege='allhiragana' source={require('../resources/img/Hiragana_Main.jpg')} textMain='Хирагана' styling={{ color: '#442C2E' }} />
          <ButtonHKK hundleHiragana={hundleKatakana} messege='allkatakana' source={require('../resources/img/Katakana_Main.jpeg')} textMain='Катакана' styling={{ color: '#442C2E' }} />
          <Text style={[MainScreen.text, { marginTop: 0, paddingBottom: 20, marginBottom: 0, fontSize: 18 }]}>Кандзи</Text>
          <ButtonHKK hundleHiragana={hundleKanjiLvl1} messege='Kanji_1' source={require('../resources/img/kanji_1.jpeg')} textMain='Кандзи Уровень 1' styling={{ color: '#FEEAE6' }} />
        </View>
        {/* <View><Image style={MainScreen.img1} source={require('../resources/img/photo.jpg')}/></View> */}
        {/* <Text style={{ color: '#442C2E' }}>{touch}</Text> */}
      </ScrollView>
    </View>
  );

}

const styles = StyleSheet.create({
  shadow: {
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2
    },
  },
  trainerText: {
    fontFamily: 'RobotoBold',
    margin: 20,
    fontSize: 16,
    color: '#442C2E',
  }
});

export default Main;