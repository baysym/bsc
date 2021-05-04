import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Linking } from "react-native";
import Btn from "../comps/btn";
import AsyncStorage from "@react-native-async-storage/async-storage";




const PoemScreen = ({navigation}) => {

    const [poem, setPoem] = useState("Generating a poem based on your answers...");
    const [log, setLog] = useState("");



    // retrieve data
    const retrieve = async (key) => {
        try {
            let data = await AsyncStorage.getItem(key);
            setLog(data);
            let dataJSON = JSON.parse(data);
            let prompt = "";
            for (let i = 0; i < dataJSON.length; i++) {
                prompt += dataJSON[i].answer + " ";
            }
            api(prompt);
        } catch (e) {
            console.log(e.toString());
        }
    }



    // call the pythoneverywhere api
    const api = (prompt) => {
        fetch("http://baysym.pythonanywhere.com/" + prompt)
            .then(function(response) {
                return response.text()
                    .then(function(text) {
                        setPoem(text);
                    }
                )
            })
    }



    // handle the email button
    const handleEmail = () => {
        try {
            const prefix = "mailto:bsym307@gmail.com?subject=User Study&body=";
            Linking.openURL(prefix + log + "\n\n" + poem);
        } catch(e) {
            console.log("Email client couldn't be opened; " + e.toString());
        }
    }
    
    

    // when the page loads, ...
    useEffect(() => {
        retrieve("mostRecentWalkLog");
    }, []);



    // display
    return (
        <View style={styles.wrapper}>

            <Text style={styles.poem}>{poem}</Text>

            
            <Btn title="see your answers on a map" onPress={()=>navigation.navigate("Map")} enabled={true} />
            <Btn title="share your walk" onPress={handleEmail} enabled={true} />

        </View>
    );

};



const styles = StyleSheet.create({
    // main wrapper view
    wrapper: {
        padding: 40,
    },
    // poem
    poem: {
        marginBottom: 20
    },
});



export default PoemScreen;