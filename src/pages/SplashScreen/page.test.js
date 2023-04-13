import { render } from '@testing-library/react-native';
import SplashScreen from '.';

describe('SplashScreen', () => {
    const navigation = {reset: jest.fn()};
    const splashscreen = render(<SplashScreen navigation={navigation} />);

    it('should render animation', () => {
        expect(splashscreen.getByTestId('splashscreen')).toBeDefined();
        expect(splashscreen.toJSON()).toMatchSnapshot();
    });

    it('should match snapshot without animation', () => {
        expect(splashscreen.toJSON()).toMatchSnapshot();
    });

});