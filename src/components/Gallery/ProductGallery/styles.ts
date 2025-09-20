import { StyleSheet, Dimensions } from "react-native";


const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
galleryWrapper: {
    marginVertical: 16,
},
scrollContent: {
    paddingHorizontal: 1,
},
image: {
    width: width * 0.8, // imagem maior
    height: width * 1, // deixa quadrada, mas pode ajustar
    borderRadius: 5,
    resizeMode: 'cover',
    marginRight: 16,
},
});