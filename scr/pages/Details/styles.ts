import { StyleSheet } from "react-native";
import { themes } from "../../global/themes";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: themes.colors.lightRed,
  },
  title: {
    fontSize: 20,
    //fontWeight: 'bold',
    marginBottom: 20,
  },
  details: {
    fontSize: 16,
    marginBottom: 8,
  },
  infoContainer: {
    backgroundColor: themes.colors.white,
    flex: 1,
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    marginTop: 10,
    position: "relative",
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    marginVertical: 25,
  },
  list: {
    paddingBottom: 10,
  },
  nivelRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 4,
  },
  tipoText: {
      fontSize: 16,
      color: themes.colors.black,
      width: 40,
  },
  nivelContainer: {
      flexDirection: "row",
      marginLeft: 8,
  },
  niveisContainer: {
      alignItems: "center",
      marginTop: 10,
      //backgroundColor: themes.colors.white,
  },
  legendaContainer: {
      //height:Dimensions.get('window').height/15,
      //backgroundColor: themes.colors.white,
      alignItems: 'center',
      marginTop: 16,
      position: 'absolute',
      bottom: 30,
      left: 15,
      width: '100%',
      justifyContent: 'center',
      paddingVertical: 8,
  },
  legendaText: {
      fontSize: 11,
      color: themes.colors.black,
      textAlign: "center",
      marginTop: 4,
  },

})