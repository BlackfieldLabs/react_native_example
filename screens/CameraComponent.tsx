import React, { useRef } from "react";
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
} from "react-native";
//Style
import { COLORS, SPACING, BORDERS, HEIGHT, FONTS, FONT_SIZES } from "../styles/theme";
import sharedStyles from "../styles/sharedStyles";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
// Import Camera library
//import { RNCamera } from "react-native-camera";
//Localization
import { getText } from "../localization/localization";
//Components
import AccentButton from "../components/button/AccentButton";

const CameraComponent = () => {
    //const cameraRef = useRef<RNCamera>(null);

    // Handler for taking a photo
    const handleTakePhoto = async () => {
        /*if (cameraRef.current) {
          const options = { quality: 0.5, base64: true };
          const data = await cameraRef.current.takePictureAsync(options);
          console.log("Photo taken: ", data.uri);
        }*/
    };
    
    return (
        <SafeAreaView style={sharedStyles.safeLayoutContainerStyle}>
            {/* Camera View */}
            <View style={styles.cameraContainer}>
                <View
                    style={styles.cameraView}
                />
                <View style={styles.captureButtonWrapper}>
                    <AccentButton title={getText('takeAPictureTitle')} onAccentButtonPress={handleTakePhoto} />
                </View>
            </View>
            {/* Info Rows */}
            <View style={styles.infoContainer}>
                {/* First Row */}
                <View style={sharedStyles.rowContainer}>
                    <View style={sharedStyles.roleSelectionCardIconBackground}>
                        <MaterialIcons
                            name="qr-code-scanner"
                            size={HEIGHT.image}
                            color={COLORS.textSecondary}
                        />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={sharedStyles.cardTitle}>
                            {getText("scanQRCodeTitle")} {/* Localized title */}
                        </Text>
                        <Text style={sharedStyles.roleSelectionCardSubtitle}>
                            {getText("scanQRCodeSubtitle")} {/* Localized subtitle */}
                        </Text>
                    </View>
                </View>
                {/* Second Row */}
                <View style={sharedStyles.rowContainer}>
                    <View style={sharedStyles.roleSelectionCardIconBackground}>
                        <MaterialIcons
                            name="account-box"
                            size={HEIGHT.image}
                            color={COLORS.textSecondary}
                        />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={sharedStyles.cardTitle}>
                            {getText("takePictureTitle")} {/* Localized title */}
                        </Text>
                        <Text style={sharedStyles.roleSelectionCardSubtitle}>
                            {getText("takePictureSubtitle")} {/* Localized subtitle */}
                        </Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default CameraComponent;

const styles = StyleSheet.create({
    cameraContainer: {
        flex: 3,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.background,
        paddingLeft: SPACING.large,
        paddingRight: SPACING.large,
        paddingTop: SPACING.large,
    },
    cameraView: {
        width: "100%",
        height: "100%",
        borderRadius: BORDERS.radiusMedium,
        backgroundColor: 'red',
    },
    infoContainer: {
        flex: 1,
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
