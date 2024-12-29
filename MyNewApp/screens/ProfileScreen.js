import React from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../styles/global";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("screen");

const avatarUrl = require("../assets/avatar.png");

const photos = [
  {
    id: 1,
    image: require("../assets/default-image.png"),
    caption: "Ліс",
    comments: 8,
    likes: 153,
    location: "Ukraine",
  },
  {
    id: 2,
    image: require("../assets/default-image.png"),
    caption: "Захід на Чорному морі",
    comments: 3,
    likes: 200,
    location: "Ukraine",
  },
  {
    id: 3,
    image: require("../assets/default-image.png"),
    caption: "Старий будиночок у Венеції",
    comments: 50,
    likes: 200,
    location: "Italy",
  },
];

const ProfileScreen = ({ navigation }) => {
  const navigateToSettings = () => {
    alert("Settings feature not implemented");
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.backgroundImage}
        source={require("../assets/background.png")}
        resizeMode="cover"
      />
      <View style={styles.profileContainer}>
        <View style={styles.avatarContainer}>
          <Image style={styles.avatar} source={avatarUrl} />
          <View
            style={[styles.iconContainer, { backgroundColor: colors.white }]}
          ></View>
        </View>
        <Text style={[styles.title, { marginBottom: 32 }]}>
          Natali Romanova
        </Text>
        <ScrollView style={{ flex: 1 }}>
          {photos.map((photo) => (
            <View key={photo.id} style={styles.photoCard}>
              <Image source={photo.image} style={styles.photo} />
              <Text style={styles.caption}>{photo.caption}</Text>
              <View style={styles.photoFooter}>
                <Text style={styles.info}>
                  <AntDesign name="message1" size={24} color={colors.orange} />{" "}
                  {photo.comments}
                </Text>
                <Text style={styles.info}>
                  <AntDesign name="like2" size={24} color={colors.orange} />{" "}
                  {photo.likes}
                </Text>
                <Text style={styles.info}>
                  <AntDesign name="enviromento" size={24} /> {photo.location}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={navigateToSettings}
        >
          <Text style={styles.text}>Налаштування профілю</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  backgroundImage: {
    flex: 1,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  profileContainer: {
    position: "absolute",
    bottom: 0,
    backgroundColor: colors.white,
    width: SCREEN_WIDTH,
    height: "75%",
    paddingHorizontal: 16,
    paddingTop: 92,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  avatarContainer: {
    position: "absolute",
    width: 120,
    height: 120,
    top: -60,
    left: SCREEN_WIDTH / 2 - 60,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: colors.light_gray,
    backgroundColor: colors.light_gray,
  },
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
  },
  title: {
    fontFamily: "Roboto-Bold",
    fontSize: 30,
    textAlign: "center",
    lineHeight: 35.16,
    letterSpacing: 0.01,
  },
  photoCard: {
    marginBottom: 16,
    borderRadius: 8,
    overflow: "hidden",
  },
  photo: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
  caption: {
    fontFamily: "Roboto-medium",
    fontSize: 16,
    marginVertical: 8,
  },
  photoFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  info: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
  text: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    textAlign: "center",
    color: colors.white,
  },
  settingsButton: {
    backgroundColor: colors.orange,
    paddingVertical: 12,
    borderRadius: 8,
    marginVertical: 16,
    alignItems: "center",
  },
});

export default ProfileScreen;
