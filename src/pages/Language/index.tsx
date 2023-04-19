import React, { useContext, useState } from 'react';
import { View } from 'react-native';
import { RadioButton, useTheme } from 'react-native-paper';

import english from '../../languages/english';
import portuguese from '../../languages/portuguese';
import spanish from '../../languages/spanish';

import styles from './styles';
import pageStyles from '../pageStyles';

import Header from '../../components/header';

import { UserContext } from '../../providers/User.provider';
import { LanguageEnum } from './language.enum';


export default function Language({ navigation }) {

    const { user, setUser } = useContext(UserContext); 
    const [checked, setChecked] = useState(user?.language?.selected);

    const { colors } = useTheme();
    const pageSheet = pageStyles(colors);

    const setLanguage = (selectedLanguage: string) => {
        let language = user.language;
        switch(selectedLanguage) {
            case LanguageEnum.SPANISH: {
                language = spanish;
                break;
            }
            case LanguageEnum.PORTUGUESE: {
                language = portuguese;
                break;
            }
            default: language = english;
        }
        setUser({...user, language});
        setChecked(selectedLanguage);
    }

    return <View style={pageSheet.view}>
                <Header
                    title={user?.language?.page?.configuration?.language}
                    {...navigation}
                    back
                />
                <RadioButton.Group
                    onValueChange={language => setLanguage(language)} value={checked}>
                    {
                        Object
                            .values(LanguageEnum)
                            .map((language: string, index: number) => <RadioButton.Item
                                    style={[pageSheet.section, styles.item] }
                                    testID={`radioButton${index}`}
                                    key={language}
                                    label={language}
                                    value={language} />)
                    }
                </RadioButton.Group>
        </View>;
}
