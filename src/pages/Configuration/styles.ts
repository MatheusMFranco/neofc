import { StyleSheet } from 'react-native';
import { MD3Colors } from 'react-native-paper/lib/typescript/src/types';

export default (color: MD3Colors) => StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: color.onSecondary,
    },
    container: {
        backgroundColor: color.onSecondary,
    },
    section: {
        fontSize: 16,
        borderBottomWidth: .5,
        borderBottomColor: color.onPrimaryContainer,
    },
    item: {
        color: color.onPrimaryContainer,
    },
});
