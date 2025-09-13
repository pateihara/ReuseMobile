import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewProps } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/theme';
import SearchInput from './SearchInput';

interface HeaderProps extends ViewProps {
type: 'home' | 'page';
pageTitle?: string;
onNotificationsPress?: () => void;
onSearch?: (text: string) => void;
}

const Header: React.FC<HeaderProps> = ({ type, pageTitle, onNotificationsPress, onSearch, style, ...props }) => {
const navigation = useNavigation();

const renderHomeHeader = () => (
    <>
    <View style={styles.searchContainer}>
        <SearchInput onChangeText={onSearch} />
    </View>
    <TouchableOpacity onPress={onNotificationsPress}>
        <Ionicons name="notifications-outline" size={24} color={Colors.light.backgroundSecondary} />
    </TouchableOpacity>
    </>
);

const renderPageHeader = () => (
    <>
    <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-outline" size={24} color={Colors.light.backgroundSecondary} />
    </TouchableOpacity>
    <Text style={styles.pageTitle}>{pageTitle}</Text>
    <View style={{ width: 24 }} />
    </>
);

return (
    <View style={[styles.header, style]} {...props}>
    {type === 'home' ? renderHomeHeader() : renderPageHeader()}
    </View>
);
};

const styles = StyleSheet.create({
header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.light.primary,
    padding: 15,
},
searchContainer: {
    flex: 1,
    marginRight: 15,
},
pageTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.backgroundSecondary,
    flex: 1,
    textAlign: 'center',
},
});

export default Header;