import { useNavigation } from "@react-navigation/native"
import React, { useEffect, useState, useRef } from "react"
import { View, Text, Alert, Pressable, StyleSheet, Animated, Image, ActivityIndicator, Platform } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Speech from 'expo-speech';
// import JishoAPI from 'unofficial-jisho-api';
import { playSoundkanji } from "../HKComponents/soundPlay";
import axios from 'axios'
// import { Alert } from "react-native-web";
// import 'react-native-gesture-handler'

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
axios.defaults.baseURL = 'http://192.168.0.15:5000/api'
axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.common["Content-Type"] = "application/json";

export default function KanjiTheory({ route }) {

    const navigation = useNavigation();

    useEffect(() => {
        setData()
    }, [])

    const setData = async () => {
        const data = await axios.post(`/kanji/alldata`, {
            headers: {
                'Content-type': 'Application/json',
                'Accept': 'Application/json',
            },
            data: kanji,
        }).then(console.log('Успешно')).catch((error) => {
            Alert.alert(error.message);
        });
        // console.log(data.data.resData[0].kunyomi);
        setKunyomiKANA(data.data.resData[0].kunyomi);
        setOnyomiKANA(data.data.resData[1].onyomi);
        setUriLink(data.data.resData[2].resultUri);
        setJlptLevel(data.data.resData[3].jlptLevel);
        setnewspaperFrequencyRank(data.data.resData[4].newspaperFrequencyRank);
        setonyomiExamples(data.data.resData[5].onyomiExamples);
        setkunyomiExamples(data.data.resData[6].kunyomiExamples);
        setredical(data.data.resData[7].redical);
        setmeaningRadical(data.data.resData[8].meaningRadical);
        setradicalForms(data.data.resData[9].redicalForms);
        setparts(data.data.resData[10].parts);
        setSpeakType(data.data.resData[11].typeAudio);
        setUriAudio(data.data.resData[12].audio);
        // console.log(data.data.resData)
        setIsLoading(false);
        // listOption();
    }


    const [kanji, setKanji] = useState(route.params.data.value.kanji)
    const [meaning1, setMeaning1] = useState(route.params.data.value.meaning[0]);
    const [meaning2, setMeaning2] = useState(route.params.data.value.meaning[1]);
    const [meaning3, setMeaning3] = useState(route.params.data.value.meaning[2]);
    const [meaning4, setMeaning4] = useState(route.params.data.value.meaning[3]);
    const [meaning5, setMeaning5] = useState(route.params.data.value.meaning[4]);
    const [OnyomiKANA, setOnyomiKANA] = useState('');
    const [KunyomiKANA, setKunyomiKANA] = useState('');
    const [dataSet, setDataSet] = useState({ kunyomi: '', onyomi: '', resultUri: '' })
    const [gif, setGif] = useState(`${route.params.data.value.gif}`);
    const [keyNeiro, setkeyNeiro] = useState(route.params.data.value.keyNeiro);
    const [uriLink, setUriLink] = useState('');
    const [uriAudio, setUriAudio] = useState('');
    const [jlptLevel, setJlptLevel] = useState('');
    const [play, setPlay] = useState(true);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [speakType, setSpeakType] = useState('');
    const [isloading, setIsLoading] = useState(true);
    const [newspaperFrequencyRank, setnewspaperFrequencyRank] = useState('');
    const [onyomiExamples, setonyomiExamples] = useState();
    const [kunyomiExamples, setkunyomiExamples] = useState();
    const [redical, setredical] = useState('');
    const [meaningRedical, setmeaningRadical] = useState('');
    const [redicalForms, setradicalForms] = useState('');
    const [parts, setparts] = useState('');


    function setPla() {
        setPlay(true)
        setButtonDisabled(false)
    }

    const speak = async () => {
        setPlay(false)
        setButtonDisabled(true)
        console.log(speakType)
        console.log(uriAudio)
        if (speakType === 'Roboto') {
            const thingToSay = `${kanji}`;
            let options;
            Platform.OS === 'ios' ?
                options = {
                    voice: "com.apple.ttsbundle.siri_Hattori_ja-JP_compact",
                    rate: 0.5,
                }
                :
                options = {
                    voice: "ja-jp-x-htm-network",
                    rate: 0.5,
                }
            await Speech.speak(thingToSay, options);
        }
        if (speakType === 'Sound') {
            playSoundkanji(uriAudio)
        }
        setTimeout(setPla, 1500);
    };

    const listOption = async () => {
        let voices = await Speech.getAvailableVoicesAsync();
        console.log(voices)
    }

    const fadeAnim = useRef(new Animated.Value(0)).current;

    const fadeIn = () => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 50,
            useNativeDriver: true
        }).start();
    };

    const fadeOut = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 50,
            useNativeDriver: true
        }).start();
    };

    while (isloading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#442C2E" style={{ position: 'absolute', width: '100%', height: '100%' }} />
            </View>
        );
    }

    return (
        <View style={styles.constainer}>
            {/* {isloading === true ? <ActivityIndicator size="large" color="#00ff00" style={{ position: 'absolute', width: '100%', height: '100%' }} /> : null} */}
            <Pressable style={styles.arrowBlack} onPress={() => navigation.navigate("Kanji_1")}>
                <Ionicons name="chevron-back" size={36} color="black" />
                <Text style={styles.arrowBlackText}>Назад</Text>
            </Pressable>
            <View style={styles.Cont}>
                <View style={styles.kanjiInfoCont}>
                    <Pressable style={styles.kanjiTextAudio} onPress={() => speak()} disabled={buttonDisabled}>
                        <Text style={[styles.textGif, { textAlign: 'left' }]}>JLPT level {jlptLevel}</Text>
                        <Text style={styles.kanjiText}>{kanji}</Text>
                        {
                            play === true
                                ? <Ionicons name="play-circle" size={32} color="#442C2E" style={{ position: 'absolute', bottom: -30 }} />
                                : <Ionicons name="pause-circle" size={32} color="#442C2E" style={{ position: 'absolute', bottom: -30 }} />
                        }
                    </Pressable>
                    <View style={styles.meaningANDkana}>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                            {meaning1 != undefined ? <Text style={styles.kanjiMeaning}>Значения: {meaning1}
                                {meaning2 != undefined ? `, ` : null}</Text> : null}
                            {meaning2 != undefined ? <Text style={styles.kanjiMeaning}>{meaning2}{meaning3 != undefined ? `, ` : null}</Text> : null}
                            {meaning3 != undefined ? <Text style={styles.kanjiMeaning}>{meaning3}{meaning4 != undefined ? `, ` : null}</Text> : null}
                            {meaning4 != undefined ? <Text style={styles.kanjiMeaning}>{meaning4}{meaning5 != undefined ? `, ` : null}</Text> : null}
                            {meaning5 != undefined ? <Text style={styles.kanjiMeaning}>{meaning5}</Text> : null}
                        </View>
                        <Text style={[styles.kanjiMeaning, styles.OnKunStyle]}>On'yomi: {OnyomiKANA}</Text>
                        <Text style={[styles.kanjiMeaning, styles.OnKunStyle]}>Kun'yomi: {KunyomiKANA}</Text>
                    </View>
                </View>
                <View style={styles.gifANDotherInfo}>
                    <View style={styles.gifANDotherInfoView}>
                        <View style={styles.textGifView}>
                            <Text style={styles.textGif}>Порядок написания</Text>
                        </View>
                        <View style={{ padding: 10 }}>
                            <Image style={styles.imgStyle} source={{ uri: `data:image/gif;base64,${gif}` }} />
                        </View>
                    </View>
                    <View style={styles.infoGifKanji}>
                        <Text style={[styles.textGif, { textAlign: 'left' }]}>Рейтинг использования: {newspaperFrequencyRank}</Text>
                        <Text style={[styles.textGif, { textAlign: 'left' }]}>Радикал: {redical}</Text>
                        <Text style={[styles.textGif, { textAlign: 'left' }]}>Перевод радикала: {meaningRedical}</Text>
                        <Text style={[styles.textGif, { textAlign: 'left' }]}>Формы радикала: {redicalForms}</Text>
                        <Text style={[styles.textGif, { textAlign: 'left' }]}>Состоит из: {parts}</Text>
                        <Pressable style={styles.otherInfoKanjiLink} onPress={() => navigation.navigate('WebViewScreen', { uri: `${uriLink}` })}>
                            <Text style={[styles.textGif]}>Подробнее</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
            <AnimatedPressable style={styles.trainer}>
                <Animated.View style={[styles.AnimatedDraw, { transform: [{ translateY: fadeAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 4] }), }, { translateX: fadeAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 4] }) }] }]}>
                    <Pressable onPressOut={fadeOut} onPressIn={fadeIn} style={styles.stylesPressDraw} onPress={() => navigation.navigate("DrawScreen", {
                        kanji: kanji,
                        gifImage: `data:image/gif;base64,${gif}`,
                        keyNeiro: keyNeiro
                    })}>
                        <Text style={{ fontSize: 16, color: '#442C2E' }}>Нарисовать</Text>
                    </Pressable>
                </Animated.View>
            </AnimatedPressable>
        </View>
    )
}

