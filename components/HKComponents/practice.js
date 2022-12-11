import { useNavigation } from "@react-navigation/native"
import React, { useEffect, useState } from "react"
import { View, Text, Button, Pressable, StyleSheet, Alert } from 'react-native'
import styleHK from "./styleHK";
import Ionicons from 'react-native-vector-icons/Ionicons';
import FlashMessage from "react-native-flash-message";
import { showMessage, hideMessage } from "react-native-flash-message";
import { playSound, switchSound } from "./soundPlay";

export default function Practice({ route }) {

    const navigation = useNavigation();

    const [press1, setPress1] = useState(false)
    const [press2, setPress2] = useState(false)
    const [press3, setPress3] = useState(false)
    const [press4, setPress4] = useState(false)
    const [disable, setDisable] = React.useState(false);

    const [page, setPage] = useState(0)
    const [row, setRow] = useState({ "row": route.params.simplerow })
    const [rowNumber, setRowNumber] = useState({ "rowNumber": route.params.rowNumber })
    const [maxPage, setMaxPage] = useState(route.params.maxPage)
    const [stateSymbol, setStateSymbol] = useState('')
    const [stateRomaji, setStateRomaji] = useState('')
    const [statePolivanov, setStatePolivanov] = useState('')
    const [MassiveSymbols, setMassiveSymbols] = useState({ 0: '', 1: '', 2: '', 3: '' })
    const [PagesMassiveSymbols, setPagesMassiveSymbols] = useState({ 0: '', 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '', 9: '' })
    const [correctAnswer, setCorrectAnswer] = useState(false)
    const [correctAnswers, setCorrectAnswers] = useState({ 1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false })

    useEffect(() => {

        // console.log('maxPage - ' + maxPage)

        let result = [];

        while (result.length < 10) {
            const beeee = []
            if (route.params.rowNumber === 10 || route.params.rowNumber === 8) {
                beeee = getRandomNumbersInRange(maxPage - 5, maxPage - 2, 3);
                for (let i = 0; i < 3; i++) {
                    result.push(beeee[i]);
                }
            }
            else {
                beeee = getRandomNumbersInRange(maxPage - 5, maxPage, 5);
                for (let i = 0; i < 5; i++) {
                    result.push(beeee[i]);
                }
            }
        }
        // console.log(result)

        for (let i = 0; i < 10; i++) {
            let syb = route.params.resources.find(el => el.id === result[i]);
            PagesMassiveSymbols[i] = syb["writing"];
        }

        // console.log(PagesMassiveSymbols)
        setStateSymbol(PagesMassiveSymbols[0])
        let romaji = route.params.resources.find(el => el.writing === PagesMassiveSymbols[0])
        let Polivanov = route.params.resources.find(el => el.writing === PagesMassiveSymbols[0])
        setStateRomaji(romaji["romaji"])
        setStatePolivanov(Polivanov["polivanov"])
        MassiveSymbolsGo(page);

    }, []);

    function MassiveSymbolsGo(pages) {
        if (route.params.rowNumber === 10 || route.params.rowNumber === 8) {
            let res = getRandomNumbersInRange(maxPage - 5, maxPage - 2, 3);
            for (let i = 0; i < 3; i++) {
                let syb = route.params.resources.find(el => el.id === res[i]);
                MassiveSymbols[i] = syb["romaji"];
            }
        }
        else {
            let res = getRandomNumbersInRange(maxPage - 5, maxPage, 4);
            for (let i = 0; i < 4; i++) {
                let syb = route.params.resources.find(el => el.id === res[i]);
                MassiveSymbols[i] = syb["romaji"];
            }
        }

        let romaji = route.params.resources.find(el => el.writing === PagesMassiveSymbols[pages]);
        let checksymbol = route.params.resources.find(el => el.romaji === romaji["romaji"]);
        let checkbool = false;
        // console.log('Massive - ' + JSON.stringify(MassiveSymbols))
        // console.log('romaji - ' + JSON.stringify(romaji))
        // console.log('checksymbol - ' + checksymbol["romaji"])
        for (let i = 0; i <= 3; i++) {
            if (checksymbol["romaji"] === MassiveSymbols[i]) {
                // console.log('YES')
                checkbool = true
            }
        }
        if (checkbool === false) {
            if (route.params.rowNumber === 10 || route.params.rowNumber === 8) {
                let res = getRandomNumbersInRange(1, 3, 1);
                MassiveSymbols[res] = romaji["romaji"];
            }
            else {
                // console.log('romaji ' + JSON.stringify(romaji))
                // console.log(route.params.resources.find(el => el.romaji === romaji["romaji"]));
                let res = getRandomNumbersInRange(1, 4, 1);
                MassiveSymbols[res] = romaji["romaji"];
            }
        }
    }

    function getRandomNumbersInRange(min, max, count) {
        let result = [];
        while (result.length < count) {
            const randomNumber = Math.floor(Math.random() * (max - min)) + min;
            if (result.indexOf(randomNumber) === -1) {
                result.push(randomNumber);
            }
        }
        return result;
    }

    const SecondScreen = async () => {
        correctAnswers[page + 1] = correctAnswer;
        correctAnswer === true
            ? showMessage({
                message: "Верный ответ",
                type: "default",
                backgroundColor: "#3CB371",
                color: "#000",
                autoHide: true,
                style: styles.message,
                textStyle: styles.textMessage,
                icon: { icon: "success", position: "left", },
                // animationDuration: 125
                duration: 550
            })
            : showMessage({
                message: "Неверный ответ",
                type: "default",
                backgroundColor: "#FFAA00",
                color: "#000",
                autoHide: true,
                style: styles.message,
                textStyle: styles.textMessage,
                icon: { icon: "info", position: "left", },
                // animationDuration: 125
                duration: 550
            })
        if (page >= 9) {
            console.log(correctAnswers)
            setTimeout(() => {
                navigation.navigate("Result", {
                    correctAnswers: correctAnswers,
                    alphabet: route.params.alphabet
                });
            }, 1000)
        }
        else {
            setPress1(false)
            setPress2(false)
            setPress3(false)
            setPress4(false)
            await setDisable(false)
            await MassiveSymbolsGo(page + 1);
            await setPage(page + 1)
            let syb = route.params.resources.find(el => el.writing === PagesMassiveSymbols[page + 1]);
            await setStateSymbol(syb["writing"])
            await setStateRomaji(syb["romaji"])
            await setStatePolivanov(syb["polivanov"])
        }
    }

    const checkAnswer = (check, press) => {
        switchSound(check)
        // console.log(check)
        // console.log(stateRomaji)
        setDisable(true)
        if (check === stateRomaji) {
            setCorrectAnswer(true)
            // console.log(true)
        }
        else {
            setCorrectAnswer(false)
            // console.log(false)
        }
        switch (press) {
            case 1: setPress1(true), setPress2(false), setPress3(false), setPress4(false); break;
            case 2: setPress2(true), setPress1(false), setPress3(false), setPress4(false); break;
            case 3: setPress3(true), setPress1(false), setPress2(false), setPress4(false); break;
            case 4: setPress4(true), setPress2(false), setPress3(false), setPress1(false); break;
        }
    }

    return (
        <View style={styleHK.mainComp}>
            <FlashMessage position="top" />
            <Pressable style={styleHK.arrowBlack} onPress={() => navigation.navigate("Tab")}>
                <Ionicons name="arrow-back" size={28} color="black" />
                <Text style={styleHK.arrowBlackText}>{route.params.simplerow}</Text>
            </Pressable>
            <Pressable style={[styleHK.PressableSwitchSound, { marginBottom: 30, marginTop: 100 }]} onPress={null}>
                <Text style={styleHK.textstateSymbol}>{stateSymbol}</Text>
                <View style={styleHK.flexRow}>
                    {/* <Text style={styleHK.stateRP}>{stateRomaji} / </Text>
                    <Text style={styleHK.stateRP}>{statePolivanov}</Text> */}
                </View>
            </Pressable>
            <View style={[styleHK.backANDforth, styleHK.btnPractices]}>
                <Pressable
                    style={press1 === true
                        ? [styleHK.btn, styleHK.btnPracticePress, styles.focus]
                        : [styleHK.btn, styleHK.btnPracticePress]
                    }
                    onPress={() => checkAnswer(MassiveSymbols[0], 1)}>
                    <Text style={[styleHK.textbackANDforth, styleHK.textbtnPractices]}>{MassiveSymbols[0]}</Text>
                </Pressable>
                <Pressable
                    style={press2 === true
                        ? [styleHK.btn, styleHK.btnPracticePress, styles.focus]
                        : [styleHK.btn, styleHK.btnPracticePress]
                    }
                    onPress={() => checkAnswer(MassiveSymbols[1], 2)}>
                    <Text style={[styleHK.textbackANDforth, styleHK.textbtnPractices]}>{MassiveSymbols[1]}</Text>
                </Pressable>
            </View>
            <View style={[styleHK.backANDforth, styleHK.btnPractices]}>
                <Pressable
                    style={press3 === true
                        ? [styleHK.btn, styleHK.btnPracticePress, styles.focus]
                        : [styleHK.btn, styleHK.btnPracticePress]
                    }
                    onPress={() => checkAnswer(MassiveSymbols[2], 3)}>
                    <Text style={[styleHK.textbackANDforth, styleHK.textbtnPractices]}>{MassiveSymbols[2]}</Text>
                </Pressable>
                {
                    route.params.rowNumber === 8 || route.params.rowNumber === 10
                        ?
                        null
                        :
                        <Pressable
                            style={[press4 === true
                                ? [styleHK.btn, styleHK.btnPracticePress, styles.focus]
                                : [styleHK.btn, styleHK.btnPracticePress],
                            ]}
                            onPress={() => checkAnswer(MassiveSymbols[3], 4)}>
                            <Text style={[styleHK.textbackANDforth, styleHK.textbtnPractices]}>{MassiveSymbols[3]}</Text>
                        </Pressable>
                }
            </View>
            <View style={styleHK.backANDforth}>
                {/* <Pressable style={[styleHK.btn, { width: 150, marginRight: -30, backgroundColor: 'gray' }]} onPress={BackScreen}><Text style={styleHK.textbackANDforth}>Назад</Text></Pressable> */}
                <Pressable style={[styleHK.btn, { width: 300 }, disable === true ? null : styles.disablebtn]} onPress={disable === true ? SecondScreen : null}><Text style={styleHK.textbackANDforth}>Дальше</Text></Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    focus: {
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 6,
        shadowOffset: {
            width: 0,
            height: 0
        },

    },
    disablebtn: {
        opacity: 0.6
    },
    message: {
        borderRadius: 16,
        marginLeft: 20,
        marginRight: 20,
        display: 'flex',
        // alignItems: 'flex-start',
        // justifyContent: 'flex-start',
        paddingTop: 0,
    },
    textMessage: {
        fontFamily: 'RobotoBold',
        // fontSize: 22
    },
    Pressable4VisibleTrue: {
        backfaceVisibility: 'visible'
    },
    Pressable4VisibleFalse: {
        backfaceVisibility: 'hidden'
    }
})