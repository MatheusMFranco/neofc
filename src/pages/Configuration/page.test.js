import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';

import { UserContext } from '../../providers/User.provider';
import Configuration from '.';


describe('Configuration', () => {
    const navigation = {navigate: jest.fn()};
    const mockedNavigation = jest.fn();
    const setUser = jest.fn();
    const user = {
        language: {
        page: {
            configuration: {
            title: 'Configuration',
            language: 'Language',
            theme: 'Theme',
            details: 'Details',
            notification: 'Notification',
            mode: 'Mode',
            custom: 'Custom',
            },
        },
        },
        dropdown: false,
        custom: false,
        details: false,
        notification: false,
        dark: false,
    };

    jest.mock('@react-navigation/native', () => {
        return {
            useNavigation: () => ({
                navigate: mockedNavigation,
            }),
        };
    });

    it('should render correctly', () => {
        const { getByTestId } = render(
            <NavigationContainer>
                <UserContext.Provider value={{ user, setUser }}>
                    <Configuration navigation={navigation} />
                </UserContext.Provider>
            </NavigationContainer>
        );
        expect(getByTestId('view')).toBeTruthy();
        expect(getByTestId('list')).toBeTruthy();
    });

    it('should toggle language screen on press', () => {
        const { getByTestId } = render(
            <NavigationContainer>
                <UserContext.Provider value={{ user, setUser }}>
                    <Configuration navigation={navigation} />
                </UserContext.Provider>
            </NavigationContainer>
        );
        const languageItem = getByTestId('language');
        fireEvent.press(languageItem);
        expect(mockedNavigation).not.toHaveBeenCalled();
    });
});
