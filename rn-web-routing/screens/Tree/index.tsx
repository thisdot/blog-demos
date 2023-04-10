import { Link } from "@react-navigation/native";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

const Tree = ({ route }) => {
  const { branch, path } = route.params;
  return (
    <View style={styles.container}>
      <Text>This is Tree</Text>
      <Text>Branch: {branch}</Text>
      <Text>Path: {path}</Text>
      <Link style={styles.button} to="/home">
        <Button title="Go to Home" />
      </Link>
    </View>
  );
};

export default Tree;

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
