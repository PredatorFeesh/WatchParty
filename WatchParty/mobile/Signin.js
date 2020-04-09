import React from 'react';
import { 
  StyleSheet, 
  Text, 
  TextInput,
  View,
  TouchableOpacity,
 StatusBar } from 'react-native';


export default ({history}) => (
    <View style={styles.container}>
        <StatusBar backgroundColor="6495ED" barStyle="light-content"/>

        <Text>Watch Party</Text>

        <TextInput style = {styles.input} placeholder = "Email"/>

        <TextInput style = {styles.input} placeholder = "Password" secureTextEntry/>

        <View style={styles.btnContainer}>

            <TouchableOpacity style={styles.userBtn} 
                onPress = {() => history.push("/overview")}>
                <Text style = {styles.btnTxt}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.userBtn} 
                onPress = {() => history.push("/signup")}>
                <Text style = {styles.btnTxt}>Sign Up</Text>
            </TouchableOpacity>
        </View>
    </View>


);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6495ED',
    alignItems: 'center',
    justifyContent: 'center',
    color: "white",
    fontFamily: "Lobster-Regular"
  },

  input:{
    width: "90%",
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10
  }, 

  btnContainer:{
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%"
  },

  userBtn: {
    backgroundColor: "#FFD700",
    padding: 15, 
    width: "45%"
  },

  btnTxt: {
    fontSize: 16,
    textAlign: "center"
  }

});
