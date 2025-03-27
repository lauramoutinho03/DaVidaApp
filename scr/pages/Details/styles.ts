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
    //marginVertical: 10,
    //marginTop: 5,
    padding: 2,
    marginBottom: 5,
    //backgroundColor: themes.colors.lightGrey,
    borderRadius: 8,
    borderColor: themes.colors.lightGrey,
    borderWidth: 1,
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
      //position: 'absolute',
      paddingTop: 45,
      bottom: 30,
      //left: 15,
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
  horarioRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    //justifyContent: 'center',
    marginBottom: 5,
  },
  // Estilo para o nome do dia da semana
  diaSemanaText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: themes.colors.black,
  },
  // Estilo para o horário (hora de abertura e fechamento)
  horaText: {
    fontSize: 16,
    color: themes.colors.black,
  },
  // Container que agrupa todos os horários
  horariosContainer: {
    //marginTop: 5,
    paddingHorizontal: 40,
    marginBottom: 5,
    //backgroundColor: themes.colors.lightGrey,
    //borderRadius: 8,
    //borderWidth: 2,
    //borderColor: themes.colors.darkRed,
  },
  // Texto exibido quando não há horários
  noHorariosText: {
    fontSize: 16,
    color: themes.colors.black,
    fontStyle: 'italic',
    //marginTop: 10,
  },

})