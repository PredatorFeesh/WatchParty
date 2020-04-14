import React from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity,StatusBar } from 'react-native';
import {NativeRouter, Switch, Route} from "react-router-native";

/*import all pages below*/

import Signin from './src/Signin';
import Overview from './src/Overview';
import Watched from './src/Watched';
import Signup from './src/Signup';

export default function App() {
  return (
    <NativeRouter>
      <View style = {styles.container}>
        <Switch>
          <Route exact path = "/" component = {Signin} />
          <Route exact path = "/signup" component = {Signup} />
          <Route exact path = "/overview" component = {Overview} />
          <Route exact path = "/watched" component = {Watched} />
        </Switch>
      </View>
    </NativeRouter>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6495ED',
    alignItems: 'center',
    justifyContent: 'center',
  }
})
