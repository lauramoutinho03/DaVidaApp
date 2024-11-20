import { Dimensions, StyleSheet } from "react-native";
import { themes } from "../../global/themes";

export const style = StyleSheet.create({
    titleInput: {
        marginLeft: 5,
        color: themes.colors.white,
        marginTop: 20
    },
    boxInput: {
        width: '100%',
        height: 47,
        borderWidth: 2,
        borderColor: themes.colors.darkRed,
        borderRadius: 19,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        backgroundColor: themes.colors.white
    },
    input: {
        height: '100%',
        width: '90%',
        borderRadius: 19,
        borderColor: themes.colors.darkRed,
        //backgroundColor: 'red'
    },
    Icon: {
        width: '100%'
    },
    Button: {
        width: '10%'
    }
})