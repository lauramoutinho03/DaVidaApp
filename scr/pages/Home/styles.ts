import { StyleSheet } from "react-native";
import { themes } from "../../global/themes";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    //justifyContent: 'center',
    backgroundColor: themes.colors.lightRed
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: themes.colors.darkGrey,
    //alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 40,
    //paddingBottom: 10,
    width: '100%',
    marginTop: 60,
  },
  buttonHeader: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: themes.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  boxBottom: {
    //height:Dimensions.get('window').height/4,
    width: '100%',
    backgroundColor: 'blue',
    alignItems: 'center',
    paddingVertical: 10,
    //justifyContent: 'flex-end',
    //paddingBottom: 115
  },
})