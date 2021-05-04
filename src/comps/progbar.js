import React from "react";
import { StyleSheet, View, Text } from "react-native";

const ProgBar = (props) => {
    
    const fill = () => {
        return { width: 100 * (props.progress / props.limit) + "%" }
    }

    return (
        <View>
            <Text style={styles.text}>
                This is step {props.progress} of {props.limit}.
            </Text>
            <View style={styles.rail}>
                <View style={[styles.fill, fill()]}></View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    rail: {
        height: 5,
        width: "100%",
        backgroundColor: "#2194E544",
        marginBottom: 10,
        marginTop: 5
    },
    fill: {
        height: 5,
        backgroundColor: "#2194E5",
    },
    text: { color: "#444" },
});


export default ProgBar;