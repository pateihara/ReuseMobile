import { StyleSheet } from "react-native";
import { Colors } from "../../constants/theme";


export const styles = StyleSheet.create({
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
    fontSize: 20,
    marginLeft: 10,
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
