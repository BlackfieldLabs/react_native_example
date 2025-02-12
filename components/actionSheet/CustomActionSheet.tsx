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
import { useTranslation } from "react-i18next";

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
    const { t } = useTranslation();
    return (
        <Modal isVisible={isVisible} onBackdropPress={onClose} style={styles.modal}>
            <View style={styles.actionSheet}>
                <Text style={styles.sheetTitle}>{sheetTitle}</Text>
                <View style={styles.listContainer}>
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
                                        color={item.iconColor || COLORS.textSecondary}
                                    />
                                )}
                                <Text style={styles.optionText}>{item.title}</Text>
                            </Pressable>
                        )}
                    />
                </View>
                <Pressable style={styles.cancelButton} onPress={onClose}>
                    <Text style={styles.cancelText}>{t('ActionStrings.cancelButtonTitle')}</Text>
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
    listContainer: {
        width: '100%',
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
        color: COLORS.textAlternative,
    },
    option: {
        height: HEIGHT.button,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        borderTopWidth: HEIGHT.border,
        borderTopColor: COLORS.textAlternative,
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
        backgroundColor: COLORS.secondary,
    },
    cancelText: {
        fontSize: FONT_SIZES.medium,
        fontFamily: FONTS.regular,
        color: COLORS.textPrimary,
    },
});

export default CustomActionSheet;
