import { useNavigation } from '@react-navigation/native';
import React, { useState, useCallback } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { AuthContext } from './AuthContext/context';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import validator from 'validator'
import { LoginStyles } from './styles/LoginStyles';
import { baseURL } from './axiosUrl.js'

axios.defaults.baseURL = `${baseURL}`
//192.168.0.15
//176.59.11.254 - вайфай с телефона
//мой сервер 89.253.218.241

const RegisterScreen = () => {

    const [user, setUser] = useState({ email: '', password: '', confirmPassowrd: '', name: '', token: '', photo: '' });
    const [InputText, setInputText] = useState('')

    const { signIn } = React.useContext(AuthContext);

    const navigation = useNavigation();

    const handleLoginIn = () => {
        navigation.navigate("Login");
    };

    const handleLogin = async () => {
        try {
            const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            user.token = token;
            console.log(user);

            if (user.confirmPassowrd === user.password && user.email !== '' && user.password !== '' && user.confirmPassowrd !== '' & user.name !== '') {
                console.log('Все поля заполнены и пароли равны')
            }
            else {
                if (user.name === '') {
                    Alert.alert('Ты не ввел имя', 'Введите имя', [
                        { text: 'Хорошо' }
                    ]);
                }
                else {
                    Alert.alert('Пароли не совпадают', 'Введите пароль снова', [
                        { text: 'Хорошо' }
                    ]);
                }
                setInputText('Данные некорректны')
                throw new SyntaxError("Данные некорректны");
            }

            const validEmail = await validator.isEmail(user.email); //=> true

            if (!validEmail) {
                setInputText('Не валидный email')
                throw new SyntaxError("Не валидный email");
            }

            const data = await axios.post('/user/create', {
                headers: {
                    'Content-type': 'Application/json',
                    'Accept': 'Application/json',
                },
                data: user,
            }).then(console.log('Успешно')).catch((error) => {
                Alert.alert(error.message);
            });
            console.log('handleLogin ' + JSON.stringify(data))
            setInputText(data.data.message)
            data.status === 200 ? signIn(user.email, user.password, user.token, user.photo, user.name, data.data.newUser.DateRegister) : Alert.alert('переделовай даунич')
        }
        catch (e) {
            console.log(e.message)
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
            <KeyboardAvoidingView
                style={styles.containerIn}
                behavior={Platform.OS === "ios" ? "padding" : 1000}
            >
                <View style={{ alignItems: 'center' }}><Text style={styles.RegisterText}>Регистрация</Text></View>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Имя"
                        placeholderTextColor={'#B7B6BB'}
                        name='name'
                        onChangeText={(text) => setUser({ ...user, name: text })}
                        style={[styles.input, styles.inputMarginBottom]}
                    />
                    <TextInput
                        placeholder="E-mail"
                        placeholderTextColor={'#B7B6BB'}
                        name='email'
                        onChangeText={(text) => setUser({ ...user, email: text })}
                        style={[styles.input, styles.inputMarginBottom]}
                    />
                    <View>
                        <TextInput
                            placeholder="Пароль"
                            placeholderTextColor={'#B7B6BB'}
                            name='password'
                            onChangeText={(text) => setUser({ ...user, password: text })}
                            style={[styles.input, styles.inputMarginBottom]}
                            secureTextEntry
                        />
                        <TextInput
                            placeholder="Подтеврдите пароль"
                            placeholderTextColor={'#B7B6BB'}
                            name='confirmPassowrd'
                            onChangeText={(text) => setUser({ ...user, confirmPassowrd: text })}
                            style={[styles.input, styles.inputMarginBottom]}
                            secureTextEntry
                        />
                    </View>
                    <Text style={{ color: "#d93025", paddingTop: 0, paddingLeft: 4 }}>{InputText}</Text>
                </View>
                <View style={LoginStyles.buttonContainer}>
                    <TouchableOpacity
                        onPress={handleLogin}
                        style={LoginStyles.button}
                    >
                        <Text style={LoginStyles.buttonText}>Регистрация</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.container}>
                    <Text style={LoginStyles.PolicyText}>By register, you agree to our Terms, Data Policy and Cookies Policy.</Text>
                </View>
                <View style={LoginStyles.container3}>
                    <Text style={LoginStyles.LogInText}>Уже зарегистрирован?</Text>
                    <TouchableOpacity style={styles.LogInHundle} onPress={handleLoginIn}>
                        <Text style={[LoginStyles.LogInText, { color: '#4596EC' }]}>Войти</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}

export default RegisterScreen;

const styles = StyleSheet.create({
    RegisterText: {
        marginTop: 110,
        marginBottom: 33,
        fontFamily: 'RobotoBold',
        fontSize: 28,
        color: '#442C2E',
        // backgroundColor: 'yellow'
    },
    inputContainer: {
        width: '80%',
        position: 'relative',
    },
    containerIn: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 0
    },
    input: {
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderRadius: 10,
        marginTop: 0,
        fontSize: 14,
        backgroundColor: '#F2F2F4',
        color: 'black'
        // shadowColor: "#000",
        // shadowOpacity: 0.5,
        // shadowRadius: 8,
        // color: '#FFFFFF',
        // shadowOffset: {
        //     width: 0,
        //     height: 0
        // },
    },
    inputMarginBottom: {
        marginBottom: 16,
    },
    buttonContainer: {
        width: '60%',
        marginTop: 16,
        marginBottom: 25
    },
    button: {
        backgroundColor: '#8086B9',
        shadowColor: "black",
        shadowOpacity: 0.5,
        shadowRadius: 5,
        color: '#FFFFFF',
        shadowOffset: {
            width: 0,
            height: 0
        },
        width: '100%',
        padding: 15,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        height: 48,
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: '700',
        fontSize: 14
    },
    container: {
        marginBottom: 16
    },
    PolicyText: {
        fontSize: 10,
        color: '#A4A4A4',
        fontFamily: 'RobotoRegular'
    },
    container3: {
        flexDirection: 'row',
        // backgroundColor: 'yellow',
        marginRight: 20,
        marginLeft: 20,
    },
    LogInText: {
        fontFamily: 'RobotoBold',
        fontSize: 14,
        color: '#A4A4A4',
        marginLeft: 4
    },
    LogInHundle: {

    }

})
