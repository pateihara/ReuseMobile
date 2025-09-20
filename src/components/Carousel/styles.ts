import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "../../constants/theme";

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
carouselWrapper: {
    width: width - 32,
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
    alignSelf: 'center',
    marginVertical: 16,
},
bannerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
},
dot: {
    backgroundColor: Colors.light.backgroundPrimary,
    width: 6,
    height: 6,
    borderRadius: 100,
    marginHorizontal: 3,
},
activeDot: {
    backgroundColor: Colors.light.secondary,
    width: 8,
    height: 8,
    borderRadius: 100,
    marginHorizontal: 3,
},
});