import React from 'react';
import { View } from 'react-native';
import { IconButton, Text, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';

export default function Header({ title, back, config }) {
    const { colors } = useTheme();
    const navigation = useNavigation();
    const style = styles(colors);

    const goToBack = () => navigation.goBack();
    const goToConfig = () => navigation.navigate('Configuration')

    return <View style={style.container}>
        <View style={style.container}>
            { back && <IconButton
                    testID='back-button'
                    style={style.button}
                    icon="chevron-left"
                    size={50}
                    onPress={goToBack}
            />}
            <Text style={style.title} testID='title'>{title}</Text>
        </View>
        {config && <IconButton
                testID='config-button'
                style={style.button}
                icon="cog"
                size={50}
                onPress={goToConfig}
        />}
    </View>
}