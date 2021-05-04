import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

const BtnDel = (props) => {
    return (
        <View>
            {
            props.enabled ?
                <TouchableOpacity style={[styles.btn, styles.eBtn]} onPress={props.onPress}>
                    <Text style={[styles.btnText, styles.eBtnText]}>{props.title}</Text>
                </TouchableOpacity>
            :
                <View style={[styles.btn, styles.dBtn]} onPress={props.onPress}>
                    <Text style={[styles.btnText, styles.dBtnText]}>{props.title}</Text>
                </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    // button
    btn: {
        padding: 12,
        paddingLeft: 16,
        paddingRight: 16,
        borderRadius: 4,
        marginBottom: 20
    },
    btnText: {
        textTransform: "uppercase",
        fontWeight: "700",
        textAlign: "center"
    },
    // enabled button
    eBtn: { backgroundColor: "#0000" },
    eBtnText: { color: "#d32f2f" },
    // disabled button
    dBtn: { backgroundColor: "#ccc" },
    dBtnText: { color: "#888" },
});


export default BtnDel;