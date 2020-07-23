import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { Notifications } from 'expo';
import { Feather } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

import Moment from 'moment';
import 'moment/locale/pt-br';

import { ScheduleService } from '../../services/ScheduleService';
import { TaskService } from '../../services/TaskService';
import ModalService from '../../services/ModalService';

import styles from './styles';

export default function DetailScreen() {
    const navigation = useNavigation();
    const route = useRoute();

    const [blur, setBlur] = useState({});
    const [visible, setVisible] = useState(false);
    const [visibleAlert, setVisibleAlert] = useState(false);

    const task = route.params.task;

    function returnPage(){
        navigation.goBack();
    }

    function navigateToEdit(task) {
        navigation.navigate('EditScreen', { task });
    }

    async function deleteTask(id) {
        try {
            await ScheduleService.deleteSchedule(task.scheduleID);
            console.log('Alerta deletado com sucesso');

            await TaskService.deleteTask(id);
            console.log('Tarefa deletada com sucesso');

            handleModal('close');
            returnPage();

        } catch(err) {
            handleModal('close');
            handleModalAlert('open');
            console.log(err);
        }
    }

    function handleModal(handler){
        if(handler === 'open'){
            setVisible(true);
            setBlur(styles.blur);
        } else {
            setVisible(false);
            setBlur({});
        }
    }

    function handleModalAlert(handler){
        if(handler === 'open'){
            setVisibleAlert(true);
            setBlur(styles.blur);
        } else {
            setVisibleAlert(false);
            setBlur({});
        }
    }

    return(
        <View style={styles.container}>
            <ModalService type={'confirm'} visible={visible} onPress={() => handleModal('close')} onConfirm={() => deleteTask(task.id)} />
            <ModalService type={'alert'} visible={visibleAlert} onPress={() => handleModalAlert('close')} />
            <View style={styles.header}>
                <TouchableOpacity style={styles.headerIcon} onPress={returnPage}>
                    <Feather name='arrow-left' size={25} color="#1891E9" />
                </TouchableOpacity>
                <Text style={styles.title}>Reminder</Text>
            </View>

            <View style={styles.taskContainer}>
                <Text style={styles.taskTitle}>{task.title}</Text>
                <Text style={styles.description}>{task.description}</Text>

                <View style={styles.taskDate}>
                    <Text style={styles.Property}>Data</Text>
                    <Text style={styles.Value}>{Moment(task.date).format('LL')}</Text>
                </View>

                <View style={styles.taskHour}>
                    <Text style={styles.Property}>Hora</Text>
                    <Text style={styles.Value}>{Moment(task.time, 'HH:mm:ss').format('HH:mm')}</Text>
                </View>
            </View>

            <View style={styles.buttonContainer}>

                <TouchableOpacity style={styles.button} onPress={() => navigateToEdit(task)}>
                    <Feather name='edit' size={20} color='#1891E9' />
                    <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => handleModal('open')}>
                    <Feather name='trash-2' size={20} color='red' />
                    <Text style={styles.buttonText}>Excluir</Text>
                </TouchableOpacity>

            </View>
            <BlurView tint='dark' intensity={50} style={blur}/>
        </View>
    )
}