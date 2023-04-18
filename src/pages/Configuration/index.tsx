import React, { useContext } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { IconButton, List, Switch, useTheme } from 'react-native-paper';

import styles from './styles';
import Header from '../../components/header';
import { UserContext } from '../../providers/User.provider';

export default function Configuration({navigation}) {
    const { user, setUser } = useContext(UserContext);
    const { colors } = useTheme();
    const style = styles(colors);

    const onToggleMode = () => setUser({...user, dropdown: !user?.dropdown });
    const onToggleCustom = () => setUser({...user, custom: !user?.custom });
    const onToggleDetails = () => setUser({...user, details: !user?.details });
    const onToggleNotification = () => setUser({...user, notification: !user?.notification });
    const onToggleTheme = () => setUser({...user, dark: !user?.dark });
    const goToLanguagePage = () => navigation.navigate('Language');


    return <SafeAreaView style={style.view} testID='view'>
            <StatusBar />
            <Header
                title={user?.language?.page?.configuration.title}
                {...navigation}
                back
            />
            <List.Section style={style.container} testID='list'>
                <List.Item 
                    onPress={goToLanguagePage}
                    style={style.section}
                    titleStyle={style.item}
                    title={user?.language?.page?.configuration?.language}
                    testID='language'
                    right={
                        () => <IconButton
                            icon="chevron-right"
                            iconColor={colors.onPrimary}
                        />
                    }
                />
                <List.Item
                    titleStyle={style.item}
                    style={style.section}
                    title={user?.language?.page?.configuration?.theme}
                    right={
                        () => <Switch
                            testID='theme'
                            value={user?.dark}
                            onValueChange={onToggleTheme}
                        />
                    }
                />
                <List.Item
                    titleStyle={style.item}
                    style={style.section}
                    title={user?.language?.page?.configuration?.details}
                    right={
                        () => <Switch
                            testID='details'
                            value={user?.details}
                            onValueChange={onToggleDetails}
                        />
                    }
                />
                <List.Item
                    titleStyle={style.item}
                    style={style.section}
                    title={user?.language?.page?.configuration?.notification}
                    right={
                        () => <Switch
                            testID='notification'
                            value={user?.notification}
                            onValueChange={onToggleNotification}
                        />
                    }
                />
                <List.Item
                    titleStyle={style.item}
                    style={style.section}
                    title={user?.language?.page?.configuration?.mode}
                    right={
                        () => <Switch
                            testID='dropdown'
                            value={user?.dropdown}
                            onValueChange={onToggleMode}
                        />
                    }
                />
                <List.Item
                    titleStyle={style.item}
                    style={style.section}
                    title={user?.language?.page?.configuration?.custom}
                    right={
                        () => <Switch
                            testID='custom'
                            color={colors?.primary}
                            value={user?.custom}
                            onValueChange={onToggleCustom}
                        />
                    }
                />
            </List.Section>
        </SafeAreaView>;
}
