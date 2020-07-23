import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Animated, Easing } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';

import { useNavigation } from '@react-navigation/native';

import { Feather } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

import Moment from 'moment';

import { TaskService } from '../../services/TaskService';
import ModalService from '../../services/ModalService';

import styles from './styles';

export default function HomeScreen() {

    const [tasks, setTasks] = useState([]);
    const [fadeAnim, setFadeAnim] = useState([]);
    const [length, setLength] = useState(0);

    const [blur, setBlur] = useState({});
    const [visible, setVisible] = useState(false);

    const navigation = useNavigation();

    useEffect(() => {
        idAnimation();
        getTasks();
    }, [tasks]);

    function navigateToAdd() {
        navigation.navigate('AddScreen');
    }

    function navigateToDetail(task) {
        navigation.navigate('DetailScreen', { task });
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

    async function getTasks() {
        try {
            const response = await TaskService.getNotDone();
            setTasks(response._array);
        } catch(err) {
            handleModal('open');
            console.log(err);
        }
    }

    async function setTaskDone(id) {
        try {
            const response = await TaskService.setTaskDone(id);

        } catch (err) {
            handleModal('open');
            console.log(err);
        }
    }

    function idAnimation(){
        const arr = [];
        if(fadeAnim.length === 0 || tasks.length != length) {
            setLength(tasks.length);
            tasks.forEach(item => {
                arr[item.id] = new Animated.Value(1);
            });
            setFadeAnim(arr);
         }
    }

    function fadeOut(id) {
        Animated.timing(fadeAnim[id], {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
            easing: Easing.linear,
        }).start(() => {
            setTaskDone(id)
        });
    }

    return(
        <View style={{ flex: 1 }}>
            <ModalService type={'formError'} visible={visible} onPress={() => handleModal('close')} />
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Reminder</Text>
                    <TouchableOpacity onPress={() => navigateToAdd()}>
                        <Feather name='plus' size={25} color='#1891E9' />
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={tasks}
                    style={styles.taskList}
                    keyExtractor={task => String(task.id)}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item: task}) => (
                        <Swipeable
                            onSwipeableRightOpen={() => fadeOut(task.id)}
                            renderRightActions={() =>
                                <Animated.View style={[styles.swipeContainer, { opacity: fadeAnim[task.id] }]}>
                                    <Text style={styles.swipeText}>Tarefa Concluída</Text>
                                    <Feather name='check' size={35} color='#FFF' />
                                </Animated.View>
                            }
                        >
                            <TouchableOpacity activeOpacity={0.5} onPress={() => navigateToDetail(task)}>
                                <Animated.View style={styles.task}>
                                    <View style={styles.taskHeader}>
                                        <Text style={styles.taskTitle} numberOfLines={1}>{task.title}</Text>
                                    </View>
                                    <View style={styles.taskDetails}>
                                        <Text style={styles.taskDetail}>{Moment(task.date).format('DD/MM')}</Text>
                                        <Text style={styles.taskDetail}>{Moment(task.time, 'HH:mm:ss').format('HH:mm')}</Text>
                                    </View>
                                </Animated.View>
                            </TouchableOpacity>
                        </Swipeable>
                    )}
                />
            </View>
            <BlurView tint='dark' intensity={50} style={blur}/>
        </View>
    );
}