import React from "react";
import { StyleSheet, View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Btn from "../comps/btn";
import BtnDel from "../comps/btndel";



const HomeScreen = ({navigation}) => {
    return (
        <View style={styles.wrapper}>

            {/* app introduction */}
            <Text style={styles.intro}>
                Explore your surroundings
            </Text>

            {/* navigation buttons */}
            <Btn title="browse poems" onPress={()=>navigation.navigate("Browse")} enabled={true} />
            <Btn title="start a walk" onPress={()=>navigation.navigate("Walk")} enabled={true} />
            
            {/* debug button to clear all stored variables */}
            <BtnDel title="clear all storage" onPress={()=>AsyncStorage.clear()} enabled={true} />

        </View>
    );
};



const styles = StyleSheet.create({
    // main wrapper view
    wrapper: {
        padding: 40,
    },
    // introduction text
    intro: {
        fontSize: 24,
        fontWeight: "bold",
        marginTop: 80,
        marginBottom: 80
    },
});



export default HomeScreen;