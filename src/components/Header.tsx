import React from 'react';
import {
View,
Text,
TouchableOpacity,
StyleSheet,
ViewProps,
Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/theme';
import SearchInput from './SearchInput';

interface HeaderProps extends ViewProps {
type: 'home' | 'page' | 'logo';
pageTitle?: string;
onNotificationsPress?: () => void;
onSearch?: (text: string) => void;
logoSource?: any;
headerHeight?: number; // 🔹 altura personalizável
}

const Header: React.FC<HeaderProps> = ({
type,
pageTitle,
onNotificationsPress,
onSearch,
logoSource,
headerHeight = 60, // 🔹 valor padrão
style,
...props
}) => {
const navigation = useNavigation();

const renderHomeHeader = () => (
    <>
    <View style={styles.searchContainer}>
        <SearchInput onChangeText={onSearch} />
    </View>
    <TouchableOpacity onPress={onNotificationsPress}>
        <Ionicons
        name="notifications-outline"
        size={24}
        color={Colors.light.backgroundSecondary}
        />
    </TouchableOpacity>
    </>
);

const renderPageHeader = () => (
    <>
    <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons
        name="arrow-back-outline"
        size={24}
        color={Colors.light.backgroundSecondary}
        />
    </TouchableOpacity>
    <Text style={styles.pageTitle}>{pageTitle}</Text>
    <View style={{ width: 24 }} />
    </>
);

const renderLogoHeader = () => (
    <>
    <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons
        name="arrow-back-outline"
        size={24}
        color={Colors.light.backgroundSecondary}
        />
    </TouchableOpacity>
    <Image
    source={logoSource || require('../assets/logo-login.png')}
    style={styles.logo}
    resizeMode="contain"
    />
    </>
);

return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: Colors.light.primary }]}>
    <View style={[styles.header, { height: headerHeight }, style]} {...props}>
        {type === 'home'
        ? renderHomeHeader()
        : type === 'page'
        ? renderPageHeader()
        : renderLogoHeader()}
    </View>
    </SafeAreaView>
);
};

const styles = StyleSheet.create({
safeArea: {
    width: '100%',
},
header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.light.primary,
    paddingHorizontal: 15,
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
    textAlign: 'left',
},
logo: {
    width: 150,
    height: 50,
    alignContent: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
},
});

export default Header;
