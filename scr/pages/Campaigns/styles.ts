import { StyleSheet } from "react-native";
import { themes } from "../../global/themes";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: themes.colors.lightRed
  },
  campaignItem: {
    backgroundColor: themes.colors.white,
    padding: 13,
    marginTop: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  campaignTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: themes.colors.black,
    flex: 1, // Faz com que ocupe apenas o espaço disponível
    //marginRight: 10, // Dá um espaço antes do botão
  },
  campaignData: {
    fontSize: 14,
    color: themes.colors.black,
    marginTop: 4,
    //paddingLeft: 10,
  },
  campaignDescription: {
    fontSize: 14,
    color: themes.colors.darkGrey,
    marginTop: 4,
    marginBottom: 10,
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    fontSize: 16,
    color: themes.colors.darkGrey,
    marginTop: 8,
  },
  campaignImage: {
    width: 250,
    height: 250,
    resizeMode: "contain", // Garante que a imagem se ajuste sem cortar
    alignSelf: "center", // Centraliza a imagem dentro do espaço
  },
  campaignHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    //paddingHorizontal: 10, // Ajusta o espaçamento interno
  },
  expandButton: {
    backgroundColor: themes.colors.lightGrey,
    paddingVertical: 8,
    paddingHorizontal: 13,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0, // Impede que o botão seja comprimido
    marginLeft: 10,
  },
  expandButtonText: {
    color: themes.colors.black,
    fontSize: 12,
  },
  campaignDetails: {
    marginTop: 8,
  }
})