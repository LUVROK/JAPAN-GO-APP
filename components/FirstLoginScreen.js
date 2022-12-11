import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as Facebook from 'expo-facebook';
// import * as GoogleSignIn from 'expo-google-sign-in';
import axios from 'axios';
import { baseURL } from './axiosUrl.js'
axios.defaults.baseURL = `${baseURL}`
import { AuthContext } from './AuthContext/context';

const FirstLoginScreen = () => {

    const navigation = useNavigation();
    const { signIn } = React.useContext(AuthContext);

    const handleFacebook = () => {

    };

    const handleGoogle = () => {

    };

    const handleLoginScreen = () => {
        navigation.navigate("Register");
    };

    const handleLoginIn = () => {
        navigation.navigate("Login");
    };

    async function logIn() {
        try {
            await Facebook.initializeAsync({
                appId: '<APP_ID>',
            });
            const { type, token, expirationDate, permissions, declinedPermissions } =
                await Facebook.logInWithReadPermissionsAsync({
                    permissions: ['public_profile', 'email'],
                });
            if (type === 'success') {
                // Get the user's name using Facebook's Graph API
                const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,about,picture`);
                const data = await response.json()
                console.log(data);
                console.log('token - ' + token);

                const LoginWithFacebook = await axios.post('/user/loginwithfacebook', {
                    headers: {
                        'Content-type': 'Application/json',
                        'Accept': 'Application/json',
                    },
                    data: {
                        email: data.email,
                        name: data.name,
                        token: token,
                        photo: ''
                    },
                }).then(console.log('Успешно')).catch((error) => {
                    console.log(error.message);
                });

                console.log(LoginWithFacebook)

                const token1 = LoginWithFacebook.data.newUser.token;
                const email = LoginWithFacebook.data.newUser.email;
                const name = LoginWithFacebook.data.newUser.name;
                const photo = LoginWithFacebook.data.newUser.photo;
                const date = LoginWithFacebook.data.newUser.DateRegister;
                const password = LoginWithFacebook.data.newUser.password;
                signIn(email, password, token1, photo, name, date);

            } else {
                // type === 'cancel'
            }
        } catch ({ message }) {
            console.log(`Facebook Login Error: ${message}`);
        }
    }

    // async function signInWithGoogleAsync() {
    //     try {
    //         const result = await Google.logInAsync({
    //             androidClientId: YOUR_CLIENT_ID_HERE,
    //             iosClientId: YOUR_CLIENT_ID_HERE,
    //             scopes: ['profile', 'email'],
    //         });

    //         if (result.type === 'success') {
    //             return result.accessToken;
    //         } else {
    //             return { cancelled: true };
    //         }
    //     } catch (e) {
    //         return { error: true };
    //     }
    // }

    return (
        <View style={{ flex: 1, alignItems: 'center', backgroundColor: "#ffffff" }}>
            <View style={styles.ImageJapan}>
                <Image
                    style={{ height: 215, resizeMode: "contain", backgroundColor: "#ffffff" }}
                    source={require('../assets/fuji.png')}
                />
            </View>
            <Text style={{ fontSize: 18, marginTop: 26, color: '#494949', marginBottom: 3 }}>JAPAN
                <Text style={{ color: 'red', fontFamily: 'RobotoBold' }}>GO</Text>
            </Text>
            <Text style={{ fontSize: 20, marginTop: 0, color: '#494949', marginBottom: 45 }}>日本語</Text>
            <View style={styles.container}>
                <Pressable style={styles.Fasebook} onPress={logIn}>
                    <View style={styles.styleIcon}>
                        <FontAwesome name="facebook" size={20} color="#4596EC" />
                    </View>
                    <Text style={styles.TextFasebook}>Register with Facebook</Text>
                </Pressable>
                {/* <TouchableOpacity style={styles.Googlis} onPress={null}>
                    <FontAwesome name="google" size={24} color="#4596EC" />
                </TouchableOpacity> */}
            </View>
            <View style={styles.container2}>
                <TouchableOpacity style={styles.WithEmail} onPress={handleLoginScreen}>
                    <Text style={styles.emailText}>Зарегистироваться с E-mail</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.container}>
                <Text style={styles.PolicyText}>By register, you agree to our Terms, Data Policy and Cookies Policy.</Text>
            </View>
            <View style={styles.container3}>
                <Text style={styles.LogInText}>Уже зарегистрирован?</Text>
                <TouchableOpacity style={styles.LogInHundle} onPress={handleLoginIn}>
                    <Text style={[styles.LogInText, { color: '#4596EC' }]}>Войти</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop: 20,
        marginRight: 20,
        marginLeft: 20,
    },
    container2: {
        flexDirection: 'column',
        marginTop: 27,
        marginRight: 20,
        marginLeft: 20,
    },
    container3: {
        flexDirection: 'row',
        marginTop: 50,
        marginRight: 20,
        marginLeft: 20,
        flexWrap: 'wrap'
    },
    Fasebook: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
        backgroundColor: '#4596EC',
        borderRadius: 50,
    },
    TextFasebook: {
        fontSize: 15,
        color: 'white',
        marginLeft: 40
    },
    Googlis: {
        height: 50,
        width: 50,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 20,
        borderRadius: 50,
        borderColor: '#4596EC',
        borderWidth: 2,
    },
    styleIcon: {
        alignItems: 'flex-start',
        marginLeft: 0,
        left: '5%',
        position: 'absolute',
        marginLeft: 0,
        backgroundColor: 'white',
        height: 32,
        width: 32,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30
    },
    ImageJapan: {
        marginTop: 71,
        justifyContent: 'center'
    },
    emailText: {
        color: '#A4A4A4',
        fontSize: 16,
        fontFamily: "RobotoBold"
    },
    WithEmail: {

    },
    PolicyText: {
        fontSize: 10,
        color: '#A4A4A4',
        fontFamily: 'RobotoRegular'
    },
    LogInText: {
        fontFamily: 'RobotoBold',
        fontSize: 14,
        color: '#A4A4A4',
        marginLeft: 4
    },
    LogInHundle: {

    }
});

export default FirstLoginScreen;