import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import * as Font from 'expo-font';
import { AppLoading, Notifications } from 'expo';

import Routes from './src/routes';

import { TaskService } from './src/services/TaskService';
import { Database } from './src/database/databaseInit';

export default function App() {

    const [fontLoaded, setFontLoaded] = useState(false);

    useEffect(() => {
        loadFont();
        DbInit();
        loadNotifications();
    }, [])

    async function DbInit() {
        await Database.Init();
    }

    async function loadFont(){
        await Font.loadAsync({
            'BalooPaaji2-Bold': require('./src/assets/fonts/BalooPaaji2-Bold.ttf'),
            'BalooPaaji2-SemiBold': require('./src/assets/fonts/BalooPaaji2-SemiBold.ttf'),
            'Roboto-Light': require('./src/assets/fonts/Roboto-Light.ttf'),
        })
        setFontLoaded(true);
    }

    function loadNotifications() {
        if(Platform.OS === 'android') {
            Notifications.createChannelAndroidAsync('reminders', {
                name: 'Reminders',
                sound: true,
                priority: 'max',
                vibrate: [0, 250, 250, 250],
            })
        }

        Notifications.createCategoryAsync('reminder_category',[
            {
                actionId: 'done',
                buttonTitle: 'Concluir',
            },
            {
                actionId: 'postpone',
                buttonTitle: 'Soneca (+5min)',
            }
        ])

        Notifications.addListener((notification) => {
            handleListener(notification);
        });

        async function handleListener(event){
            console.log('a')
            if(event.origin === 'selected'){
                console.log('b')
                event.actionId === 'done' ?
                    await TaskService.setDoneByNotification(event.notificationId) :
                    await TaskService.rescheduleNotification(event.notificationId);
            }
        }
    }

    if(!fontLoaded){
        return <AppLoading />
    } else {
        return(
            <Routes />
        );
    }
}
