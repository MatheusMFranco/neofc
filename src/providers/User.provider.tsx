import { createContext, useEffect, useState } from 'react';
import * as Localization from 'expo-localization';
import {
    MD3DarkTheme,
    MD3LightTheme,
    Provider as PaperProvider
} from 'react-native-paper';

import english from '../languages/english';
import portuguese from '../languages/portuguese';
import spanish from '../languages/spanish';

export const UserContext = createContext(null);

export function UserProvider ({ children }) {

    const getLanguage = () => {
        const deviceLanguage = Localization?.locale?.split('-')[0];   
        switch(deviceLanguage) {
            case 'es': return spanish;
            case 'pt': return portuguese;
            default: return english;
        }
    }
 
    const [user, setUser] = useState({
        language: getLanguage(),
        dark: false,
        dropdown: false,
        notification: false,
        details: false,
        custom: false,
    });
    const dark = { ...MD3DarkTheme};
    const light = { ...MD3LightTheme};
    const themePaper = user.dark ? dark : light;

    return <PaperProvider theme={themePaper} >
            <UserContext.Provider value={{user, setUser}}>{children}</UserContext.Provider>
        </PaperProvider>;
}
