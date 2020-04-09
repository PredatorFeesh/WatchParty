import React from "react";
import { View, Text, Button } from "react-native";



export default({history}) =>(
    <View>
        <Text> This is the overview page</Text>
        <Button title = "Change the page" onPress = {() => history.push("/watched")} />
    </View>
);