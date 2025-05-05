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
    //alignItems: 'center',
    paddingHorizontal: 16,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'center',
    alignContent: 'center',
  },
  timerBox: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: themes.colors.white,
    padding: 8,
    marginHorizontal: 8,
    borderRadius: 8,
    width: 70,
  },
  timerText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: themes.colors.black,
  },
  timerLabel: {
    fontSize: 14,
    fontWeight: '500',
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
    alignItems: 'center',
    backgroundColor: themes.colors.lightRed,
    width: '100%',
    paddingBottom: 16,
    paddingTop: 16,
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
  progressContainer: {
    marginTop: 10,
    //marginBottom: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    //backgroundColor: themes.colors.lightGrey,
    width: '100%',
  },
  progressBarContainer: {
    width: '100%',
    height: 16,
    backgroundColor: themes.colors.white,
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 8,
    marginBottom: 8,
  },
  progressBar: {
    height: '100%',
    backgroundColor: themes.colors.darkRed,
  },
  levelText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: themes.colors.white,
  },
  progressText: {
    fontSize: 14,
    color: themes.colors.black,
  },
  levelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalItem: {
    fontSize: 16,
    marginBottom: 6,
  },
  closeButton: {
    marginTop: 20,
    alignSelf: 'flex-end',
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 6,
  },
  closeButtonText: {
    fontSize: 14,
    color: '#333',
  },
  buttonHeader: {
    backgroundColor: themes.colors.white,
    width: 25,
    height: 25,
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
  levelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 6,
  },  
})