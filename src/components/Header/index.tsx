import React from 'react';
import {
View,
Text,
TouchableOpacity,
ViewProps,
Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/theme';
import SearchInput from '../Inputs/SearchInput';
import { styles } from './styles';
import { RootStackParamList } from '../../types/RootStackParamList';
import { StackNavigationProp } from '@react-navigation/stack';

interface HeaderProps extends ViewProps {
type: 'home' | 'page' | 'logo';
pageTitle?: string;
onNotificationsPress?: () => void;
onSearch?: (text: string) => void;
logoSource?: any;
headerHeight?: number;
}

const Header: React.FC<HeaderProps> = ({
type,
pageTitle,
onNotificationsPress,
onSearch,
logoSource,
headerHeight = 60,
style,
...props
}) => {

const navigation = useNavigation<NavigationProp<RootStackParamList>>();

const renderHomeHeader = () => (
    <>
    <View style={styles.searchContainer}>
        <SearchInput onChangeText={onSearch} />
    </View>
    <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
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
        name="chevron-back"
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
        name="chevron-back"
        size={24}
        color={Colors.light.backgroundSecondary}
        />
    </TouchableOpacity>
    <Image
    source={logoSource || require('../../assets/logo-login.png')}
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

export default Header;
