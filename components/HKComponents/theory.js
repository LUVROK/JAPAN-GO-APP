import { useNavigation } from "@react-navigation/native"
import React, { useState, useEffect } from "react"
import { StyleSheet, View, Button, Text } from 'react-native'
import axios from 'axios'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { Audio } from "expo-av";
import styleHK from './styleHK'
import { playSound, switchSound } from "./soundPlay";
import { baseURL } from '../axiosUrl.js'

axios.defaults.baseURL = `${baseURL}`

const Theory = ({ route }) => {

    const [resources, setResources] = useState([])
    const [page, setPage] = useState(route.params.plusPage)
    const [row, setRow] = useState({ "row": route.params.simplerow })
    const [rowNumber, setRowNumber] = useState({ "rowNumber": route.params.rowNumber })
    const [maxPage, setMaxPage] = useState(route.params.plusPage + 4)
    const [stateSymbol, setStateSymbol] = useState()
    const [stateRomaji, setStateRomaji] = useState()
    const [statePolivanov, setStatePolivanov] = useState()
    const [messegeSoundHelp, setmessegeSoundHelp] = useState('Нажмите на слог для повтора прослушивания')
    // const { simplerow, otherParam } = props.params
    // const row = route.params.simplerow;

    useEffect(() => {
        onloadData(route.params.alphabet, route.params.dataRow);
        console.log(route.params.rowNumber);
        console.log(route.params.plusPage);
        if (route.params.rowNumber === 8 || route.params.rowNumber === 10) {
            setMaxPage(route.params.plusPage + 2)
        }
        // setPage(route.params.Page)
    }, [])

    const onloadData = async (alphabet, dataRow) => {
        try {
            const data = await axios.post(`/${alphabet}/${dataRow}`, {
                headers: {
                    'Content-type': 'Application/json',
                    'Accept': 'Application/json',
                },
                data: rowNumber,
            }).then(console.log('Успешно')).catch((error) => {
                Alert.alert(error.message);
            });
            setResources(data.data.xt)

            // setPage(page + route.params.plusPage)

            let syb = data.data.xt.find(el => el.id === page);
            console.log(syb)
            await setStateSymbol(syb["writing"])
            await setStateRomaji(syb["romaji"])
            await setStatePolivanov(syb["polivanov"])
            await switchSound(syb["romaji"])
            console.log(stateSymbol)

            console.log(data.data.xt)
            // setMaxPage(data.data.xt.length)
            // console.log(data.length)
            // console.log('че там по деньгам ' + JSON.stringify(data))
            // const audio = data.data.xt[0].audio
            // console.log(audio)
        }
        catch (e) {
            console.log(e.message)
            console.log('тут')
        }
    }

    const navigation = useNavigation();

    const SecondScreen = async () => {
        if (page >= maxPage) {
            console.log('maxPage ' + maxPage)
            navigation.navigate("Practice", {
                resources: resources,
                simplerow: route.params.simplerow,
                rowNumber: route.params.rowNumber,
                plusPage: route.params.plusPage,
                maxPage: route.params.maxPage,
                alphabet: route.params.alphabet,
                dataRow: route.params.dataRow
            });
        }
        else {
            await setPage(page + 1)
            // console.log(resources)
            let syb = resources.find(el => el.id === page + 1);
            await setStateSymbol(syb['writing'])
            await setStateRomaji(syb["romaji"])
            await setStatePolivanov(syb["polivanov"])
            await switchSound(syb["romaji"])
        }
    }


    const BackScreen = async () => {
        if (page > (maxPage - 4) && page <= maxPage) {
            await setPage(page - 1)
            let syb = resources.find(el => el.id === page - 1);
            await setStateSymbol(syb['writing'])
            await setStateRomaji(syb["romaji"])
            await setStatePolivanov(syb["polivanov"])
            await switchSound(syb["romaji"])
        }
        else {
            if (route.params.dataRow === 'katakanas') {
                navigation.navigate("Main_KatakanaScreen");
            }
            if (route.params.dataRow === 'hiraganas') {
                navigation.navigate("Main_HiraganScreen");
            }
        }
    }

    const goBack = () => {
        navigation.navigate("Tab");
    }

    return (
        <View style={styleHK.mainComp}>
            <Pressable style={styleHK.arrowBlack} onPress={goBack}>
                <Ionicons name="arrow-back" size={28} color="black" />
                <Text style={styleHK.arrowBlackText}>Ряд {row.row}</Text>
            </Pressable>
            <Text style={styleHK.textPageNum}>Cимвол - {page}</Text>
            <Pressable style={styleHK.PressableSwitchSound} onPress={() => switchSound(stateRomaji)}>
                <Text style={styleHK.textstateSymbol}>{stateSymbol}</Text>
                <View style={styleHK.flexRow}>
                    <Text style={styleHK.stateRP}>{stateRomaji} / </Text>
                    <Text style={styleHK.stateRP}>{statePolivanov}</Text>
                </View>
                {
                    page === route.params.maxPage - 5 ? (
                        <Text style={styleHK.messegeSoundHelp}>{messegeSoundHelp}</Text>
                    ) : null
                }
            </Pressable>
            <View style={styleHK.backANDforth}>
                <Pressable style={styleHK.btn} onPress={BackScreen}><Text style={styleHK.textbackANDforth}>Назад</Text></Pressable>
                <Pressable style={styleHK.btn} onPress={SecondScreen}><Text style={styleHK.textbackANDforth}>Дальше</Text></Pressable>
            </View>
        </View>
    )
}

export default Theory;