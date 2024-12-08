import { StyleSheet } from "react-native";
import { themes } from "../../global/themes";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: themes.colors.lightRed,
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
  box: {
    flex: 7,
  },
  pickerContainer: {
    width: '100%',
    height: 47,
    borderWidth: 2,
    borderColor: themes.colors.darkRed,
    borderRadius: 19,
    marginTop: 30,
    marginBottom: 20,
    justifyContent: 'center',
    backgroundColor: themes.colors.white,
  },
  label: {
    fontSize: 16,
    color: themes.colors.black,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 20,
  },
  datePickerContainer: {
    marginBottom: 20,
    marginTop: 30,
    borderWidth: 2,
    borderColor: themes.colors.darkRed,
    borderRadius: 19,
    backgroundColor: themes.colors.white,
    flexDirection: 'row', // Alinha itens na mesma linha
    alignItems: 'center', // Centraliza verticalmente
    paddingHorizontal: 10, // Espaçamento interno
  },
  datePickerButton: {
    flexDirection: 'row', // Alinha o texto e ícone na mesma linha
    alignItems: 'center', // Centraliza o ícone e o texto verticalmente
    flex: 1, // Permite que o botão ocupe o espaço necessário
  },
  buttonContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  dateText: {
    padding: 10,
    fontSize: 16,
    color: '#333',
    flex: 1, // Permite que o texto ocupe o espaço restante
    marginRight: 8, // Espaçamento entre texto e ícone
  },
  icon: {
    marginRight: 8,
    color: themes.colors.darkGrey,
  },
  
})