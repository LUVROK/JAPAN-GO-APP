import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, View, ScrollView, Pressable } from 'react-native';
import ComponentTaskH from '../hiragana/ComponentTaskH';
import axios from 'axios'
import { HK_stylesMainScreen } from '../styles/HK_stylesMainScreen'
import { AntDesign } from '@expo/vector-icons';
import { baseURL } from '../axiosUrl.js'

axios.defaults.baseURL = `${baseURL}`

const Main_KatakanaScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={HK_stylesMainScreen.container}>
            <ScrollView style={{ marginBottom: 30 }}>
                <Pressable style={{ margin: 0 }} onPress={() => navigation.navigate("Tab")}>
                    <AntDesign name="left" size={32} color="#442C2E" style={[HK_stylesMainScreen.iconAntD, { left: 0, margin: 20, marginLeft: 15 }]} />
                    <Text style={[HK_stylesMainScreen.trainerText, { paddingLeft: 40, margin: 26, fontSize: 18 }]}>Катакана</Text>
                </Pressable>
                <ComponentTaskH textMain='Ряд 1' textMainMini='ア, イ, ウ, エ, オ' onPress={['ア イ ウ エ オ', 1, 1, 'katakanas']} />
                <ComponentTaskH textMain='Ряд 2' textMainMini='カ, キ, ク, ケ, コ' onPress={['カ キ ク ケ コ', 2, 6, 'katakanas']} />
                <ComponentTaskH textMain='Ряд 3' textMainMini='サ, シ, ス, セ, ソ' onPress={['サ シ ス セ ソ', 3, 11, 'katakanas']} />
                <ComponentTaskH textMain='Ряд 4' textMainMini='タ, チ, ツ, テ, ト' onPress={['タ チ ツ テ ト', 4, 16, 'katakanas']} />
                <ComponentTaskH textMain='Ряд 5' textMainMini='ナ, ニ, ヌ, ネ, ノ' onPress={['ナ ニ ヌ ネ ノ', 5, 21, 'katakanas']} />
                <ComponentTaskH textMain='Ряд 6' textMainMini='ハ, ヒ, フ, ヘ, ホ' onPress={['ハ ヒ フ ヘ ホ', 6, 26, 'katakanas']} />
                <ComponentTaskH textMain='Ряд 7' textMainMini='マ, ミ, ム, メ, モ' onPress={['マ ミ ム メ モ', 7, 31, 'katakanas']} />
                <ComponentTaskH textMain='Ряд 8' textMainMini='ヤ, ユ, ヨ' onPress={['ヤ ユ ヨ', 8, 36, 'katakanas']} />
                <ComponentTaskH textMain='Ряд 9' textMainMini='ラ, リ, ル, レ, ロ' onPress={['ラ リ ル レ ロ', 9, 39, 'katakanas']} />
                <ComponentTaskH textMain='Ряд 10' textMainMini='ワ, ン, ヲ' onPress={['ワ ン ヲ', 10, 44, 'katakanas']} />
            </ScrollView>
        </View>
    );

}

export default Main_KatakanaScreen;