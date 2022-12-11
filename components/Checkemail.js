import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
//import { auth } from '../firebase';
import { AuthContext } from './AuthContext/context';

const CheckEmailScreen = () => {

    const [code, setCode] = useState('')

    const { signIn } = React.useContext(AuthContext);

    const navigation = useNavigation();

    const handleSignUp = () => {

    }

    const handleLoginIn = () => {
        navigation.navigate("Login");
    };

    return (
        <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
            <KeyboardAvoidingView
                style={styles.containerIn}
                behavior={Platform.OS === "ios" ? "padding" : 1000}
            >
                <View style={{ alignItems: 'center' }}><Text style={styles.RegisterText}>Code Screen</Text></View>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="code"
                        placeholderTextColor={'#B7B6BB'}
                        value={code}
                        onChangeText={text => setCode(text)}
                        style={[styles.input, styles.inputMarginBottom]}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={handleSignUp}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Подтвердить</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}

export default CheckEmailScreen;

const styles = StyleSheet.create({
    RegisterText: {
        marginTop: 110,
        marginBottom: 33,
        fontFamily: 'RobotoBold',
        fontSize: 28,
        color: '#4596EC',
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
        marginBottom: 15
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
