import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from './pages/HomeScreen';
import AddScreen from './pages/AddScreen';
import DetailScreen from './pages/DetailScreen';
import EditScreen from './pages/EditScreen';

const AppStack = createStackNavigator();

export default function Routes() {

    return (
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{ headerShown: false }}>
                <AppStack.Screen name='Home' component={HomeScreen} />
                <AppStack.Screen name='AddScreen' component={AddScreen} />
                <AppStack.Screen name='DetailScreen' component={DetailScreen} />
                <AppStack.Screen name='EditScreen' component={EditScreen} />
            </AppStack.Navigator>
        </NavigationContainer>
    );
}