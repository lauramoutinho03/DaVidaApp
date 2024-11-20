import { StyleSheet, Dimensions } from "react-native";
import { themes } from "../../global/themes";

export const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: themes.colors.lightRed,
  },
  boxTop: {
      height:Dimensions.get('window').height/3,
      width: '100%',
      //backgroundColor: 'pink',
      alignItems: 'center',
      justifyContent: 'flex-end'
  },
  boxMid: {
      height:Dimensions.get('window').height/4,
      width: '100%',
      //backgroundColor: 'green',
      paddingHorizontal: 37,
      justifyContent: 'center'
  },
  boxBottom: {
      height:Dimensions.get('window').height/3,
      width: '100%',
      //backgroundColor: 'blue',
      alignItems: 'center',
      //justifyContent: 'center'
      paddingTop: 40
  },
  logo: {
      width: 300,
      height: 115
  },
  title: {
      fontWeight: 'bold',
      color: themes.colors.white,
      marginTop: 15,
      fontSize: 25
  },
  button: {
      width: 250,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: themes.colors.darkRed,
      borderRadius: 40,
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 3,
      },
      shadowOpacity: 0.29,
      shadowRadius: 4.65,
      elevation: 7,
  },
  textButton: {
      fontSize: 16,
      color: themes.colors.white,
      fontWeight: 'bold'
  },
  textBottom: {
      fontSize: 16,
      color: themes.colors.white,
  }
})