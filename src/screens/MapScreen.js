import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Btn from "../comps/btn";
import MapView, { Marker } from "react-native-maps";



const MapScreen = ({navigation}) => {

    const [mostRecentWalkLog, setMostRecentWalkLog] = useState([]);
    const [displayRegion, setDisplayRegion] = useState({
        // default to view the UK
        latitude: 54.5,
        longitude: -4,
        latitudeDelta: 10,
        longitudeDelta: 10
    });



    // retrieve data
    const retrieve = async (key) => {
        try {
            let data = await AsyncStorage.getItem(key);
            setMostRecentWalkLog(JSON.parse(data));
            averageMarker(JSON.parse(data));
        } catch (e) {
            console.log(e.toString());
        }
    }



    // average marker location
    const averageMarker = (data) => {
        let lats = [];
        let lons = [];

        // collate all latitudes and longitudes
        for (let i = 0; i < data.length; i++) {
            lats.push(data[i].lat);
            lons.push(data[i].lon);
        }

        // find each's minimum value
        let latMin = Math.min(...lats);
        let lonMin = Math.min(...lons);
        // find each's maximum value
        let latMax = Math.max(...lats);
        let lonMax = Math.max(...lons);
        // find each's range
        let latDel = Math.abs(latMax) - Math.abs(latMin) + 0.00025;
        let lonDel = Math.abs(lonMax) - Math.abs(lonMin) + 0.00025;
        // find each's mean
        let latAvg = lats.reduce((a, b) => a + b, 0) / lats.length;
        let lonAvg = lons.reduce((a, b) => a + b, 0) / lons.length;

        // set the display region
        setDisplayRegion({
            latitude: latAvg,
            longitude: lonAvg,
            latitudeDelta: latDel,
            longitudeDelta: lonDel
        });
    }



    // when the page loads, ...
    useEffect(() => {
        retrieve("mostRecentWalkLog");
    }, []);



    // display
    return (
        <View>
            {/* full-width map view */}
            <MapView style={styles.map} region={displayRegion}>
                {/* plot markers */
                mostRecentWalkLog.map((m, i) => {
                    return (m && m.lat && m.lon &&
                        <Marker key={i} coordinate={{latitude:m.lat, longitude:m.lon}} >
                            <View><Text style={styles.marker}>{m.answer}</Text></View>
                        </Marker>
                    )  
                })}
            </MapView>

            {/* padded-width view */}
            <View style={styles.wrapper}>
                <Btn title="back to home" onPress={()=>navigation.navigate("Home")} enabled={true} />
            </View>

        </View>
    );

};



const styles = StyleSheet.create({
    // main wrapper view
    wrapper: {
        padding: 40,
    },
    // prompt location map
    map: {
        width: "100%",
        height: 400,
        marginBottom: 20,
    },
    // map marker
    marker: {
        padding: 4,
        paddingLeft: 8,
        paddingRight: 8,
        backgroundColor: "#fffc",
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 4
    }
});



export default MapScreen;