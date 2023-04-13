import React, { useContext } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { useTheme } from 'react-native-paper';

import Header from '../../components/header';
import { UserContext } from '../../providers/User.provider';

export default function Configuration() {
    const theme = useTheme();
    const { user } = useContext(UserContext);
    const language = user?.language;

    return <SafeAreaView>
            <StatusBar />
            <Header title={language?.title?.configuration} back />
        </SafeAreaView>;
}
