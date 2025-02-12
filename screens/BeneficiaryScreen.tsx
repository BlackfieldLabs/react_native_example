import React, { useState } from "react";
import { StyleSheet, SafeAreaView, ScrollView, View, Text, TouchableOpacity, Image } from "react-native";
//Navigation
import { useNavigation, useRoute } from "@react-navigation/native";
import { NavigationProp, RoutePropType } from '../helpers/RootStackParamList';
//Localization
import { I18nextProvider, useTranslation } from "react-i18next";
import i18n from "../localization/i18n";
//Style
import { BORDERS, COLORS, HEIGHT, SPACING } from '../styles/theme';
import sharedStyles from '../styles/sharedStyles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
//Components
import AccentButton from "../components/button/AccentButton";
import TextInputBox from "../components/textbox/TextInputBox";
import { CameraMode } from "./CameraComponent";
//BLE
import { Device as BleDevice } from 'react-native-ble-plx';

type BeneficiaryScreenRouteProp = RoutePropType<'Beneficiary'>;

const BeneficiaryScreen = () => {
    const { t } = useTranslation();
    const [capturedPhotoUri, setCapturedPhotoUri] = useState<string | null>(null);

    const route = useRoute<BeneficiaryScreenRouteProp>();
    const { scannedDevices } = route.params;
    const navigation = useNavigation<NavigationProp>();

    const [nameValue, setNameValue] = React.useState<string>("");
    const [emailValue, setEmailValue] = React.useState<string>("");
    const [peopleCount, setPeopleCount] = React.useState<string>("");
    const [genderValue, setGenderValue] = React.useState<string>("");
    const [pronounsValue, setPronounsValue] = React.useState<string>("");
    const [yearValue, setYearValue] = React.useState<string>("");
    const [petsCount, setPetsCount] = React.useState<string>("");

    const takeAnotherPhotoPressed = () => {
        navigation.navigate("Camera", {
            mode: CameraMode.PHOTO,
            onPhotoTaken: (uri) => setCapturedPhotoUri(uri),
        });
    }

    return (
        <SafeAreaView style={sharedStyles.safeLayoutContainerStyle}>
            <ScrollView contentContainerStyle={sharedStyles.scrollContainer}>
                <Text style={[styles.spacings, sharedStyles.titleStyle]}>{t('titleBeneficiary')}</Text>
                <TextInputBox
                    placeholder={t('beneficiaryNamePlaceholder')}
                    value={nameValue}
                    onChangeText={(text: string) => setNameValue(text)}
                />
                <TextInputBox
                    placeholder={t('beneficiaryEmailPlaceholder')}
                    value={emailValue}
                    onChangeText={(text: string) => setEmailValue(text)}
                />
                <TextInputBox
                    placeholder={t('numberOfPeoplePlaceholder')}
                    value={peopleCount}
                    onChangeText={(text: string) => setPeopleCount(text)}
                />
                <View style={styles.row}>
                    <TextInputBox
                        placeholder={t('genderPlaceholder')}
                        value={genderValue}
                        onChangeText={(text) => setGenderValue(text)}
                    />
                    <View style={{ width: 10 }}></View>
                    <TextInputBox
                        placeholder={t('pronounsPlaceholder')}
                        value={pronounsValue}
                        onChangeText={(text) => setPronounsValue(text)}
                    />
                </View>
                <View style={styles.row}>
                    <TextInputBox
                        placeholder={t('yearBornPlaceholder')}
                        value={yearValue}
                        onChangeText={(text) => setYearValue(text)}
                    />
                    <View style={{ width: 10 }}></View>
                    <TextInputBox
                        placeholder={t('petsPlaceholder')}
                        value={petsCount}
                        onChangeText={(text) => setPetsCount(text)}
                    />
                </View>
                <Text style={[styles.spacings, sharedStyles.titleStyle]}>{t('titleChangeBeneficiaryPhoto')}</Text>
                <TouchableOpacity
                    onPress={() => takeAnotherPhotoPressed()}
                    activeOpacity={0.7} // Adjust opacity effect on click
                >
                    <View style={[sharedStyles.sectionMiddle, styles.center, styles.cornerRadiusLarge]}>
                        {/* Show the Captured Photo if Available */}
                        {capturedPhotoUri && (
                            <View style={styles.photoContainer}>
                                <Image source={{ uri: capturedPhotoUri }} style={styles.capturedImage} />
                            </View>
                        )}
                        {!capturedPhotoUri && (
                            <MaterialIcons name="add-photo-alternate" size={HEIGHT.image} color={COLORS.textSecondary} />
                        )}
                        <Text style={[sharedStyles.cardTitle]}>{t('takePhotoTitle')}</Text>
                        <Text style={[sharedStyles.subtitleStyle, styles.secondaryTextColor]}>{t('takePhotoSubtitle')}</Text>
                    </View>
                </TouchableOpacity>
                <Text style={[styles.spacings, sharedStyles.titleStyle]}>{t('titleListOfDevicesInDeployment')}</Text>
                <View>
                    {scannedDevices.map((device, index) => (
                        <View key={index} style={[styles.button]}>
                            <Text style={sharedStyles.buttonTextPrimary}>{device.name}</Text>
                        </View>
                    ))}
                </View>
                <AccentButton
                    title={t('sendButtonTitle')}
                    onAccentButtonPress={() => {
                        //Do something
                    }}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    spacings: {
        marginTop: SPACING.medium,
        marginLeft: SPACING.medium,
        paddingBottom: SPACING.medium,
    },
    row: {
        width: '49%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    secondaryTextColor: {
        color: COLORS.textSecondary,
    },
    cornerRadiusLarge: {
        borderRadius: BORDERS.radiusLarge,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: SPACING.small,
        borderRadius: BORDERS.radiusLarge,
        height: HEIGHT.button,
        backgroundColor: COLORS.border,
    },
    photoContainer: {
        alignItems: 'center',
        marginTop: SPACING.medium,
    },
    capturedImage: {
        width: 150,
        height: 150,
        borderRadius: 10,
        marginTop: 10,
    },
    photoText: {
        marginTop: 5,
        color: COLORS.textPrimary,
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export default BeneficiaryScreen;