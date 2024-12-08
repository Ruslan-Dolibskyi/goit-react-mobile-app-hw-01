import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";

const Home = () => {
  return (
    <View style={styles.container}>
      <Text>Home Screen Content</Text>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Home;
