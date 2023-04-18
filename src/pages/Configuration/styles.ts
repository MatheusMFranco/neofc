import { StyleSheet } from 'react-native';

export default (color) => StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: color.onSecondary,
    },
    container: {
        backgroundColor: color.onSecondary,
    },
    section: {
        borderBottomWidth: .5,
        borderBottomColor: color.onPrimaryContainer,
    },
    item: {
        fontSize: 16,
        color: color.onPrimaryContainer,
    },
});
