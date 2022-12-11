import { StyleSheet } from "react-native";

const styleHK = StyleSheet.create({
    mainComp: {
        marginTop: 50,
        // marginLeft: 20,
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center'
    },
    textPageNum: {
        position: 'absolute',
        top: 40,
        marginLeft: 20,
    },
    PressableSwitchSound: {
        display: 'flex',
        alignItems: 'center',
        top: -25,
    },
    textstateSymbol: {
        fontSize: 72
    },
    textbtnPractices: {
        fontSize: 18,
    },
    flexRow: {
        display: 'flex',
        flexDirection: 'row'
    },
    stateRP: {
        fontSize: 18,
        color: '#442C2E'
    },
    messegeSoundHelp: {
        display: 'flex',
        position: 'absolute',
        opacity: 0.4,
        top: 126
    },
    backANDforth: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 50,
        // marginLeft: 30,
        // marginRight: 30
    },
    btnPractices: {
        marginLeft: 40,
        marginRight: 40,
        marginTop: 20,
    },
    btnPracticePress: {
        height: 60,
        width: 120,
    },
    btnPressPractice: {
        backgroundColor: 'black',
    },
    textbackANDforth: {
        color: '#442C2E'
    },
    arrowBlack: {
        display: 'flex',
        position: 'absolute',
        top: 0,
        marginLeft: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    arrowBlackText: {
        marginLeft: 5,
        fontSize: 18
    },
    btn: {
        backgroundColor: '#FEDBD0',
        height: 50,
        width: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    }
})

export default styleHK;