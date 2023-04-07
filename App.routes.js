import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './src/pages/SplashScreen';
import History from './src/pages/History';

const Stack = createNativeStackNavigator();

export default function AppRoutes() {
    return <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }}  />
            <Stack.Screen name="History" component={History} options={{ headerShown: false }} />
        </Stack.Navigator>
    </NavigationContainer>;
}
