import { StyleSheet } from "react-native";
import { themes } from "../../global/themes";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: themes.colors.lightRed
  },
  contagem: {
    flex: 3, // Área superior
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  timerBox: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: themes.colors.white,
    padding: 16,
    marginHorizontal: 8,
    borderRadius: 8,
  },
  timerText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: themes.colors.black,
  },
  timerLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: themes.colors.black,
  },
  title: {
    fontWeight: 'bold',
    color: themes.colors.white,
    fontSize: 16,
  },
  historico: {
    flex: 7, // Área inferior
    backgroundColor: themes.colors.lightRed,
    //backgroundColor: 'lightpink',
    paddingHorizontal: 16,
    paddingTop: 16,
    width: '100%',
  },
  buttonContainer: {
    marginTop: 16,
    marginBottom: 16,
    alignItems: 'center',
    //backgroundColor: 'yellow',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: themes.colors.white,
    padding: 16,
    marginTop: 8,
    //marginBottom: 8,
    borderRadius: 8,
  },
  listText: {
      fontSize: 14,
      color: themes.colors.black,
  },
})