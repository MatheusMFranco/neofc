import React from 'react';
import { render } from 'react-native-testing-library';
import Header from '.';
import { fireEvent } from '@testing-library/react-native';

const mockedNavigation = jest.fn();
const mockedGoBack = jest.fn();

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({
    navigate: mockedNavigation,
      goBack: mockedGoBack,
    }),
  };
});

describe('Header', () => {
    beforeEach(() => {
        mockedNavigation.mockClear();
    });

    it('should render title', () => {
        const { getByText } = render(<Header title="Home" />);
        expect(getByText('Home')).toBeDefined();
    });

    it('should render back button component', () => {
        const { getByTestId } = render(<Header title="Home" back />);
        expect(getByTestId('back-button')).toBeDefined();
    });

    it('should call goBack function', () => {
        const { getByTestId } = render(<Header title="Home" back />);
        const button = getByTestId('back-button');
        fireEvent.press(button);
        expect(mockedGoBack).toHaveBeenCalledTimes(1);
    });

    it('should render config button', () => {
        const { getByTestId } = render(<Header title="Home" config />);
        expect(getByTestId('config-button')).toBeDefined();
    });

    it('should call config function', () => {
        const { getByTestId } = render(<Header title="Home" config />);
        const button = getByTestId('config-button');
        fireEvent.press(button);
        expect(mockedNavigation).toHaveBeenCalledTimes(1);
    });

    it('should render without buttons', () => {
        const { queryByTestId } = render(<Header title="Home" />);
        const backButton = queryByTestId('back-button');
        const configButton = queryByTestId('config-button');
        expect(backButton).toBeNull();
        expect(configButton).toBeNull();
    });

    test('should match the snapshot', () => {
        const tree = render(<Header title="Test Header" />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
