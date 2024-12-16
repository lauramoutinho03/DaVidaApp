import { StyleSheet } from "react-native";
import { themes } from "../../global/themes";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: themes.colors.lightRed,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    //paddingVertical: 10,
    paddingHorizontal: 30,
    marginTop: 40,
    //width: '100%',
    //backgroundColor: themes.colors.darkGrey,
  },
  buttonHeader: {
    //padding: 10,
    backgroundColor: themes.colors.white,
    width: 40,
    height: 40,
    borderRadius: 20,
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
  listContainer: {
    paddingBottom: 16,
  },
  instituicaoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    marginVertical: 5,
    marginHorizontal: 16,
    backgroundColor: themes.colors.white,
    borderRadius: 5,
  },
  instituicaoNome: {
    // fontSize: 16,
    fontWeight: 'bold',
    // marginBottom: 4,
    flex: 1,
  },
  instituicaoDetalhes: {
    fontSize: 14,
    color: '#555',
  },
  boxBottom: {
    //backgroundColor: 'pink',
    marginTop: 16,
    alignItems: 'center',
  },
  button: {
    backgroundColor: themes.colors.lightGrey,
    paddingVertical: 8,
    //height: '100%',
    paddingHorizontal: 13,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: themes.colors.black,
    fontSize: 12,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    //backgroundColor: themes.colors.lightRed,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  picker: {
    width: '48%',
    height: 40,
    //borderWidth: 2,
    //borderColor: themes.colors.darkRed,
    borderRadius: 5,
    marginTop: 10,
    justifyContent: 'center',
    //paddingHorizontal: 10,
    backgroundColor: themes.colors.white,
  },
  pickerText: {
    color: '#777777',
    fontSize: 14, 
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  iconInput: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    width: '100%',
    paddingRight: 11
  },
  emptyMessageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:themes.colors.white,
    borderRadius: 8,
    marginHorizontal: 4,
    padding: 10,
  },
  emptyMessage: {
    fontSize: 16,
    color: themes.colors.darkGrey,
    textAlign: 'center',
    marginVertical: 8,
  },
  mapPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapPlaceholderText: {
    fontSize: 16,
    color: themes.colors.black,
  }, 
/*   toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#E0E0E0', // Cor de fundo para todo o container
    borderRadius: 20,          // Arredondamento do grupo
    margin: 10,
  }, */
  toggleButtonActive: {
    backgroundColor: themes.colors.darkGrey, // Cor do botão ativo
  },
  toggleButtonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
  },
  toggleButtonTextActive: {
    color: themes.colors.white, // Cor do texto do botão ativo
  },
  toggleButtonLista: {
    flex: 1,                  
    alignItems: 'center',     
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    marginLeft: 35,
    backgroundColor: themes.colors.white,
    height: 25,
    justifyContent: 'center',
  },
  toggleButtonMapa: {
    flex: 1,                  
    alignItems: 'center',     
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    marginRight: 35,
    backgroundColor: themes.colors.white,
    height: 25,
    justifyContent: 'center',
  },
})