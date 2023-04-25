import React from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Appbar } from 'react-native-paper';

export default function Header({ title, back = false, config = false }) {
    const navigation = useNavigation<NavigationProp<any>>();
    const goToBack = () => navigation.goBack();
    const goToConfig = () => navigation.navigate('Configuration');

    return (
        <Appbar.Header>
            { back && <Appbar.BackAction onPress={() => {goToBack}} />}
            <Appbar.Content title={title} />
            {config && <Appbar.Action icon="cog" onPress={goToConfig} />}
        </Appbar.Header>
    );
}
