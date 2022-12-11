import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
//import { auth } from '../firebase';
import { LoginStyles } from './styles/LoginStyles';
import { StatusBar } from 'expo-status-bar';
import { AuthContext } from './AuthContext/context';


const ForgotpasswordScreen = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [prop1, setprop1] = useState('Отправить код на почту')
    const [prop2, setprop2] = useState('Код')

    const { signIn } = React.useContext(AuthContext);

    const navigation = useNavigation();

    const handleSignUp = () => {
        navigation.navigate("Main");
    }

    const handleLogin = () => {
        setprop1('Войти')
        setprop2('Пароль')
    }

    return (
        <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
            <KeyboardAvoidingView
                style={LoginStyles.containerIn}
                behavior="padding"
            >
                <View style={{ alignItems: 'center' }}><Text style={LoginStyles.RegisterText}>Забывашка, ну ничего</Text></View>
                <View style={LoginStyles.inputContainer}>
                    <TextInput
                        placeholder="Email"
                        value={email}
                        onChangeText={text => setEmail(text)}
                        style={[LoginStyles.input, LoginStyles.inputMarginBottom]}
                    />
                    <View style={LoginStyles.ContainerPassword_Forgot}>
                        <TextInput
                            placeholder={prop2}
                            value={password}
                            onChangeText={text => setPassword(text)}
                            style={LoginStyles.input}
                            secureTextEntry
                        />
                    </View>
                </View>
                <View style={LoginStyles.buttonContainer}>
                    <TouchableOpacity
                        onPress={prop1 == "Login" ? () => { /*signIn()*/ } : handleLogin}
                        style={LoginStyles.button}
                    >
                        <Text style={LoginStyles.buttonText}>{prop1}</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}

export default ForgotpasswordScreen

const styles = StyleSheet.create({

})
