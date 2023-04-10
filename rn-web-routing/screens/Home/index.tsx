import React from "react";
import { Link } from "@react-navigation/native";
import { Button, StyleSheet, Text, View } from "react-native";

const Home = () => {
  return (
    <View style={styles.container}>
      <Text>This is Home</Text>
        <Link style={styles.button} to="profile">
          <Button title="Go to Profile" />
        </Link>
        <Link style={styles.button} to="tree/d1/d2/d3">
          <Button title="Go to Tree" />
        </Link>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginTop: 20,
  },
});
