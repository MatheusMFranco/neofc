import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './src/pages/SplashScreen';
import Configuration from './src/pages/Configuration';
import Language from './src/pages/Language';

const Stack = createNativeStackNavigator();

export default function AppRoutes() {
    return <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }}  />
            <Stack.Screen name="Configuration" component={Configuration} options={{ headerShown: false }} />
            <Stack.Screen name="Language" component={Language} options={{ headerShown: false }} />
        </Stack.Navigator>
    </NavigationContainer>;
}
