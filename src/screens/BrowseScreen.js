import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MapView, { Marker } from "react-native-maps";



const BrowseScreen = ({navigation}) => {

    const [date, setDate] = useState("Select a poem by tapping a date on the map above.");
    const [poem, setPoem] = useState("");
    
    const [userPoems, setUserPoems] = useState([]);

    const placeholders = [
        {
            poem: "If I am feeling happy\n I will always feel happy\nand if I am feeling happy,\nI will never be sad.",
            date: "1 Apr",
            coords: [55.995, -4.096]
        },
        {
            poem: "The city is very colorful,\nIt's young and happy.\nI've never been up there, but I would love to go!\nPeople say it's old and dusty,\nAnd they are right...",
            date: "3 Apr",
            coords: [51.879, -4.068]
        },
        {
            poem: "Tufts of grass in the city,\nTufts of grass at Lincoln's feet;\nTufts of grass and the river Humber\nFlowing into a mist.\nTall towers of Lincoln Cathedral,\nOld and gray and proud;\nThe University, with its dreaming spires,\nGreen meadows where swans float.\nIn the sky airplanes winging,\nShips out on the sea;\nIn my heart I hear singing: Freedom! – Love! – Truth!",
            date: "4 Apr",
            coords: [54.653, -3.013]
        },
        {
            poem: "Lincolnshire's thatched and timbered houses,\nEngland of the dreamy downs and hollows,\nI think of you as I walk by your rivers \nWhere swans float far from the reedy fens.\nI am so far away from town or city:\nHere men live close to earth and water;\nAnd here, beneath a quiet moonlit sky,\nThe swans are wheeling round an ancient tower.",
            date: "9 Apr",
            coords: [53, 0]
        }
    ];



    // retrieve stored data
    const retrieve = async () => {
        let data = await AsyncStorage.getItem("userPoems");
        setUserPoems(userPoems.push(JSON.parse(data)));
    }

    

    // retreive final markers of each stored walk
    useEffect(() => { retrieve() }, []);



    // display
    return (
        <View style={styles.wrapper}>

            {/* final location map */}
            <MapView style={styles.map} region={{
                latitude: 54.5,
                longitude: -4,
                latitudeDelta: 10,
                longitudeDelta: 10
            }}>
                {/* plot placeholders */
                placeholders.map((m, i) => {
                    return (m &&
                        <Marker
                            key={i}
                            coordinate={{latitude:m.coords[0], longitude:m.coords[1]}}
                            onPress={() => { setDate(m.date); setPoem(m.poem); }}
                        >
                            <Text style={styles.marker}>{m.date}</Text>
                        </Marker>
                    )
                })
                }
            </MapView>


            <View style={styles.poemView}>
                <Text style={styles.date}>{date}</Text>
                <Text style={styles.poem}>{poem}</Text>
            </View>

        </View>
    );

};



const styles = StyleSheet.create({
    // main wrapper view
    wrapper: {
        padding: 20,
    },
    // final location map
    map: {
        width: "100%",
        height: 300,
        marginBottom: 20,
    },
    // map marker
    marker: {
        padding: 4,
        paddingLeft: 8,
        paddingRight: 8,
        backgroundColor: "#fffe",
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 4,
        fontWeight: "bold"
    },
    // poem
    poemView: {
        marginBottom: 20
    },
    date: {
        fontWeight: "bold",
        marginBottom: 10
    },
    poem: {
        lineHeight: 20
    }
});



export default BrowseScreen;