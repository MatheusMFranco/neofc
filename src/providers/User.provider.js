import { createContext, useState } from 'react';
import { MD3DarkTheme, MD3LightTheme, Provider as PaperProvider } from 'react-native-paper';

import english from '../languages/english';

export const UserContext = createContext({});

export function UserProvider ({children}) {
    const [user, setUser] = useState({
        language: english,
        dark: false,
        dropdown: false,
        notification: false,
        details: false,
        custom: false,
    });
    const dark = { ...MD3DarkTheme};
    const light = { ...MD3LightTheme};
    const themePaper = user.dark ? dark : light;

    return <PaperProvider theme={themePaper}>
            <UserContext.Provider value={{user, setUser}}>{children}</UserContext.Provider>
        </PaperProvider>;
}
