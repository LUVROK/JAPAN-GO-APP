import { useNavigation } from "@react-navigation/native"
import React, { useEffect, useState, useRef } from "react"
import { View, Text, Button, Pressable, StyleSheet, Animated, Modal, Image, ActivityIndicator, Alert } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
// import { SketchCanvas } from '@terrylinla/react-native-sketch-canvas';
// import Canvas from 'react-native-canvas';
import SignatureScreen from "react-native-signature-canvas";
import axios from "axios";
// import { usePreventScreenCapture, addScreenshotListener } from "expo-screen-capture";
// import * as Permissions from 'expo-permissions'
import { showMessage, hideMessage } from "react-native-flash-message";
import FlashMessage from "react-native-flash-message";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
axios.defaults.baseURL = 'http://192.168.0.15:5000/api'

export default function DrawScreen({ route }) {

    const ref = useRef();
    const navigation = useNavigation();

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const [signaturs, setSifnature] = useState('');
    const [scope, setScope] = useState('');
    const [kanji, setKanji] = useState(route.params.kanji);
    const [Message, setMessage] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [show, setShow] = useState(false);
    const [keyNeiro, setkeyNeiro] = useState(route.params.keyNeiro);

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

    const handleOK = async (signature) => {
        await setShow(true);
        console.log(signature)
        // console.log('signature ' + signature);
        const data = await axios.post(`/kanji/checkDrawBrain`, {
            headers: {
                'Content-type': 'Application/json',
                'Accept': 'Application/json',
            },
            data: {
                signature: signature,
                keyNeiro: keyNeiro
            }
        }).then(console.log('Успешно')).catch((error) => {
            Alert.alert(error.message);
        });
        // console.log(data.data)
        // Alert.alert(data.data[0].class)
        setSifnature(data.data[0].class)
        setScope(data.data[0].score)
        let messages = '';
        let icon = '';

        if (data.data[0].class === kanji) {
            if (data.data[0].score >= 0.9) {
                messages = "Отлично, ты хорош в этом";
                icon = 'success'
            }
            else if (data.data[0].score >= 0.8 && data.data[0].score < 0.9) {
                messages = "Хорошо, но тебе есть куда стремится";
                icon = 'success'
            }
            else if (data.data[0].score >= 0.7 && data.data[0].score < 0.8) {
                messages = "Пойдет, в целом, можно что-то разобрать";
                icon = 'info'
            }
            else if (data.data[0].score >= 0.6 && data.data[0].score < 0.7) {
                messages = "Плохо! Ты точно стараешься?";
                icon = 'info'
            }
            else {
                messages = "Если бы я ставил оценку, то было бы 2";
                icon = 'danger'
            }
        }
        else {
            messages = "Я не понимаю что ты тут нарисовал";
            icon = 'danger'
        }

        showMessage({
            message: messages,
            type: icon,
            // backgroundColor: "#FFAA00",
            color: "#000",
            autoHide: true,
            style: styles.message,
            textStyle: styles.textMessage,
            icon: { icon: `none`, position: "left", marginRight: 20 },
            // animationDuration: 125,
            duration: 2500
        })
        await setShow(false)
        // setSifnature(signature)
    };

    // Called after ref.current.readSignature() reads an empty string
    const handleEmpty = () => {
        console.log("Empty");
    };

    // Called after ref.current.clearSignature()
    const handleClear = () => {
        ref.current.clearSignature();
    };

    // Called after end of stroke
    const handleEnd = () => {
        ref.current.readSignature();
    };

    const handleData = (data) => {
        console.log(data);
    };

    const handleConfirm = () => {
        ref.current.readSignature();
    };

    // const handleScreen = async () => {

    // }

    // async function cameraScreen() {
    //     const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    //     if (status === 'granted') {
    //         addScreenshotListener(() => {
    //             Alert.alert('ok')
    //         })
    //     }
    // }

    return (
        <View style={styles.constainer}>
            <FlashMessage position="top" />
            <Pressable style={styles.arrowBlack} onPress={() => navigation.navigate("Kanji_1")}>
                <Ionicons name="chevron-back" size={36} color="black" />
                <Text style={styles.arrowBlackText}>На главную</Text>
            </Pressable>

            <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={() => { setModalVisible(!modalVisible); }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Порядок написания</Text>
                        <Image style={styles.imgStyle} source={{ uri: `${route.params.gifImage}` }} />
                        <Pressable style={[styles.button, styles.buttonClose]} onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.textStyle}>Скрыть</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

            <View style={styles.drawView}>
                <View style={styles.shadow}>
                    <SignatureScreen
                        // dotSize={10}
                        penColor='red'
                        maxWidth={5}
                        minWidth={5}
                        ref={ref}
                        // onEnd={handleEnd}
                        onOK={handleOK}
                        // onEmpty={handleEmpty}
                        // onClear={handleClear}
                        // onGetData={handleData}
                        // descriptionText={'привет'}
                        // autoClear={false}
                        // webStyle={`.m-signature-pad--footer
                        //     .button {
                        //         border-radius: 30px;
                        //         margin-top: 10px;
                        //         display: flex;
                        //         flex-direction: row;
                        //     }`}
                        webStyle={`.m-signature-pad--footer {display: none; margin: 0px;} .m-signature-pad--body { box-shadow: none; border: none} .m-signature-pad {border: none; box-shadow: none;}`}
                    />
                </View>
                <View style={styles.row}>
                    <Pressable onPress={handleClear} style={styles.rowhandle}><Text>Очистить</Text></Pressable>
                    <Pressable onPress={handleConfirm} style={styles.rowhandle}><Text>Проверить</Text></Pressable>
                </View>
                {/* <Text>{signaturs} - {scope}</Text> */}
                {/* <Button title="Скрин" onPress={cameraScreen} /> */}
                <Pressable style={styles.GifMiniScreen} onPress={() => setModalVisible(true)}>
                    <Text style={[styles.textGif]}>Показать написание</Text>
                </Pressable>
            </View>
            <View style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', top: -100 }}>
                <ActivityIndicator size="large" color="red" style={{ margin: 'auto', height: 0, width: 0, backgroundColor: 'yellow' }} animating={show} />
            </View>
            <AnimatedPressable style={styles.trainer}>
                <Animated.View style={[styles.AnimatedDraw, { transform: [{ translateY: fadeAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 4] }), }, { translateX: fadeAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 4] }) }] }]}>
                    <Pressable onPressOut={fadeOut} onPressIn={fadeIn} style={styles.stylesPressDraw} onPress={() => navigation.navigate("Kanji_1")}>
                        <Text style={{ fontSize: 16, color: '#442C2E' }}>Готово</Text>
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
    GifMiniScreen: {
        textAlign: 'center',
        position: 'absolute',
        backgroundColor: '#FEDBD0',
        width: '70%',
        padding: 12,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 5,
        shadowOffset: {
            width: 0,
            height: 0
        },
        bottom: 10,
        color: '#442C2E'
    },
    rowhandle: {
        textAlign: 'center',
        backgroundColor: '#FEDBD0',
        padding: 12,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 5,
        shadowOffset: {
            width: 0,
            height: 0
        },
        color: '#442C2E',
        paddingLeft: 20,
        paddingRight: 20
    },
    textGif: {
        textAlign: 'center',
        color: '#442C2E',
        fontSize: 15
    },
    imgStyle: {
        height: 150,
        width: 150,
        resizeMode: 'contain',

    },
    shadow: {
        width: '100%',
        height: '70%',
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: {
            width: 0,
            height: 0
        },
        marginBottom: 20,
        // alignContent: 'flex-start',
        // justifyContent: 'flex-start'
    },
    textMessage: {
        // fontFamily: 'RobotoBold',
        fontSize: 22,
        // paddingRight: 20,
    },
    message: {
        borderRadius: 16,
        marginLeft: 20,
        marginRight: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 0,
        // position: 'absolute',
        marginTop: 40,
        paddingLeft: 20,
        // width: 'auto'
        // backgroundColor: 'yellow'
    },
    row: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "90%",
        alignItems: "center",
        backgroundColor: 'white',
        // marginTop: 20
    },
    arrowBlack: {
        display: 'flex',
        padding: 10,
        paddingTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        width: '40%',
    },
    arrowBlackText: {
        paddingLeft: 0,
        fontSize: 18,
    },
    drawView: {
        // backgroundColor: 'yellow',
        // width: '100%',
        padding: 20,
        height: '70%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        // backgroundColor: 'yellow'
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
        // backgroundColor: 'yellow'
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
    },
    stylesPressDraw: {
        width: '100%',
        backgroundColor: '#FEDBD0',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },



    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: 'yellow'
        // height: 710
        // marginTop: 22
    },
    modalView: {
        width: '80%',
        height: '50%',
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        position: 'absolute',
        bottom: 70
    },
    button: {
        borderRadius: 20,
        padding: 10,
        paddingLeft: 40,
        paddingRight: 40,
        elevation: 2,
        position: 'absolute',
        bottom: 20
    },
    buttonOpen: {
        backgroundColor: "#442C2E",
    },
    buttonClose: {
        backgroundColor: "#442C2E",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 16,
        fontWeight: "bold",
        color: '#442C2E'
    }
})