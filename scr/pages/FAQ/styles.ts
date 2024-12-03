import { StyleSheet } from "react-native";
import { themes } from "../../global/themes";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: themes.colors.lightRed,
  },
  listContainer: {
    paddingBottom: 16,
  },
  faqItem: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: themes.colors.white,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  faqTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  faqMessage: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  faqLink: {
    fontSize: 14,
    color: '#007BFF',
    textDecorationLine: 'underline',
  },
})