import { StyleSheet } from "react-native";
import { themes } from "../../global/themes";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    //alignItems: 'center',
    //justifyContent: 'center',
    backgroundColor: themes.colors.lightRed,
    padding: 20,
  },
  sairContainer: {
    //flex: 1,
    //backgroundColor: themes.colors.lightGrey,
    alignItems: 'flex-end',
    //justifyContent: 'center',
  },
  sairButton: {
    width: 100, 
    height: 30,
    borderRadius: 10,
    backgroundColor: themes.colors.darkRed,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoContainer: {
      backgroundColor: themes.colors.white,
      flex: 1,
      padding: 16,
      borderRadius: 8,
      marginBottom: 16,
      marginTop: 100,
      //position: "relative",
  },
  boxBottom: {
    //height:Dimensions.get('window').height/4,
    width: '100%',
    //backgroundColor: 'blue',
    alignItems: 'center',
    paddingVertical: 10,
    marginTop: 120
    //justifyContent: 'flex-end',
    //paddingBottom: 115
  },
})