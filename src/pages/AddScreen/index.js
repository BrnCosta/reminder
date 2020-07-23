import React, { useState } from 'react';
import { View, ScrollView, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Feather } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

import ModalService from '../../services/ModalService';
import { ScheduleService } from '../../services/ScheduleService';
import { TaskService } from '../../services/TaskService';

import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';
import 'moment/locale/pt-br';

import styles from './styles';

export default function AddScreen() {
    const navigation = useNavigation();

    const [value, setValue] = useState(Moment().add(1, 'minutes').valueOf());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const [blur, setBlur] = useState({});
    const [visible, setVisible] = useState(false);
    const [visibleForm, setVisibleForm] = useState(false);

    const [visibleModal, setVisibleModal] = useState([false, false, false]);


    const [titleError, setTitleError] = useState({});
    const [dateError, setDateError] = useState({});
    const [timeError, setTimeError] = useState({});

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    async function insertTask(){
        const data = {
            title: title,
            description: description,
            date: date,
            time: time,
        }

        if(title === '' || date === '' || time === ''){
            checkEmptyInput();
            return;
        }

        try {
            const scheduleID = await ScheduleService.scheduleTask(data);
            console.log('Tarefa agendada com sucesso: ' + scheduleID);

            const response = await TaskService.addTask(data, scheduleID);
            console.log('Tarefa inserida com sucesso. ID: ' + response);
            navigation.goBack();

        } catch(err){
            handleModalVisible('open', 'alert');
            console.log(err);
        }
    }

    function checkEmptyInput(){
        if(title === ''){
            setTitleError({ borderWidth: 1, borderColor: '#e60000' });
        }

        if(date === ''){
            setDateError({ color: '#e60000' });
        }

        if(time === ''){
            setTimeError({ color: '#e60000' });
        }

        handleModalVisible('open', 'form');
    }

    function onChange(event, selectedValue){
        const currentValue = selectedValue || value;
        setShow(Platform.OS === 'ios');
        if(event.type !== 'dismissed'){
            setValue(currentValue);
            defineDate(currentValue);
        }
    }

    function defineDate(currentValue){
        if(mode === 'date'){
            setDate(Moment(currentValue).format('YYYY-MM-DD'));
            setDateError({});
        }else{
            if(Moment(currentValue).isAfter(Moment())){
                setTime(Moment(currentValue).format('HH:mm'));
                setTimeError({});
            } else{
                handleModalVisible('open', 'date');
                setTimeError({ color: '#e60000' });
            }
        }
    }

    function showMode(currentMode){
        setShow(true);
        setMode(currentMode);
    } 

    function returnPage(){
        navigation.goBack();
    }

    function handleModalVisible(handler, form){
        const arr = [...visibleModal];
        switch(form) {
            case 'alert':
                if(handler === 'open'){
                    arr[0] = true;
                    setVisibleModal(arr);
                    setBlur(styles.blur);
                } else{
                    arr[0] = false;
                    setVisibleModal(arr);
                    setBlur({});
                }
                break;
            
            case 'form':
                if(handler === 'open'){
                    arr[1] = true;
                    setVisibleModal(arr);
                    setBlur(styles.blur);
                } else{
                    arr[1] = false;
                    setVisibleModal(arr);
                    setBlur({});
                }
                break;
        
            case 'date':
                if(handler === 'open'){
                    arr[2] = true;
                    setVisibleModal(arr);
                    setBlur(styles.blur);
                } else{
                    arr[2] = false;
                    setVisibleModal(arr);
                    setBlur({});
                }
                break;
        }
    }

    return(
        <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }} keyboardShouldPersist={false}>
            <ModalService type={'alert'} visible={visibleModal[0]} onPress={() => handleModalVisible('close', 'alert')} />
            <ModalService type={'form'} visible={visibleModal[1]} onPress={() => handleModalVisible('close', 'form')} />
            <ModalService type={'date'} visible={visibleModal[2]} onPress={() => handleModalVisible('close', 'date')} />

            <View style={styles.header}>
                <Text style={styles.title}>Reminder</Text>
            </View>

            <View style={styles.form}>
                <TextInput maxLength={50} placeholder={'Título da Tarefa'} onChangeText={text => setTitle(text)} style={[styles.taskInput, titleError]} />

                <TextInput 
                    maxLength={150}
                    multiline={true} 
                    placeholder={'Descrição'} 
                    onChangeText={text => setDescription(text)} 
                    style={[styles.taskInput, { height: 200 }]} 
                />

                <TouchableOpacity style={styles.iconContainer} onPress={() => showMode('date')}>
                    <Feather name='calendar' size={25} color='#1891E9' />
                    <Text style={[styles.iconText, dateError]}>{date === '' ? 'Definir data' : Moment(date).format('LL')}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.iconContainer} onPress={() => showMode('time')}>
                    <Feather name='clock' size={25} color='#1891E9' />
                    <Text style={[styles.iconText, timeError]}>{time === '' ? 'Definir horário': time}</Text>
                </TouchableOpacity>

            </View>

            <View style={styles.buttonContainer}>

                <TouchableOpacity style={styles.button} onPress={insertTask}>
                    <Feather name='check' size={25} color='#1891E9' />
                    <Text style={styles.buttonText}>Salvar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={returnPage}>
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

            <BlurView tint='dark' intensity={50} style={blur}/>
        </ScrollView>
    )
}