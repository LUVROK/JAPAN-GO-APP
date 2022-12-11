import { useNavigation } from "@react-navigation/native"
import React, { useEffect, useState } from "react"
import { View, Text, Button, Pressable, StyleSheet, Linking, Image } from 'react-native'
import { WebView } from 'react-native-webview';
import { Ionicons } from "@expo/vector-icons";

export default function WebViewScreen({ route }) {
    useEffect(() => {
        console.log(route.params.uri)
    }, [])
    const navigation = useNavigation();
    return (
        <View style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <View style={{ display: 'flex', flexDirection: 'row', width: '100%', backgroundColor: '#FEDBD0', alignContent: 'center', justifyContent: 'center' }}>
                <Pressable style={styles.arrowBlack} onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={28} color="black" />
                    <Text style={styles.arrowBlackText}>Назад</Text>
                </Pressable>
                <Pressable style={[styles.arrowBlack, { width: '60%' }]} onPress={() => Linking.openURL(`${route.params.uri}`)} >
                    <Text style={styles.LinkOpenUrlText}>Открыть в браузере</Text>
                </Pressable>
            </View>
            <WebView source={{ uri: `${route.params.uri}` }} style={{ backgroundColor: 'white', width: '100%' }}></WebView>
            {/* <WebView source={{ uri: `${route.params.uri}` }} style={{ backgroundColor: 'white', width: '100%' }}></WebView> */}
        </View>
    )
}

const styles = StyleSheet.create({
    arrowBlack: {
        display: 'flex',
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        // borderBottomWidth: 1,
        // borderColor: '#442C2E',
        width: '40%',
        // backgroundColor: 'white'
    },
    arrowBlackText: {
        marginLeft: 10,
        fontSize: 18,
    },
    LinkOpenUrlText: {
        position: 'absolute',
        right: 30,
        color: 'blue',
        fontSize: 16,
    }
})