const styles = StyleSheet.create({
    constainer: {
        flex: 1,
        backgroundColor: 'white',
    },
    kanjiInfoCont: {
        height: 'auto',
        width: '100%',
        // padding: 20,
        // marginTop: 50,
        margin: 0,
        display: 'flex',
        flexDirection: 'row',
    },
    meaningANDkana: {
        width: '60%',
        padding: 10,
        paddingTop: 0,
        paddingLeft: 0,
        display: 'flex',
        alignContent: 'space-between', textAlign: 'justify',
        // borderWidth: 1,
        // borderColor: '#442C2E',
        // borderLeftWidth: 0,
        // borderBottomWidth: 0,
        paddingRight: 0,
        // backgroundColor: 'yellow'
    },
    kanjiTextAudio: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        // justifyContent: 'center',
        // padding: 10,
        // paddingLeft: 20,
        width: '40%',

        // borderColor: '#442C2E',
        // borderWidth: 1,
        // borderBottomWidth: 0
        // marginBottom: 20
        // width: '40%',
        // backgroundColor: 'red'
    },
    Cont: {
        height: '100%',
        width: 'auto',
        margin: 20,
        // backgroundColor: 'yellow'
        marginTop: 20
    },
    kanjiText: {
        fontSize: 72,
        color: '#442C2E',
    },
    kanjiMeaning: {
        fontSize: 14,
        opacity: 0.7, textAlign: 'justify'
    },
    OnKunStyle: {

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
    textGif: {
        textAlign: 'center',
        color: '#442C2E',
    },
    textGifView: {
        width: '100%',
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#FEDBD0'
    },
    imgStyle: {
        height: 150,
        width: 150,
        resizeMode: 'contain',
    },
    arrowBlackText: {
        paddingLeft: 0,
        fontSize: 18,
    },
    infoGifKanji: {
        paddingLeft: 10,
        width: '50%',
        height: '100%',
        // backgroundColor: 'yellow',
        // maxWidth: '45%',
        paddingTop: 10,

    },
    otherInfoKanjiLink: {
        textAlign: 'left',
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#FEDBD0',
        width: '70%',
        paddingTop: 8,
        paddingBottom: 8,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 5,
        shadowOffset: {
            width: 0,
            height: 0
        },
        // fontSize: 16,
        color: '#442C2E'
    },
    PresDraw: {
        position: 'absolute',
        bottom: 10,
        width: 'auto',
        right: 20,
        left: 20,
        padding: 20,
        backgroundColor: '#FEEAE6',
        alignItems: 'center',
        borderRadius: 10
    },
    trainer: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        left: 20,
        padding: 25,
        backgroundColor: '#442C2E',
        alignItems: 'center',
        borderRadius: 10,
        shadowColor: "#FEDBD0",
        shadowOpacity: 1,
        shadowRadius: 6,
        shadowOffset: {
            width: 0,
            height: 0
        },
    },
    iconAntD: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        margin: 10,
    },
    stylesPressDraw: {
        width: '100%',
        backgroundColor: '#FEDBD0',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    gifANDotherInfo: {
        display: 'flex',
        // alignItems: 'left',
        alignItems: 'flex-start',
        marginTop: 50,
        // paddingRight: 5,
        // paddingLeft: 20,
        flexDirection: 'row',
        width: '100%',
        // borderWidth: 1,
        // borderColor: '#442C2E',
        marginBottom: 30,
    },
    gifANDotherInfoView: {
        alignItems: 'center',
        borderColor: '#FEDBD0', borderWidth: 1,
        width: '50%',
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 2,
        shadowOffset: {
            width: 1,
            height: 1,
        },
    },
    AnimatedDraw:
    {
        position: 'absolute',
        bottom: 4,
        top: -4,
        left: -4,
        right: 4,
        backgroundColor: '#FEDBD0',
        borderRadius: 9,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#FEDBD0'
    }
})