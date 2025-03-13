import { StyleSheet } from "react-native";
import { themes } from "../../global/themes";

export const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: themes.colors.lightRed
    },
    alertaItem: {
      backgroundColor: themes.colors.white,
      marginTop: 15,
      padding: 16,
      marginHorizontal: 15,
      borderRadius: 5,  
    },
    alertaData: {

    },
    alertaMensagem: {
      marginTop: 7,
    },
    listContainer: {
      //flex: 1,
      backgroundColor: themes.colors.lightRed,
    },
})