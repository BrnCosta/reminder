import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        paddingTop: Constants.statusBarHeight + 20,
    },

    header: {
        paddingHorizontal: 35,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },

    title: {
        flexGrow: 1.5,
        fontSize: 36,
        fontFamily: 'BalooPaaji2-SemiBold',
        color: '#1891E9'
    },

    headerIcon: {
        flexGrow: 1,
    },

    taskContainer: {
        paddingHorizontal: 40,
        flexGrow: 2,
    },

    taskTitle: {
        marginVertical: 10,
        fontFamily: 'Roboto',
        fontWeight: '400',
        fontSize: 25,
    },

    description: {
        marginVertical: 20,
        height: 'auto',
        fontFamily: 'Roboto-Light',
        fontSize: 20,
    },

    taskDate: {
        marginTop: 'auto',
        marginBottom: 15,
    },

    taskHour: {
        marginBottom: 50,
    },

    Property: {
        fontFamily: 'Roboto-Light',
        fontSize: 15,
    },

    Value: {
        fontFamily: 'Roboto-Light',
        fontSize: 25,
    },

    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#F2F2F2',
        height: 50,
    },

    button: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    buttonText: {
        marginLeft: 10,
    },

    blur: {
        ...StyleSheet.absoluteFill,
    }
});