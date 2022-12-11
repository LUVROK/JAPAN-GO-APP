import { useNavigation } from '@react-navigation/native';
import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Pressable, ImageBackground, Alert, Animated, Button } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { HK_stylesMainScreen } from '../styles/HK_stylesMainScreen';
import { MainScreen } from '../styles/GL';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const ComponentTaskH = (props) => {
    useEffect(() => {
        console.log(props.onPress)
    }, [])

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const navigation = useNavigation();

    const OpenTheory = (mass) => {
        // row, rowNumber, Page, alphabet
        let dataRow = ''
        mass[3] === 'hiraganas' ? dataRow = 'HiraganaDataRow' : dataRow = 'KatakanaDataRow';
        navigation.navigate("Theory", {
            simplerow: mass[0],
            rowNumber: mass[1],
            plusPage: mass[2],
            maxPage: mass[2] + 5,
            alphabet: mass[3],
            dataRow: dataRow
        });
    }

    const fadeIn = () => {
        // Will change fadeAnim value to 1 in 5 seconds
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 75,
            useNativeDriver: true // Add This line
        }).start();
    };

    const fadeOut = () => {
        // Will change fadeAnim value to 0 in 3 seconds
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 75,
            useNativeDriver: true // Add This line
        }).start();
    };

    return (
        <AnimatedPressable style={HK_stylesMainScreen.trainer}
        // onPress={() => props.hundleHiragana(props.messege)}
        >
            <Animated.View
                style={[
                    { width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 },
                    styles.fadingContainer,
                    {
                        transform: [
                            // {
                            //     translateY: fadeAnim.interpolate({
                            //         inputRange: [0, 1],
                            //         outputRange: [0, 6]  // 0 : 150, 0.5 : 75, 1 : 0
                            //     }),
                            // },
                            {
                                translateX: fadeAnim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, 6]  // 0 : 150, 0.5 : 75, 1 : 0
                                })
                            }
                        ]
                    }
                ]}
            >
                {/* <ImageBackground style={[{ width: '100%', height: '100%', position: 'absolute', top: -3, left: -3, justifyContent: 'center' }]}
                    imageStyle={[{ borderRadius: 15 }]}
                    resizeMode='cover'
                    source={props.source}
                > */}
                <View style={[{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, justifyContent: 'center', borderRadius: 15 }]}>
                    <View style={{ margin: 0, }}>
                        <Text style={[HK_stylesMainScreen.trainerText, HK_stylesMainScreen.textMainProp]}>{props.textMain}</Text>
                        <Text style={[HK_stylesMainScreen.trainerText, HK_stylesMainScreen.textMainProp, HK_stylesMainScreen.textMainLittle]}>{props.textMainMini}</Text>
                    </View>
                    <AntDesign name="right" size={32} color="#FEDBD0" style={HK_stylesMainScreen.iconAntD} onPress={fadeIn} />
                </View>
                {/* </ImageBackground> */}
                <TouchableWithoutFeedback onPressOut={fadeOut} onPressIn={fadeIn} onPress={() => OpenTheory(props.onPress)}>
                    <View style={{ width: '100%', height: '100%' }}></View>
                </TouchableWithoutFeedback>
            </Animated.View>
        </AnimatedPressable>
    );

}

const styles = StyleSheet.create({
    iconContainer: {
        height: 70,
        width: 70,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default ComponentTaskH;