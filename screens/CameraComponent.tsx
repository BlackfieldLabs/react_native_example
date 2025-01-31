import React, { useRef, useEffect, useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    PermissionsAndroid,
    Platform,
} from "react-native";
//Style
import { COLORS, SPACING, HEIGHT } from "../styles/theme";
import sharedStyles from "../styles/sharedStyles";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
//Camera
import { RNCamera } from "react-native-camera";
//Localization
import { getText } from "../localization/localization";
//Components
import AccentButton from "../components/button/AccentButton";
import { useAlert } from '../components/alert/CustomAlertManager';
import { AlertType } from '../components/alert/AlertTypes'
import { RouteProp } from "@react-navigation/native";
//Helpers
import { RootStackParamList } from '../helpers/RootStackParamList';
//Navigation
import { useNavigation, useRoute } from "@react-navigation/native";
import { NavigationProp, RoutePropType } from '../helpers/RootStackParamList';

export enum CameraMode {
    PHOTO = "photo",
    QR = "qr",
}

type CameraScreenRouteProp = RouteProp<RootStackParamList, "Camera">;

interface CameraComponentProps {
    route: CameraScreenRouteProp;
}

const CameraComponent: React.FC<CameraComponentProps> = ({ route }) => {
    const { mode } = route.params;
    const cameraRef = useRef<RNCamera>(null);
    const { showAlert, createSingleButtonAlert, hideAlert } = useAlert();
    const [qrResult, setQrResult] = useState<string | null>(null);
    const [photoUri, setPhotoUri] = useState<string | null>(null);

    const navigation = useNavigation<NavigationProp>();

    const onPhotoTaken = route.params?.onPhotoTaken;

    const requestCameraPermission = async () => {
        if (Platform.OS === "android") {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: getText('cameraPermissionTitle'),
                    message: getText('cameraPermissionMessage'),
                    buttonPositive: getText('okButtonTitle'),
                }
            );
            if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                createSingleButtonAlert(AlertType.Warning, getText('cameraPermissionDeniedMessage'), () => {
                    console.log(`[${new Date().toLocaleString()}] CameraComponent - Permission denied!`);
                });
            }
        }
    };

    const handleTakenPhoto = async () => {
        if (cameraRef.current) {
            const options = { quality: 0.8, base64: false };
            const data = await cameraRef.current.takePictureAsync(options);
            setPhotoUri(data.uri);
            console.log(`[${new Date().toLocaleString()}] CameraComponent - Photo taken: `, data.uri);
            createSingleButtonAlert(AlertType.Warning, data.uri ? data.uri.toString() : "", () => {
                console.log(`[${new Date().toLocaleString()}] CameraComponent - createSingleButtonAlert.`);
            });
            // Pass the URI back to the previous screen
            if (onPhotoTaken) {
                onPhotoTaken(data.uri);
            }

            // Close the camera screen and return to the previous one
            navigation.goBack();
        }
    };

    const handleBarCodeRead = ({ data }: { data: string }) => {
        setQrResult(data);
        console.log(`[${new Date().toLocaleString()}] CameraComponent - QR Code Scanned: `, data);
        createSingleButtonAlert(AlertType.Warning, qrResult ? qrResult.toString() : "", () => {
            console.log(`[${new Date().toLocaleString()}] CameraComponent - createSingleButtonAlert.`);
        });
    };

    useEffect(() => {
        console.log(`[${new Date().toLocaleString()}] CameraComponent - Use effect.`);
        requestCameraPermission();
    }, []);

    return (
        <SafeAreaView style={sharedStyles.safeLayoutContainerStyle}>
            <View style={styles.cameraContainer}>
                <RNCamera
                    ref={cameraRef}
                    style={styles.cameraView}
                    type={mode === CameraMode.QR ? RNCamera.Constants.Type.back : RNCamera.Constants.Type.front }
                    captureAudio={false}
                    onBarCodeRead={mode === CameraMode.QR ? handleBarCodeRead : undefined}
                    barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
                />
                {mode === CameraMode.PHOTO && (
                    <View style={styles.captureButtonWrapper}>
                        <AccentButton
                            title={getText("takeAPictureTitle")}
                            onAccentButtonPress={handleTakenPhoto}
                        />
                    </View>
                )}
            </View>
            <View style={sharedStyles.rowContainer}>
                <View style={sharedStyles.roleSelectionCardIconBackground}>
                    <MaterialIcons
                        name={mode === CameraMode.QR ? "qr-code-scanner" : "account-box"}
                        size={HEIGHT.image}
                        color={COLORS.textSecondary}
                    />
                </View>
                <View style={styles.textContainer}>
                    <Text style={sharedStyles.cardTitle}>
                        {mode === CameraMode.QR ? getText("scanQRCodeTitle") : getText("takePictureTitle")}
                    </Text>
                    <Text style={sharedStyles.roleSelectionCardSubtitle}>
                        {mode === CameraMode.QR ? getText("scanQRCodeSubtitle") : getText("takePictureSubtitle")}
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default CameraComponent;

const styles = StyleSheet.create({
    cameraContainer: {
        flex: 7,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.background,
    },
    cameraView: {
        width: "100%",
        height: "100%",
    },
    textContainer: {
        flex: 1,
    },
    captureButtonWrapper: {
        width: "90%",
        position: 'absolute',
        bottom: SPACING.small,
        alignSelf: 'center',
    },
});
