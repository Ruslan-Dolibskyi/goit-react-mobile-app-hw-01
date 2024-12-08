import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";

const CreatePostsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Create Posts Screen</Text>
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

export default CreatePostsScreen;
