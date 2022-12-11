import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View, Text, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import styleHK from "./styleHK";

export default function Result({ route }) {

    const navigation = useNavigation();

    const [corProc, setCorProc] = useState('')

    useEffect(() => {
        console.log('route - ' + JSON.stringify(route.params.correctAnswers))
        let cor = 0;
        for (let i = 1; i <= 10; i++) {
            route.params.correctAnswers[i] === true ? cor++ : null;
        }
        cor = `${cor * 10}%`;
        setCorProc(cor)
        console.log(cor)
        // cor => 6 ? AsyncStorage
    }, [])

    const goBack = () => {
        route.params.alphabet === 'hiraganas'
            ? navigation.navigate("Main_HiraganScreen")
            : navigation.navigate("Main_KatakanaScreen")
    }

    return (
        <View style={styles.container}>
            <View style={styles.statCont}>
                <Text style={styles.TextstatCont}>Процент верных ответов - {corProc}</Text>
                <Text style={[styles.TextstatCont, { top: 50, fontSize: 24 }]}>Отлично!</Text>
            </View>
            <Pressable style={[styleHK.btn, { width: 250, position: 'absolute', bottom: 100 }]} onPress={goBack}><Text style={styleHK.textbackANDforth}>Продолжить</Text></Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // marginTop: 100,
        // marginLeft: 20,
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    statCont: {
        alignItems: 'center',
    },
    TextstatCont: {
        fontSize: 16,
        // fontFamily: 'RobotoLight',

    }
})