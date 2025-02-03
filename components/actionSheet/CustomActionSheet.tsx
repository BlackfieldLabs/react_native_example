import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  FlatList,
} from 'react-native';
//Library
import Modal from 'react-native-modal';
//Style
import { BORDERS, COLORS, FONT_SIZES, FONTS, HEIGHT, SPACING } from '../../styles/theme';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
//Localization
import { getText } from '../../localization/localization';

interface ActionSheetItem {
    title: string;
    iconName?: string;
    iconColor?: string;
  }
  
  interface CustomActionSheetProps {
    isVisible: boolean;
    sheetTitle: string;
    options: ActionSheetItem[];
    onSelect: (index: number) => void;
    onClose: () => void;
  }
  
  const CustomActionSheet: React.FC<CustomActionSheetProps> = ({
    isVisible,
    sheetTitle,
    options,
    onSelect,
    onClose,
  }) => {
      return (
        <Modal isVisible={isVisible} onBackdropPress={onClose} style={styles.modal}>
        <View style={styles.actionSheet}>
          {/* Sheet Title */}
          <Text style={styles.sheetTitle}>{sheetTitle}</Text>
          {/* Scrollable List */}
          <FlatList
            data={options}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={true}
            renderItem={({ item, index }) => (
              <Pressable
                style={({ pressed }) => [
                  styles.option,
                  pressed && styles.optionPressed,
                ]}
                onPress={() => {
                  onSelect(index);
                  onClose();
                }}
              >
                {item.iconName && (
                  <MaterialIcons
                    name={item.iconName}
                    size={HEIGHT.smallImage}
                    color={item.iconColor || COLORS.textPrimary}
                  />
                )}
                <Text style={styles.optionText}>{item.title}</Text>
              </Pressable>
            )}
          />
          {/* Cancel Button */}
          <Pressable style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelText}>{getText('cancelButtonTitle')}</Text>
          </Pressable>
        </View>
      </Modal>
    );
  };

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'flex-end',
        margin: SPACING.medium,
    },
    actionSheet: {
        backgroundColor: COLORS.primary,
        borderRadius: BORDERS.radiusLarge,
        alignItems: 'center',
        maxHeight: '80%',
    },
    sheetTitle: {
        fontSize: FONT_SIZES.medium,
        fontFamily: FONTS.regular,
        color: COLORS.textSecondary,
    },
    option: {
        height: HEIGHT.button,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        borderTopWidth: HEIGHT.border,
        borderTopColor: COLORS.background,
    },
    optionPressed: {
        backgroundColor: COLORS.border,
    },
    optionText: {
        fontSize: FONT_SIZES.medium,
        fontFamily: FONTS.regular,
        color: COLORS.textPrimary,
        marginLeft: SPACING.small,
    },
    cancelButton: {
        height: HEIGHT.button,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: BORDERS.radiusLarge,
        width: '100%',
        backgroundColor: COLORS.background,
    },
    cancelText: {
        fontSize: FONT_SIZES.medium,
        fontFamily: FONTS.regular,
        color: COLORS.textPrimary,
    },
});

export default CustomActionSheet;
