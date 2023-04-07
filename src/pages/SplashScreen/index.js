import React, { createRef } from 'react';
import { View } from 'react-native';

import LottieView from 'lottie-react-native';

import styles from './styles';
import animation from '../../assets/animations/loading-utensils.json'

export default function SplashScreen({navigation}) {
    function startApplication() {
        navigation.reset({
            index: 0,
            routes: [{name: 'History'}],
        })
    }
 
    return <View style={styles.container}>
        <LottieView
            testID='splashscreen'
            source={animation}
            autoPlay
            loop={false}
            onAnimationFinish={startApplication}
        />
    </View>;
}
