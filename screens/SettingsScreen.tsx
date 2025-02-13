import React, { useState, useEffect, startTransition  } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    ScrollView,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
//Localization
import { useTranslation } from "react-i18next";
//Styles
import { COLORS, FONT_SIZES, FONTS, SPACING, HEIGHT, BORDERS } from '../styles/theme';
import sharedStyles from '../styles/sharedStyles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
//ActionSheet
import CustomActionSheet from '../components/actionSheet/CustomActionSheet';
//Storage
import SecureStorage from '../helpers/SecureStorage';

enum Languages {
    EN = "EN",
    SR = "SR",
    HR = "HR"
}

enum SettingsOptions {
    LANGUAGE,
    //Add new options for settings here
}

const SettingsScreen = () => {
    const { t, i18n } = useTranslation();
    // Language state
    const [selectedLanguageMapping, setSelectedLanguageMapping] = useState<string>();
    // Sheet state
    const [isSheetVisible, setSheetVisible] = useState<boolean>(false);
    const [sheetOptions, setSheetOptions] = useState<{ title: string; iconName?: string; iconColor?: string }[]>([]);
    const [sheetTitle, setSheetTitle] = useState('');

    // Fixed function for changing language
    const changeLanguage = async (index: number) => {
        const enumValues = Object.values(Languages) as string[];
        const selectedLang = enumValues[index] as Languages;

        console.log(`[${new Date().toLocaleString()}] SettingsOptions: Changing language to:`, selectedLang);

        if (selectedLang) {
            await SecureStorage.saveData(SecureStorage.Keys.AppLanguage, selectedLang.toLowerCase());
            i18n.changeLanguage(selectedLang.toLowerCase());
            setSelectedLanguageMapping(getMappingForLanguage(selectedLang));
            setSheetVisible(false);

            console.log(`[${new Date().toLocaleString()}] SettingsOptions: Updated language:`, selectedLang);
        } else {
            console.warn(`[${new Date().toLocaleString()}] SettingsOptions: Invalid index for Languages enum:`, index);
        }
    };

    // Fixed function for mapping language to translation key
    const getMappingForLanguage = (language: Languages): string => {
        console.log(`[${new Date().toLocaleString()}] SettingsOptions: getMappingForLanguage:`, language);
        switch (language.toUpperCase()) {
            case Languages.SR:
                console.log(`[${new Date().toLocaleString()}] SettingsOptions: Setting language to Serbian`);
                return t('serbianTitle');
            case Languages.HR:
                console.log(`[${new Date().toLocaleString()}] SettingsOptions: Setting language to Croatian`);
                return t('croatianTitle');
            default:
                console.log(`[${new Date().toLocaleString()}] SettingsOptions: Setting language to English`);
                return t('englishTitle');
        }
    };

    // Open ActionSheet for language selection
    const openActionSheet = (settingsOption: SettingsOptions) => {
        if (settingsOption === SettingsOptions.LANGUAGE) {
            setSheetTitle(t('changeLanguageTitle'));
            const sheetOptions = [
                { title: t('englishTitle'), iconName: "language", iconColor: COLORS.accent },
                { title: t('serbianTitle'), iconName: "language", iconColor: COLORS.accent },
                { title: t('croatianTitle'), iconName: "language", iconColor: COLORS.accent },
            ];
            setSheetOptions(sheetOptions);
        } else {
            console.warn(`[${new Date().toLocaleString()}] SettingsOptions: Missing Sheet title for option.`);
        }
        setSheetVisible(true);
    };

    useEffect(() => {
        const loadLanguage = async () => {
            const storedLanguage = await SecureStorage.getData(SecureStorage.Keys.AppLanguage);
            if (storedLanguage) {
                const mappedLanguage = getMappingForLanguage(storedLanguage as Languages);
                setSelectedLanguageMapping(mappedLanguage);
                i18n.changeLanguage(storedLanguage);
            }
            console.log(`[${new Date().toLocaleString()}] SettingsOptions: Stored language is:`, storedLanguage, `; Mapped language is:`, selectedLanguageMapping);
        };
        loadLanguage();
    }, [i18n]);

    return (
        <SafeAreaView style={sharedStyles.safeLayoutContainerStyle}>
            <ScrollView style={sharedStyles.scrollContainer}>
                <View style={[sharedStyles.rowContainer, sharedStyles.bottomBorder]}>
                    <Text style={sharedStyles.sectionTitle}>{t('changeLanguageTitle')}</Text>
                    <TouchableOpacity
                        style={[styles.infoButton, sharedStyles.rowContainer]}
                        onPress={() => openActionSheet(SettingsOptions.LANGUAGE)}>
                        <Text style={[sharedStyles.sectionTitle, sharedStyles.alternativeTextColorStyle]}>{selectedLanguageMapping}</Text>
                        <MaterialIcons
                            name="arrow-right"
                            style={sharedStyles.icon}
                            size={HEIGHT.image} />
                    </TouchableOpacity>
                </View>
                <CustomActionSheet
                    isVisible={isSheetVisible}
                    sheetTitle={sheetTitle}
                    options={sheetOptions}
                    onSelect={changeLanguage}
                    onClose={() => setSheetVisible(false)}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    buttonStyle: {
        backgroundColor: COLORS.primary,
        height: HEIGHT.button,
    },
    infoButton: {
        alignItems: 'center',
        justifyContent: 'center',
        height: HEIGHT.button,
        maxWidth: '50%',
    },
});

export default SettingsScreen;
