
import { useNavigation } from '@react-navigation/native';
import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Pressable, ImageBackground, Alert, Animated, Button } from 'react-native';
import { MainScreen } from './styles/GL';
import { AntDesign } from '@expo/vector-icons';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const ButtonHKK = (props) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const navigation = useNavigation();

    const fadeIn = () => {
        // Will change fadeAnim value to 1 in 5 seconds
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true // Add This line
        }).start();
    };

    const fadeOut = () => {
        // Will change fadeAnim value to 0 in 3 seconds
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true // Add This line
        }).start();
    };

    const hundleForgot = (toScreen) => {
        navigation.navigate(`${toScreen}`);
    };

    return (
        <AnimatedPressable style={MainScreen.trainer}
            onPress={() => props.hundleHiragana(props.messege)}
        >
            <Animated.View
                style={[
                    { width: '100%', height: '100%', position: 'absolute', top: -3, left: -3 },
                    styles.fadingContainer,
                    {
                        transform: [{
                            translateY: fadeAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, 6]  // 0 : 150, 0.5 : 75, 1 : 0
                            }),
                        },
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
                <ImageBackground style={[{ width: '100%', height: '100%', position: 'absolute', top: -3, left: -3 }]}
                    imageStyle={[{ borderRadius: 15 }]}
                    resizeMode='cover'
                    source={props.source}
                >
                    <Text style={[MainScreen.trainerText, props.styling]}>{props.textMain}</Text>
                    <AntDesign name="right" size={32} color="#FEDBD0" style={MainScreen.iconAntD} onPress={fadeIn} />
                </ImageBackground>
                <TouchableWithoutFeedback onPressOut={fadeOut} onPressIn={fadeIn}>
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

export default ButtonHKK