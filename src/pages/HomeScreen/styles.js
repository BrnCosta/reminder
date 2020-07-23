import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 24,
        paddingTop: Constants.statusBarHeight + 20,
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    title: {
        fontSize: 36,
        fontFamily: 'BalooPaaji2-SemiBold',
        color: '#1891E9'
    },

    task: {
        marginVertical: 10,
        paddingLeft: 20,
        padding: 10,
        backgroundColor: '#F2F2F2',
        borderRadius: 10,
    },

    taskHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    taskTitle: {
        fontFamily: 'BalooPaaji2-SemiBold',
        fontSize: 18,
    },

    taskDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    taskDetail: {
        fontSize: 16,
        fontFamily: 'Roboto-Light',
    },

    swipeContainer: {
        height: 70,
        backgroundColor: '#00B300',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingRight: 15,
        borderRadius: 10,
        marginTop: 10,
    },

    swipeText: {
        fontFamily: 'BalooPaaji2-SemiBold',
        fontSize: 18,
        color: '#fff',
        paddingRight: 50,
    },

    blur: {
        ...StyleSheet.absoluteFill,
    }
})