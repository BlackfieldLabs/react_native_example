import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { getText } from '../localization/localization';
//Style
import { BORDERS, COLORS, FONT_SIZES, FONTS, HEIGHT, SPACING } from '../styles/theme';
import sharedStyles from '../styles/sharedStyles';

const InstallationScreen = () => {
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  const handleRowPress = (index: number) => {
    setSelectedRow(index === selectedRow ? null : index);
  };

  const handlePress = (title: string) => {
    console.log(`${title} button pressed`);
  };

  return (
    <SafeAreaView style={sharedStyles.safeLayoutContainerStyle}>
      <ScrollView contentContainerStyle={sharedStyles.scrollContainer}>
        {/* Section 1 */}
        <View style={[sharedStyles.sectionTop, styles.row]}>
          {[getText('scanButton'), getText('clearButton'), getText('cameraButton')].map((title) => (
            <TouchableOpacity
              key={title}
              style={[styles.button, styles.secondaryButton, styles.halfWidthButton]}
              onPress={() => handlePress(title)}
            >
              <MaterialIcons name={(title === getText('cameraButton') ? 'camera-alt' : title === getText('clearButton') ? 'delete' : 'touch-app')} size={HEIGHT.smallImage} color="white" style={styles.icon} />
              <Text style={styles.buttonTextPrimary}>{title}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {/* Section 2 */}
        <View style={sharedStyles.sectionMiddle}>
          <View style={styles.listHeader}>
            <Text style={[styles.statusText, styles.columnTitle ]}>{getText('deployColumn')}</Text>
            <Text style={[styles.statusText, styles.columnTitle ]}>{getText('rssiColumn')}</Text>
            <Text style={[styles.columnBig]}></Text>
          </View>
          {[1, 2, 3, 4, 5, 6].map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.listRowContainer,
                selectedRow === index && { borderColor: COLORS.selection },
              ]}
              onPress={() => handleRowPress(index)}
            >
              <View style={[styles.listItem, styles.columnSmall]}>
                <MaterialIcons
                  name={selectedRow === index ? "check-box" : "check-box-outline-blank"}
                  size={HEIGHT.smallImage}
                  color={selectedRow === index ? COLORS.accent : COLORS.textSecondary}
                />
              </View>
              <Text style={[styles.listItem, styles.columnSmall]}>-12{index + 1}</Text>
              <Text style={[styles.listItem, styles.columnBig]}>192.168.1.{index + 1}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {/* Section 3 */}
        <View style={[sharedStyles.sectionMiddle, styles.row]}>
          {[getText('connectButton'), getText('reportWiFisButton')].map((title) => (
            <TouchableOpacity
              key={title}
              style={[styles.button, styles.secondaryButton, styles.halfWidthButton]}
              onPress={() => handlePress(title)}
            >
              <MaterialIcons name={(title === getText('connectButton') ? 'home' : 'edit')} size={HEIGHT.smallImage} color="white" style={styles.icon} />
              <Text style={styles.buttonTextPrimary}>{title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Section 4 */}
        <View style={sharedStyles.sectionMiddle}>
          <View style={styles.row}>
            {[getText('connectButton'), getText('reportWiFisButton')].map((title) => (
              <TouchableOpacity
                key={title}
                style={[styles.button, styles.secondaryButton, styles.halfWidthButton]}
                onPress={() => handlePress(title)}
              >
                <MaterialIcons name="wifi" size={HEIGHT.smallImage} color="white" style={styles.icon} />
                <Text style={styles.buttonTextPrimary}>{title}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.row}>
            <TouchableOpacity
              style={[styles.dropDownList, styles.halfWidthButton]}
              onPress={() => handlePress(getText('selectNetworkButton'))}
            >
              <Text style={styles.dropDownText}>{getText('selectNetworkButton')}</Text>
              <MaterialIcons name="arrow-drop-down" size={HEIGHT.smallImage} color={COLORS.textPrimary} style={styles.icon} />
            </TouchableOpacity>
            <TextInput
              placeholder={getText('enterWiFiPassPlaceholder')}
              style={[styles.textBox, styles.halfWidthButton]}
            />
          </View>
          <View style={styles.row}>
            {[getText('credentialsButton'), getText('colorButton')].map((title) => (
              <TouchableOpacity
                key={title}
                style={[[styles.button, styles.secondaryButton, styles.halfWidthButton]]}
                onPress={() => handlePress(title)}
              >
                <MaterialIcons name="lock" size={HEIGHT.smallImage} color="white" style={styles.icon} />
                <Text style={styles.buttonTextPrimary}>{title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Section 5 */}
        <View style={[sharedStyles.sectionMiddle, styles.row]}>
          <TouchableOpacity
            style={[styles.button, styles.secondaryButton, styles.halfWidthButton]}
            onPress={() => handlePress(getText('connectionButton'))}
          >
            <MaterialIcons name="link" size={HEIGHT.smallImage} color="white" style={styles.icon} />
            <Text style={styles.buttonTextPrimary}>{getText('connectionButton')}</Text>
          </TouchableOpacity>
          <View style={styles.statusContainer}>
            <Text style={styles.statusText}>{getText('statusText')}</Text>
            <Text style={styles.statusNumber}>313546534321</Text>
          </View>
        </View>

        {/* Section 6  */}
        <View style={[sharedStyles.sectionBottom, styles.row]}>
          <TouchableOpacity
            style={[styles.button, styles.secondaryButton, styles.halfWidthButton]}
            onPress={() => handlePress(getText('goToChartsButton'))}
          >
            <MaterialIcons name="bar-chart" size={HEIGHT.smallImage} color="white" style={styles.icon} />
            <Text style={styles.buttonTextPrimary}>{getText('goToChartsButton')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.accentButton, styles.halfWidthButton]}
            onPress={() => handlePress(getText('nextButton'))}
          >
            <MaterialIcons name="arrow-forward" size={HEIGHT.smallImage} color="white" style={styles.iconAccent} />
            <Text style={styles.buttonTextAccent}>{getText('nextButton')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listRowContainer: {
    height: HEIGHT.button,
    backgroundColor: COLORS.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2 * HEIGHT.border,
    borderRadius: BORDERS.radiusExtraLarge,
    borderColor: COLORS.border,
    marginTop: SPACING.small,
  },
  listItem: {
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    //paddingVertical: SPACING.small,
    fontFamily: FONTS.regular,
    fontSize: FONT_SIZES.average,
    color: COLORS.textSecondary,
    //height: HEIGHT.image,
    //backgroundColor: 'red',
  },
  columnTitle: {
    flex: 1,
    alignItems: 'center',
    maxWidth: '20%',
  },
  columnSmall: {
    flex: 1,
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: COLORS.textSecondary,
  },
  columnBig: {
    flex: 3,
    alignItems: 'flex-start',
    maxWidth: '60%',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.small,
    borderRadius: BORDERS.radiusLarge,
    marginHorizontal: SPACING.extraSmall,
    height: HEIGHT.button,
  },
  secondaryButton: {
    backgroundColor: COLORS.border, // Secondary button color
  },
  accentButton: {
    backgroundColor: COLORS.accent, // Accent button color
  },
  halfWidthButton: {
    flex: 1,
    maxWidth: '50%',
  },
  buttonTextPrimary: {
    color: COLORS.textPrimary,
    fontSize: FONT_SIZES.medium,
    fontFamily: FONTS.regular,
    marginLeft: SPACING.small,
  },
  buttonTextAccent: {
    color: 'white',
    fontSize: FONT_SIZES.medium,
    fontFamily: FONTS.regular,
    marginLeft: SPACING.small,
  },
  icon: {
    color: COLORS.textSecondary,
    marginRight: SPACING.small,
  },
  iconAccent: {
    color: 'white',
    marginRight: SPACING.small,
  },
  statusContainer: {
    alignItems: 'flex-start',
    paddingLeft: SPACING.medium,
    width: '50%',
  },
  statusText: {
    fontSize: FONT_SIZES.medium,
    fontFamily: FONTS.bold,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  statusNumber: {
    fontSize: FONT_SIZES.medium,
    fontFamily: FONTS.regular,
    color: COLORS.textPrimary,
  },
  dropDownList: {
    flexDirection: 'row',
    height: HEIGHT.button,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.small,
    margin: SPACING.small,
  },
  dropDownText: {
    color: COLORS.textPrimary,
    fontSize: FONT_SIZES.medium,
    fontFamily: FONTS.regular,
    marginHorizontal: SPACING.extraSmall,
    paddingLeft: SPACING.small,
  },
  textBox: {
    height: HEIGHT.button,
    backgroundColor: COLORS.border,
    color: COLORS.textPrimary,
    fontSize: FONT_SIZES.medium,
    fontFamily: FONTS.regular,
    padding: SPACING.small,
    marginHorizontal: SPACING.extraSmall,
    borderRadius: BORDERS.radiusLarge,
  },
});

export default InstallationScreen;
