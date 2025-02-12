import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    StyleSheet,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
//Style
import { COLORS, HEIGHT, SPACING } from '../styles/theme';
import sharedStyles from '../styles/sharedStyles';
//Components
import AccentButton from '../components/button/AccentButton';
//Navigation
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../helpers/RootStackParamList';

const RoleSelectionScreen = () => {
    const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
    const navigation = useNavigation<NavigationProp>();

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
        <SafeAreaView style={sharedStyles.safeLayoutContainerStyle}>
            <View style={styles.roleSelectionContainer}>
                <ScrollView contentContainerStyle={styles.roleSelectionScrollContainer}>
                    {roles.map((role) => (
                        <TouchableOpacity
                            key={role.id}
                            style={[
                                sharedStyles.roleSelectionCard,
                                isSelected(role.id) && styles.roleSelectionCardSelected,
                            ]}
                            onPress={() => toggleSelection(role.id)}
                        >
                            {/* First Column: Icon */}
                            <View style={sharedStyles.roleSelectionCardIconBackground}>
                                <MaterialIcons
                                    name={role.iconName}
                                    size={HEIGHT.image}
                                    color={COLORS.textSecondary}
                                />
                            </View>

                            {/* Second Column: Title and Subtitle */}
                            <View style={styles.roleSelectionCardContent}>
                                <Text style={sharedStyles.cardTitle}>{role.title}</Text>
                                <Text style={sharedStyles.roleSelectionCardSubtitle}>{role.subtitle}</Text>
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
                        navigation.navigate('Installation');
                        console.log(`[${new Date().toLocaleString()}] Selected roles:`, selectedRoles);
                    }}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    roleSelectionContainer: {
        flex: 1,
        padding: SPACING.large,
    },
    roleSelectionScrollContainer: {
        paddingBottom: SPACING.large,
    },
    roleSelectionCardSelected: {
        borderColor: COLORS.accent,
        borderWidth: 1,
    },
    roleSelectionCardContent: {
        flex: 3,
        justifyContent: 'center',
    },
});

export default RoleSelectionScreen;
