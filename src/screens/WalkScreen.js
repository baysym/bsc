import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Btn from "../comps/btn";
import BtnDel from "../comps/btndel";
import ProgBar from "../comps/progbar";



const WalkScreen = ({navigation}) => {

    // progress variables
    const [taskNumber, setTaskNumber] = useState(1);  // what task is the user on?
    const walkLength = 10;  // how many tasks per walk?

    // answer validation
    const [currentAnswer, setCurrentAnswer] = useState("");
    const [answerIsValid, setAnswerIsValid] = useState(false);

    // next task loading
    const [isLoading, setIsLoading] = useState(false);

    // walk log
    const [walkLog, setWalkLog] = useState([]);  // JSON objects for each task

    // tasks
    const [taskText, setTaskText] = useState("No task set!");
    const directions = [
        "Take the next left.",
        "Take the next left.",
        "Take the next right.",
        "Take the next right.",
        "Keep walking until you get to a corner.",
        "Keep walking until you get to a corner.",
        "Find a quiet place.",
        "Find a shaded place.",
        "Find a tree.",
        "Find a crossroad.",
        "Find a group of people.",
        "Find public transport.",
        "Find a pedestrian crossing.",
        "Find a bright place.",
        "Find a noisy place.",
        "Find a bench or seat.",
        "Find a body of water.",
        "Find a large open space.",
        "Find an area of grass.",
        "Stop for two minutes."
    ];
    const prompts = [
        "What is the tallest thing you can see?",
        "What is the brightest thing you can see?",
        "What can you smell here?",
        "What can you hear here?",
        "How does this place make you feel?",
        "What kind of people are around you?",
        "How do you think the closest stranger feels?",
        "What is the sky like from here?",
        "Describe the next couple you see.",
        "Describe the oldest-looking building you can see.",
        "Describe the newest-looking building you can see.",
        "Describe any nature you can see around you.",
        "Describe where you are in a single word.",
        "What's the most recognisable thing you can see?"
    ];



    // store data
    const store = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.log(e.toString());
        }
    }
    


    // generate taskText
    const newTask = () => {
        // pick a random direction and prompt
        let d = Math.floor(Math.random() * directions.length);
        let p = Math.floor(Math.random() * prompts.length);

        // output a full task
        let task = directions[d] + "\nTake another 10 paces.\n" + prompts[p];
        return task;
    }



    // progress to the next task
    const nextTask = (locationData) => {
        // generate this tasks' log object
        let taskLog = {
            task: taskText.split(/\r?\n/)[0] + " " + taskText.split(/\r?\n/)[2],  // just the direciton and prompt
            answer: currentAnswer,
            lat: locationData[0],
            lon: locationData[1],
        };

        // add this task's log to the walk's log
        let tempLog = walkLog;
        tempLog.push(taskLog);
        setWalkLog(tempLog);

        // if the walk is finished
        if (taskNumber == walkLength) {
            store("mostRecentWalkLog", walkLog);  // store this walk's log
            navigation.navigate("Poem");  // navigate to the poem page
        } else {
            setCurrentAnswer("");  // reset the user's answer
            setAnswerIsValid(false);  // invalidate the new empty answer
            setTaskText(newTask());  // generate a new task
            setTaskNumber(taskNumber + 1);  // increase the progress variable
        }
    }



    // locate the user and trigger nextTask()
    const locateUser = async () => {
        try {
            navigator.geolocation.getCurrentPosition(
                // success
                (position) => {
                    nextTask([
                        position["coords"]["latitude"],
                        position["coords"]["longitude"]
                    ]);
                    setIsLoading(false);  // stop the loading phase
                },
                // failure
                (err) => console.log(err),
                // parameters
                { enableHighAccuracy: false, timeout: 3000, maximumAge: 10000 }
            );
        }
        catch {
            nextTask([null, null]);
        }
    }



    // handle the user wanting to continue
    const handleContinue = () => {
        setIsLoading(true);  // begin the loading phase
        locateUser(); // get the user's location for logging and call nextTask
    }



    // when the page loads
    useEffect(() => {
        setTaskText(newTask());  // generate an initial task
    }, []);



    // display
    return (
        <View style={styles.wrapper}>

            <ProgBar progress={taskNumber} limit={walkLength} />

            {
            isLoading
            ?   // loading
                <Text>Loading location data...</Text>
            :   // not loading
                <View>
                    <Text>{taskText}</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Type here"
                        value={currentAnswer}
                        onSubmitEditing={handleContinue}
                        onChangeText={
                            (answer) => {
                                setCurrentAnswer(answer);
                                setAnswerIsValid(answer != "");
                            }
                        }
                    />

                    { answerIsValid
                    ? <Btn title="continue" onPress={handleContinue} enabled={true} />
                    : <Btn title="continue" enabled={false} />
                    }
                </View>
            }

        </View>
    );

};



const styles = StyleSheet.create({
    // main wrapper view
    wrapper: {
        padding: 40,
    },
    // direction and prompt (task)
    task: {
        marginTop: 20,
    },
    // user text input field
    input: {
        width: '100%',
        padding: 6,
        paddingLeft: 16,
        paddingRight: 16,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        marginTop: 20,
        marginBottom: 20,
    },
});



export default WalkScreen;