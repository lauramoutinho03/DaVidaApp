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
        fontWeight: 'bold',
        marginBottom: 16,
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

})