import { StyleSheet } from 'react-native';

export const HK_stylesMainScreen = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
    },


    //TaskComp
    trainer: {
        position: 'relative',
        width: 'auto',
        height: 75,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#FEDBD0',
        borderRadius: 15,
        alignItems: 'center',
        // backgroundColor: '#FEDBD0',
        // shadowColor: "#000",
        // shadowOpacity: 0.5,
        // shadowRadius: 8,
        // shadowOffset: {
        //     width: 0,
        //     height: 0
        // },
        margin: 20,
        marginBottom: 0,
        marginTop: 10,
    },
    trainerText: {
        fontFamily: 'RobotoBold',
        margin: 20,
        // marginTop: 0,
        // marginBottom: 0,
        fontSize: 16,
        color: '#442C2E',
    },
    textMainProp: {
        marginTop: 0,
        marginBottom: 0,
        fontSize: 18,
    },
    textMainLittle: {
        fontSize: 12,
        color: '#442C2E',
        fontFamily: 'RobotoLight',
        marginTop: 2
    },
    iconAntD: {
        position: 'absolute',
        // bottom: 0,
        right: 0,
        margin: 10,
        marginRight: 20
    },
})