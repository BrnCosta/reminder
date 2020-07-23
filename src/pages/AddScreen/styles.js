import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        paddingTop: Constants.statusBarHeight + 20,
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    title: {
        fontSize: 36,
        fontFamily: 'BalooPaaji2-SemiBold',
        color: '#1891E9'
    },

    form: {
        marginHorizontal: 24,
        marginTop: 10,
        padding: 20,
        borderRadius: 10,
    },

    taskInput: {
        backgroundColor: '#F2F2F2',
        borderRadius: 6,
        
        paddingLeft: 10,
        paddingTop: 5,
        paddingBottom: 5,

        textAlignVertical: 'top',
        fontSize: 20,
        fontFamily: 'Roboto-Light',
        
        marginBottom: 15,
    },

    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 10,
    },

    iconText: {
        marginLeft: 5,
        fontSize: 22,
        fontFamily: 'Roboto-Light',
    },

    buttonContainer: {
        marginTop: 'auto',
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
})