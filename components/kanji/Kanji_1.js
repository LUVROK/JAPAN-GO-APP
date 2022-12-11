import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Alert, Button } from 'react-native';
// import * as jsonFile1 from './kanji-wanikani.json';
import * as jsonFile2 from './localization.json';
import React, { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { Ionicons } from '@expo/vector-icons';

// react-native-signature-canvas expo-speech 

export default function Kanji_1() {

    const navigation = useNavigation();

    const [N5, setN5] = useState([])
    const [N4, setN4] = useState([])
    const [N3, setN3] = useState([])
    const [N2, setN2] = useState([])
    const [N1, setN1] = useState([])
    const [N5DATA, setN5DATA] = useState([])
    const [reload, setReload] = useState(true)

    useEffect(() => {
        if (reload === true) {
            for (const [key, value] of Object.entries(jsonFile2.N5)) {
                setN5(N5 => [...N5, { kanji: value.kanji, value: value }]);
                // console.log(`${key} - ${JSON.stringify(value)}`)
            }
            setReload(false)
        }
        // console.log(N5)
    }, [])

    const ToKanjiTheory = (data) => {
        navigation.navigate("KanjiTheory", {
            data: data
        })
    }

    return (
        <ScrollView style={{ backgroundColor: '#fff', flex: 1 }}>
            <Pressable style={styles.arrowBlack} onPress={() => navigation.navigate("Tab")}>
                <Ionicons name="chevron-back" size={36} color="black" />
                <Text style={styles.arrowBlackText}>Назад</Text>
            </Pressable>
            <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ top: 40, fontSize: 18 }}>Кандзи: Уровень 1</Text>
            </View>
            <View style={styles.container}>
                {
                    N5.map((data, i) => (
                        <Pressable key={i} style={styles.trainer} onPress={() => ToKanjiTheory(data)}>
                            <Text style={styles.trainerText}>{data.kanji}</Text>
                            <Text style={styles.trainerTextMini}>{data.value.meaning[0]}</Text>
                        </Pressable>
                    ))
                }
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
        marginBottom: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginLeft: 15,
        marginTop: 60
    },
    arrowBlack: {
        display: 'flex',
        padding: 10,
        paddingTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        width: '40%',
        // backgroundColor: 'yellow'
        // borderBottomWidth: 1,
        // borderColor: '#442C2E',
    },
    arrowBlackText: {
        paddingLeft: 0,
        fontSize: 18,
    },
    trainer: {
        height: 75,
        width: 75,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#FEDBD0',
        borderRadius: 15,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 15,
        marginBottom: 15,
        marginTop: 0,
    },
    trainerText: {
        // fontFamily: 'RobotoBold',
        margin: 0,
        padding: 0,
        // marginTop: 0,
        // marginBottom: 0,
        fontSize: 28,
        color: '#442C2E',
        // backgroundColor: 'yellow'
    },
    trainerTextMini: {
        color: '#442C2E',
        bottom: -5,
        // margin: 0,
        // padding: 0,
        fontSize: 10.5,
        opacity: 0.6,
        // backgroundColor: 'yellow',
        textAlign: 'center',
        flexWrap: 'wrap'
    },
});
