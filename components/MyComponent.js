import React from "react";
import { StyleSheet, View, Text, Button, Alert, TextInput } from "react-native";
import { SHA256 } from "crypto-js";

const styles = StyleSheet.create({
  center: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: null, greetingType: 1 };
  }

  handleTextInput(val) {
    let newGreetingType = 2;
    if (val.toString().length == 0) {
      newGreetingType = 1;
    }
    this.setState({ name: val, greetingType: newGreetingType });
  }

  render() {
    let yourName = this.state.name;
    let greeting =
      yourName == null || yourName == "" ? null : (
        <Text style={{ color: "red" }}>Hi {yourName}!</Text>
      );
    let topGreeting =
      this.state.greetingType == 1 ? (
        <Text>Hi friend!</Text>
      ) : (
        <Text>What's your name?</Text>
      );

    return (
      <View style={styles.center}>
        {topGreeting}
        <TextInput
          editable
          numberOfLines={1}
          max={40}
          onChangeText={(val) => this.handleTextInput(val)}
          placeholder={this.props.prompt}
        />
        {greeting}
      </View>
    );
  }
}

export default MyComponent;
