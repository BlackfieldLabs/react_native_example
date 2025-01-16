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
//Style
import { COLORS, HEIGHT } from '../styles/theme';
import sharedStyles from '../styles/sharedStyles';
//Components
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
        <SafeAreaView style={sharedStyles.safeLayoutContainerStyle}>
            <View style={sharedStyles.roleSelectionContainer}>
                <ScrollView contentContainerStyle={sharedStyles.roleSelectionScrollContainer}>
                    {roles.map((role) => (
                        <TouchableOpacity
                            key={role.id}
                            style={[
                                sharedStyles.roleSelectionCard,
                                isSelected(role.id) && sharedStyles.roleSelectionCardSelected,
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
                            <View style={sharedStyles.roleSelectionCardContent}>
                                <Text style={sharedStyles.roleSelectionCardTitle}>{role.title}</Text>
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
                        console.log('Selected roles:', selectedRoles);
                    }}
                />
            </View>
        </SafeAreaView>
    );
};

export default RoleSelectionScreen;
