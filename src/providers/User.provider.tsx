import React, {
  createContext,
  useState,
  useMemo,
  useEffect
} from 'react';
import {
  MD3DarkTheme,
  MD3LightTheme,
  Provider as PaperProvider
} from 'react-native-paper';
import * as Localization from 'expo-localization';

import english from '../languages/english';
import portuguese from '../languages/portuguese';
import spanish from '../languages/spanish';

import { User } from '../models/User';
import UserRepository from '../databases/User.repository';

export const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState<User | null>(null);
  const repository = new UserRepository();

  const themePaper = useMemo(() => (
    user?.dark
    ? { ...MD3DarkTheme }
    : { ...MD3LightTheme }), [user]
  );

  const getLanguage = () => {
    const deviceLanguage = Localization.locale.split('-')[0];
    switch (deviceLanguage) {
      case 'es':
        return spanish;
      case 'pt':
        return portuguese;
      default:
        return english;
    }
  };

  const initialUser = {
    id: '0',
    dark: false,
    dropdown: false,
    notification: false,
    details: false,
    custom: false,
    desktop: false,
    brain: false,
  };

  const parse = (currentUser: User): User => {
    return {
      id: currentUser.id,
      dark: !!+currentUser.dark,
      dropdown: !!+currentUser.dropdown,
      notification: !!+currentUser.notification,
      details: !!+currentUser.details,
      custom: !!+currentUser.custom,
      desktop: !!+currentUser.desktop,
      brain: !!+currentUser.brain,
      language: JSON.parse(currentUser.language),
    }
  };

  useEffect(() => {
    repository.select(0).then(rows => {
      if(rows.length) {
        const currentUser = rows[0];
        setUser(parse(currentUser));
      } else {
        repository.insert({...initialUser, language: JSON.stringify(getLanguage())});
        setUser({...initialUser, language: getLanguage()});
      }
    });
  }, []);

  useEffect(() => {
    if (user?.id) {
      repository.update({...user, language: JSON.stringify(user.language)});
      if (typeof user.language === 'object') {
        setUser(user);
      }
    }
  }, [user]);

  return (
    <PaperProvider theme={themePaper}>
      <UserContext.Provider value={{ user, setUser }}>
        {children}
      </UserContext.Provider>
    </PaperProvider>
  );
}
