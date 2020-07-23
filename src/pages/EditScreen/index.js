import React, { useState } from 'react';
import { View, ScrollView, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import { TaskService } from '../../services/TaskService';
import { ScheduleService } from '../../services/ScheduleService';

import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';
import 'moment/locale/pt-br';

import styles from './styles';

export default function EditScreen() {
    const navigation = useNavigation();

    const route = useRoute();
    const task = route.params.task;

    const [value, setValue] = useState(new Date(task.date+'T'+task.time+':00-03:00'));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [date, setDate] = useState(task.date);
    const [time, setTime] = useState(task.time);

    async function updateTask(id) {
        const data = {
            title: title,
            description: description,
            date: date,
            time: time,
        }

        try {
            await ScheduleService.deleteSchedule(task.scheduleID);

            const scheduleId = await ScheduleService.scheduleTask(data);
            console.log('Alerta reagendado com sucesso');

            await TaskService.updateTask(id, data, scheduleId);
            console.log('Tarefa atualizada com sucesso');
            returnToHome();

        } catch(err) {
            Alert.alert('Ocorreu um erro no banco de dados', 'Tente novamente.',
                [{ text: 'OK' }]
            )
            console.log(err);
        }
    }

    function onChange(event, selectedValue) {
        const currentValue = selectedValue || value;
        setShow(Platform.OS === 'ios');
        setValue(currentValue);
        defineDate(currentValue);
    }

    function defineDate(currentValue){
        mode === 'date' ?
            setDate(Moment(currentValue).format('YYYY-MM-DD')) :
            setTime(Moment(currentValue).format('HH:mm'));
    }

    function showMode(currentMode) {
        setShow(true);
        setMode(currentMode);
    } 

    function returnToHome() {
        navigation.navigate('Home');
    }

    return(
        <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }} keyboardShouldPersist={false}>
            <View style={styles.header}>
                <Text style={styles.title}>Reminder</Text>
            </View>

            <View style={styles.form}>
                <TextInput
                    value={title}
                    maxLength={50}
                    placeholder={'Título da Tarefa'}
                    onChangeText={text => setTitle(text)}
                    style={styles.taskInput}
                />

                <TextInput 
                    value={description}
                    maxLength={150}
                    multiline={true} 
                    placeholder={'Descrição'} 
                    onChangeText={text => setDescription(text)} 
                    style={[styles.taskInput, { height: 200 }]} 
                />

                <TouchableOpacity style={styles.iconContainer} onPress={() => showMode('date')}>
                    <Feather name='calendar' size={25} color='#1891E9' />
                    <Text style={styles.iconText}>{date === '' ? 'Definir data' : Moment(date).format('LL')}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.iconContainer} onPress={() => showMode('time')}>
                    <Feather name='clock' size={25} color='#1891E9' />
                    <Text style={styles.iconText}>{time === '' ? 'Definir horário' : time}</Text>
                </TouchableOpacity>

            </View>

            <View style={styles.buttonContainer}>

                <TouchableOpacity style={styles.button} onPress={() => updateTask(task.id)}>
                    <Feather name='check' size={25} color='#1891E9' />
                    <Text style={styles.buttonText}>Salvar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={returnToHome}>
                    <Feather name='x' size={25} color='red' />
                    <Text style={styles.buttonText}>Cancelar</Text>
                </TouchableOpacity>
                
            </View>

            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    timeZoneOffsetInMinutes={180}
                    value={value}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                    minimumDate={new Date()}
                />
            )}

        </ScrollView>
    )
}