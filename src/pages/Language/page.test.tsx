import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';

import { UserContext } from '../../providers/User.provider';
import Language from '../Language';

import english from '../../languages/english';
import spanish from '../../languages/spanish';
import portuguese from '../../languages/portuguese';

const mockedSetUser = jest.fn();
const navigation = jest.fn();

jest.mock('../../components/header', () => 'Header');

describe('Language screen', () => {
    it('should render the component', () => {
        const { getByText } = render(
            <NavigationContainer>
                <UserContext.Provider value={{ user: { language: { selected: 'English' } } }}>
                    <Language navigation={navigation} />
                </UserContext.Provider>
            </NavigationContainer>
        );
        const pageTitle = getByText('English');
        expect(pageTitle).toBeDefined();
    });

    it('should set the selected language to Spanish', () => {
        const { getByTestId } = render(
            <NavigationContainer>
                <UserContext.Provider value={{ setUser: mockedSetUser, user: { language: spanish } }}>
                    <Language navigation={navigation} />
                </UserContext.Provider>
            </NavigationContainer>
        );
        const spanishRadioButton = getByTestId('radioButton1');
        fireEvent.press(spanishRadioButton);
        expect(mockedSetUser).toHaveBeenCalledWith(expect.objectContaining({ language: spanish}));
    });

    it('should set the selected language to Portuguese', () => {
        const { getByTestId } = render(
            <NavigationContainer>
                <UserContext.Provider value={{ setUser: mockedSetUser, user: { language: portuguese } }}>
                    <Language navigation={navigation} />
                </UserContext.Provider>
            </NavigationContainer>
        );
        const spanishRadioButton = getByTestId('radioButton2');
        fireEvent.press(spanishRadioButton);
        expect(mockedSetUser).toHaveBeenCalledWith(expect.objectContaining({ language: portuguese}));
    });

    it('should set the selected language to English', () => {
        const { getByTestId } = render(
            <NavigationContainer>
                <UserContext.Provider value={{ setUser: mockedSetUser, user: { language: english } }}>
                    <Language navigation={navigation} />
                </UserContext.Provider>
            </NavigationContainer>
        );
        const spanishRadioButton = getByTestId('radioButton0');
        fireEvent.press(spanishRadioButton);
        expect(mockedSetUser).toHaveBeenCalledWith(expect.objectContaining({ language: english}));
    });
});
