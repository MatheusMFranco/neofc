import { createContext, useState } from 'react';

import mode from '../enums/Mode.enum';
import theme from '../enums/Theme.enum';
import english from '../languages/english';

export const UserContext = createContext({});

export function UserProvider ({children}) {
    const [user, setUser] = useState({
        language: english,
        theme: theme.LIGHT,
        notification: false,
        mode: mode.NORMAL,
        details: false,
        custom: false,
    });

    return <UserContext.Provider value={{user, setUser}}>{children}</UserContext.Provider>;
}
