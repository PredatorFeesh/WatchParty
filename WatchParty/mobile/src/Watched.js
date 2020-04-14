import React from "react";
import { View, Text, Button } from "react-native";


export default({history}) =>(
    <View>
        <Text>Watched List</Text>
        <Button title = "Go Back to overview" onPress = {() => history.push("/overview")} />
    </View>
);