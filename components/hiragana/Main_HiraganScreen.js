import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, View, ScrollView, Pressable } from 'react-native';
import { HK_stylesMainScreen } from '../styles/HK_stylesMainScreen';
import ComponentTaskH from './ComponentTaskH';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios'
import { baseURL } from '../axiosUrl.js'

axios.defaults.baseURL = `${baseURL}`

const Main_HiraganScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={HK_stylesMainScreen.container}>
            <ScrollView style={{ marginBottom: 30 }}>
                <Pressable style={{ margin: 0 }} onPress={() => navigation.navigate("Tab")}>
                    <AntDesign name="left" size={32} color="#442C2E" style={[HK_stylesMainScreen.iconAntD, { left: 0, margin: 20, marginLeft: 15 }]} />
                    <Text style={[HK_stylesMainScreen.trainerText, { paddingLeft: 40, margin: 26, fontSize: 18 }]}>Хирагана</Text>
                </Pressable>
                <ComponentTaskH textMain='Ряд 1' textMainMini='あ, い, う, え, お' onPress={['あ い う え お', 1, 1, 'hiraganas']} />
                <ComponentTaskH textMain='Ряд 2' textMainMini='か, き, く, け, こ' onPress={['か き く け こ', 2, 6, 'hiraganas']} />
                <ComponentTaskH textMain='Ряд 3' textMainMini='さ, し, す, せ, そ' onPress={['さ し す せ そ', 3, 11, 'hiraganas']} />
                <ComponentTaskH textMain='Ряд 4' textMainMini='た, ち, つ, て, と' onPress={['た ち つ て と', 4, 16, 'hiraganas']} />
                <ComponentTaskH textMain='Ряд 5' textMainMini='な, に, ぬ, ね, の' onPress={['な に ぬ ね の', 5, 21, 'hiraganas']} />
                <ComponentTaskH textMain='Ряд 6' textMainMini='は, ひ, ふ, へ, ほ' onPress={['は ひ ふ へ ほ', 6, 26, 'hiraganas']} />
                <ComponentTaskH textMain='Ряд 7' textMainMini='ま, み, む, め, も' onPress={['ま み む め も', 7, 31, 'hiraganas']} />
                <ComponentTaskH textMain='Ряд 8' textMainMini='や, ゆ, よ' onPress={['や ゆ よ', 8, 36, 'hiraganas']} />
                <ComponentTaskH textMain='Ряд 9' textMainMini='ら, り, る, れ, ろ' onPress={['ら り る れ ろ', 9, 39, 'hiraganas']} />
                <ComponentTaskH textMain='Ряд 10' textMainMini='わ, を, ん' onPress={['わ ん を', 10, 44, 'hiraganas']} />
            </ScrollView>
        </View>
    );

}

export default Main_HiraganScreen;