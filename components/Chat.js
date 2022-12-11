import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, ScrollView, TextInput, Alert } from 'react-native';
import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react'
import { Picker } from '@react-native-picker/picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Ionicons from 'react-native-vector-icons/Ionicons';

axios.defaults.baseURL = 'http://192.168.0.15:5000/api'

const Chat = ({ route }) => {

    const navigation = useNavigation();

    const [users, setUsers] = useState([])
    const [emailTo, setemailTo] = useState(route.params.emailTo);
    const [emailFrom, setemailFrom] = useState(route.params.emailFrom);
    const [messeges, setMesseges] = useState([])

    const [text, onChangeText] = useState("");

    useEffect(() => {
        getData();
    }, [])

    const pickerRef = useRef();
    const scrollViewRef = useRef();

    function open() {
        pickerRef.current.focus();
    }

    function close() {
        pickerRef.current.blur();
    }

    const getData = async () => {
        const data = await axios.post('/messages/getMessgesFirst50', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            data: {},
        }).then(console.log('Успешно')).catch((error) => {
            Alert.alert(error.message);
        });
        console.log(data);
        // setUsers(newData.data);
        // setemailTo(newData.data[0].email)
        // console.log(emailTo)
    }

    const getDataMesseges = async () => {
        // const newData = await axios.post('/user/allMesseges', {
        //   headers: {
        //     'Content-Type': 'application/json',
        //     'Accept': 'application/json'
        //   },
        //   data: {
        //     emailTo: emailTo,
        //     emailFrom: emailFrom
        //   },
        // })
        // console.log(newData.data[0].from_user_id);
        // setMesseges(newData.data);
        // console.log(emailTo);
    }

    const sendMessges = async () => {
        const data = await axios.post('/messages/CreateMessges', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            data: {
                text: text,
                emailTo: emailTo,
                emailFrom: emailFrom
            },
        }).then(console.log('Успешно')).catch((error) => {
            Alert.alert(error.message);
        });
        // console.log(newData.data);
        // setMesseges(newData.data);
        // console.log(emailTo);
        // await getDataMesseges();
    }

    return (
        <KeyboardAwareScrollView contentContainerStyle={{ flex: 1, backgroundColor: '#fff' }} enableOnAndroid={true}>
            <Pressable style={styles.arrowBlack} onPress={() => navigation.goBack()}>
                <Ionicons name="chevron-back" size={36} color="black" />
                <Text style={styles.arrowBlackText}>На главную</Text>
            </Pressable>
            <View style={styles.container}>
                {/* <KeyboardAwareScrollView style={styles.container}></KeyboardAwareScrollView> */}
                <StatusBar hidden />
                {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Picker
                        ref={pickerRef}
                        selectedValue={emailTo}
                        style={{ width: 175 }}
                        onValueChange={(itemValue, itemIndex) => setemailTo(itemValue)}
                        itemStyle={{ fontSize: 14 }}
                    >
                        {
                            users.map((data, i) => (
                                <Picker.Item key={i} label={data.email} value={data.email} />
                            ))
                        }
                    </Picker>
                    <Pressable style={{ padding: 10, backgroundColor: '#FEDBD0' }} onPress={() => getDataMesseges()}>
                        <Text>Получить данные</Text>
                    </Pressable>
                </View> */}
                <View style={{ width: '100%', height: '85%', paddingLeft: 10, paddingRight: 10, paddingTop: 10 }}>
                    <ScrollView
                        ref={scrollViewRef}
                        style={{ marginTop: 0, marginLeft: 20, marginRight: 20, borderColor: '#E3E3E3', borderWidth: 1, }}
                        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: false })}
                    >
                        {
                            messeges.map((data, i) => (
                                data.emailFrom.trim() == emailFrom ?
                                    (
                                        <View key={i} style={[styles.messegeView, { marginRight: 10, marginLeft: 'auto' }]}>
                                            <Text>{data.messeges}</Text>
                                        </View>
                                    )
                                    :
                                    (
                                        <Pressable key={i} style={[styles.messegeView, { marginRight: 'auto', marginLeft: 10 }]} onPress={() => console.log(data.from_user_id.trim())}>
                                            <Text>{data.messeges}</Text>
                                        </Pressable>
                                    )
                            ))
                        }
                        {/* <View ref={messagesEnd} style={{ overflow: 'hidden !important' }}></View> */}
                    </ScrollView>
                </View>
                <View style={{ position: 'absolute', bottom: 0, width: '100%', height: 100 }}>
                    <View style={{ display: 'flex', height: 100, width: '100%', justifyContent: 'space-between', padding: 20, flexDirection: 'row' }}>
                        <TextInput style={styles.input} onChangeText={onChangeText} value={text} />
                        <Pressable style={{ backgroundColor: '#FEDBD0', height: 'auto', justifyContent: 'center', marginTop: 10, marginBottom: 10, padding: 5, paddingLeft: 10, paddingRight: 10, borderRadius: 10 }} onPress={() => sendMessges()}>
                            <Text>Отправить</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
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
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        // flexDirection: 'row',
        // backgroundColor: 'red',
        // height: '100%',
        // marginTop: 50
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: 210,
        borderColor: '#E3E3E3',
        borderRadius: 10
    },
    messegeView: {
        padding: 5,
        backgroundColor: '#FEDBD0',
        margin: 5,
        width: '50%'
    }
});

export default Chat;