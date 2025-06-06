import { StyleSheet, Dimensions } from "react-native";
import { themes } from "../../global/themes";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: themes.colors.lightRed,
    },
    boxTop: {
        height:Dimensions.get('window').height/4,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: 'green'
    },
    logo: {
        width: 200,
        height: 115
    },
    boxMid: {
        //backgroundColor: 'pink',
        height:Dimensions.get('window').height/1.7, // /4
        width: '100%',
        paddingHorizontal: 37,
        //paddingVertical: 20
    },
    boxBottom: {
        //backgroundColor: 'blue',
        height:Dimensions.get('window').height/6,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        //paddingTop: 40,
        //paddingVertical: 10,
        //justifyContent: 'flex-end',
    },
    textBottom: {
        fontSize: 16,
        color: themes.colors.white,
        paddingTop: 20
    },
    picker: {
        color: '#777777',
        //fontSize: 16,
        //paddingVertical: 10,
    },
    pickerContainer: {
        width: '100%',
        height: 47,
        borderWidth: 2,
        borderColor: themes.colors.darkRed,
        borderRadius: 19,
        marginTop: 10,
        justifyContent: 'center',
        backgroundColor: themes.colors.white,
        //paddingHorizontal: 10,
    },

})