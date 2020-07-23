import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function ModalService({
        type,
        visible,
        onPress,
        onConfirm,
}) {
    return(
        <Modal
            animationType='slide'
            transparent={true}
            visible={visible}
        >
            <View style={styles.container}>
                {(type === 'alert') && (
                    <View style={styles.modalContainer}>
                        <Text style={styles.text}>Ocorreu um erro. Tente novamente mais tarde</Text>
                        <View style={styles.buttons}>
                            <TouchableOpacity
                            style={styles.button}
                            onPress={onPress}
                            hitSlop={{top: 10, left: 50, bottom: 10, right: 50}}
                        >
                                <Text style={[styles.buttonText, { color: '#1891E9' }]}>Ok</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}

                {(type === 'confirm') && (
                    <View style={styles.modalContainer}>
                        <Text style={styles.text}>Deseja realmente excluir essa tarefa?</Text>
                        <View style={styles.buttons}>
                            <TouchableOpacity
                            style={[styles.button, { paddingLeft: 20 }]}
                            onPress={onConfirm}
                            hitSlop={{top: 10, left: 50, bottom: 10, right: 50}}
                        >
                                <Text style={[styles.buttonText, { color: '#1891E9' }]}>Ok</Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                style={[styles.button]}
                                onPress={onPress}
                                hitSlop={{top: 10, left: 20, bottom: 10, right: 20}}
                            >
                                <Text style={[styles.buttonText, { color: 'red' }]}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}

                {(type === 'form') && (
                    <View style={styles.modalContainer}>
                        <Text style={styles.text}>Por favor, preencha todos os campos obrigatórios</Text>
                        <View style={styles.buttons}>
                            <TouchableOpacity
                            style={styles.button}
                            onPress={onPress}
                            hitSlop={{top: 10, left: 50, bottom: 10, right: 50}}
                        >
                                <Text style={[styles.buttonText, { color: '#1891E9' }]}>Ok</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}

                {(type === 'date') && (
                    <View style={styles.modalContainer}>
                        <Text style={styles.text}>Por favor, selecione uma data do futuro.</Text>
                        <View style={styles.buttons}>
                            <TouchableOpacity
                            style={styles.button}
                            onPress={onPress}
                            hitSlop={{top: 10, left: 50, bottom: 10, right: 50}}
                        >
                                <Text style={[styles.buttonText, { color: '#1891E9' }]}>Ok</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </View>
        </Modal>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    modalContainer: {
        flex: 0.2,
        elevation: 50,
        maxWidth: 300,
        borderRadius: 10,
        justifyContent: 'space-between',
        alignItems: 'stretch',
        backgroundColor: '#FFF',
    },

    buttons: {
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 7,
        backgroundColor: '#F2F2F2',
    },

    button: {
        marginHorizontal: 20,
    },

    buttonText: {
        fontFamily: 'Roboto-Light',
        fontSize: 20,
    },

    text: {
        marginHorizontal: 10,
        textAlign: 'center',
        marginTop: 20,
        fontFamily: 'Roboto-Light',
        fontSize: 18,
    }
});