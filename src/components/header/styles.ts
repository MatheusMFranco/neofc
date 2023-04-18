import { StyleSheet } from 'react-native';

export default (color) => StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: color.onSecondary,
    },
    title: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
        padding: 24,
        color: color.onPrimaryContainer,
    },
});
