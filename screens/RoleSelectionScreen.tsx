import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { COLORS, SPACING, FONT_SIZES, BORDERS, FONTS, HEIGHT } from '../styles/theme';
import AccentButton from '../components/button/AccentButton';

const RoleSelectionScreen = () => {
    const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

    const roles = [
        {
            id: '1',
            iconName: 'engineering',
            title: 'Installer',
            subtitle: 'Person whose job is to deploy the set of devices in the deployment location, but has no access to historical data',
        },
        {
            id: '2',
            iconName: 'handshake',
            title: 'Caretaker',
            subtitle: 'Person who has access to all the data as currently described',
        },
        {
            id: '3',
            iconName: 'elderly',
            title: 'Beneficiary',
            subtitle: 'Person whose environment deployment is installed',
        },
    ];

    const toggleSelection = (id: string) => {
        setSelectedRoles((prevSelectedRoles) =>
            prevSelectedRoles.includes(id)
                ? prevSelectedRoles.filter((roleId) => roleId !== id)
                : [...prevSelectedRoles, id]
        );
    };

    const isSelected = (id: string) => selectedRoles.includes(id);

    return (
        <SafeAreaView style={styles.safeContainer}>
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    {roles.map((role) => (
                        <TouchableOpacity
                            key={role.id}
                            style={[
                                styles.card,
                                isSelected(role.id) && styles.cardSelected,
                            ]}
                            onPress={() => toggleSelection(role.id)}
                        >
                            {/* First Column: Icon */}
                            <View style={styles.cardIconBackground}>
                                <MaterialIcons
                                    name={role.iconName}
                                    size={HEIGHT.image}
                                    color={COLORS.textSecondary}
                                />
                            </View>

                            {/* Second Column: Title and Subtitle */}
                            <View style={styles.cardContent}>
                                <Text style={styles.cardTitle}>{role.title}</Text>
                                <Text style={styles.cardSubtitle}>{role.subtitle}</Text>
                            </View>

                            {/* Third Column: Selection Indicator */}
                            <TouchableOpacity onPress={() => toggleSelection(role.id)}>
                                <MaterialIcons
                                    name={isSelected(role.id) ? 'check-circle' : 'radio-button-unchecked'}
                                    size={HEIGHT.smallImage}
                                    color={isSelected(role.id) ? COLORS.accent : COLORS.textSecondary}
                                />
                            </TouchableOpacity>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Accent Button */}
                <AccentButton
                    title="Proceed"
                    onAccentButtonPress={() => {
                        console.log('Selected roles:', selectedRoles);
                    }}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    container: {
        flex: 1,
        padding: SPACING.large,
    },
    scrollContainer: {
        paddingBottom: SPACING.large,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.background,
        borderRadius: BORDERS.radiusLarge,
        borderWidth: 1,
        borderColor: COLORS.border,
        padding: SPACING.medium,
        marginBottom: SPACING.medium,
    },
    cardSelected: {
        borderColor: COLORS.accent,
        borderWidth: 1,
    },
    cardIconBackground: {
        width: HEIGHT.button,
        height: HEIGHT.button,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.border,
        borderRadius: BORDERS.radiusMedium,
        marginRight: SPACING.small,
    },
    cardContent: {
        flex: 3,
        justifyContent: 'center',
    },
    cardTitle: {
        fontSize: FONT_SIZES.large,
        fontFamily: FONTS.regular,
        color: COLORS.textPrimary,
        paddingLeft: SPACING.small,
    },
    cardSubtitle: {
        width: '50%',
        fontSize: FONT_SIZES.medium,
        fontFamily: FONTS.regular,
        color: COLORS.textSecondary,
        paddingLeft: SPACING.small,
    },
});

export default RoleSelectionScreen;
