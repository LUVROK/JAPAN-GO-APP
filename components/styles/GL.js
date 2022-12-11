import { StyleSheet } from 'react-native';

export const MainScreen = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    containerAll: {
        flex: 1,
        // paddingTop: 30,
        paddingLeft: 20,
        backgroundColor: '#FFFFFF',
    },
    text: {
        fontFamily: 'RobotoBold',
        fontSize: 18,
        paddingTop: 13,
        paddingBottom: 13,
        paddingLeft: 0,
        color: '#442C2E'
    },
    textViewCont: {
        marginBottom: 0,
        // height: 40,
        alignItems: 'center',
        backgroundColor: '#FEDBD0',
        color: '#442C2E',
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: {
            width: 0,
            height: 2
        },
    },
    img1: {
        justifyContent: 'flex-start',
        width: '95%',
        backgroundColor: '#FEDBD0',
        height: 253,
        marginTop: 20,
        resizeMode: 'contain'
    },
    img2: {
        //justifyContent: 'flex-start',
        width: 130,
        height: 110,
        marginTop: 20,
        marginBottom: 10,
        resizeMode: 'contain',
    },
    trainerContainer: {
        display: 'flex',
        flexDirection: 'column',
        // position: 'relative',
        // justifyContent: 'space-around',
        // alignItems: 'center',
        marginRight: 20,
        marginTop: 20,
        // height: 300,
    },
    trainer: {
        position: 'relative',
        // flexDirection: 'column',
        width: '100%',
        height: 110,
        // justifyContent: 'flex-end',
        borderRadius: 15,
        // alignItems: 'flex-start',
        borderWidth: 1,
        borderColor: '#FEDBD0',
        borderRadius: 15,
        backgroundColor: '#FEDBD0',
        // shadowColor: "#000",
        // shadowOpacity: 0.5,
        // shadowRadius: 8,
        // shadowOffset: {
        //     width: 0,
        //     height: 0
        // },
        marginRight: 20,
        marginBottom: 20,

    },
    trainerText: {
        fontFamily: 'RobotoBold',
        margin: 20,
        fontSize: 16,
        color: '#442C2E',
    },
    IMG_KATAKANA: {

    },
    iconAntD: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        margin: 10,
    },
    statCont: {
        margin: 20,
        marginTop: 35,
        borderRadius: 30,
        padding: 20,
        alignItems: 'center',
        backgroundColor: '#FEDBD0',
        // shadowColor: "#000",
        // shadowOpacity: 0.42,
        // shadowRadius: 10,
        // shadowOffset: {
        //     width: 0,
        //     height: 0
        // },
    },
    TextStyleStat: {
        fontFamily: 'RobotoBold',
        fontSize: 18,
        color: '#442C2E',
        letterSpacing: 1
    },
    StatWindowPoints: {
        margin: 20,
        height: 260,
        borderRadius: 20,
        padding: 10,
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#FEDBD0',
        // shadowColor: "#fff",
        // shadowOpacity: 0.1,
        // shadowRadius: 4,
        // shadowOffset: {
        //     width: 0,
        //     height: 0
        // },
    }
})