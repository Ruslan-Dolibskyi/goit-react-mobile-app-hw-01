import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SimpleLineIcons, Ionicons } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import { colors } from "../styles/global";
import Input from "../components/Input";
import Button from "../components/Button";
import Camera from "../components/Camera";

const InitialState = {
  title: "",
  locality: "",
};

const CreatePostsScreen = ({ navigation }) => {
  const [location, setLocation] = useState(InitialState);
  const [photoUrl, setPhotoUrl] = useState("");
  const [geoLocation, setGeoLocation] = useState(null);
  const camera = useRef(null);
  const [facing, setFacing] = useState("back");
  const isEnabled = location.title && location.locality;

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      };

      setGeoLocation(coords);
    })();
  }, []);

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  const handleTakePicture = async () => {
    if (camera.current) {
      const picture = await camera.current.takePictureAsync();
      if (picture?.uri) {
        setPhotoUrl(picture.uri);
        await MediaLibrary.createAssetAsync(picture.uri);
      }
    }
  };

  const handleSubmit = () => {
    if (!isEnabled) {
      alert("Please fill in all fields.");
      return;
    }
    const post = {
      pictureUrl: photoUrl,
      pictureName: location.title,
      comments: [],
      locality: location.locality,
      geoLocation,
      createdAt: new Date().toISOString(),
    };
    navigation.navigate("Posts", { post });
    setLocation(InitialState);
    setPhotoUrl("");
  };

  const onClearData = () => {
    setLocation(InitialState);
    setPhotoUrl("");
  };

  const localityIcon = (
    <SimpleLineIcons
      name="location-pin"
      size={24}
      color={colors.gray}
      style={styles.iconLocality}
    />
  );

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.container}>
          <View style={styles.cameraWrapper}>
            <Camera
              {...{ toggleCameraFacing, facing, camera, handleTakePicture }}
            />
            <Text style={styles.cameraWrapperCopy}>
              {photoUrl ? "Редагувати фото" : "Завантажте фото"}
            </Text>
          </View>
          <View style={{ width: "100%", gap: 16 }}>
            <Input
              value={location.title}
              placeholder="Назва..."
              onTextChange={(title) => setLocation({ ...location, title })}
              outerStyles={styles.inputOuterStyles}
            />
            <Input
              value={location.locality}
              placeholder="Місцевість..."
              leftButton={localityIcon}
              onTextChange={(locality) =>
                setLocation({ ...location, locality })
              }
              outerStyles={[styles.inputOuterStyles, { paddingLeft: 28 }]}
            />
          </View>
          <View style={{ width: "100%", alignItems: "center", gap: 16 }}>
            <Button onPress={handleSubmit} disabled={!isEnabled}>
              <Text
                style={[
                  styles.text,
                  { color: isEnabled ? colors.white : colors.gray },
                ]}
              >
                Опубліковати
              </Text>
            </Button>
            {photoUrl || location.title || location.locality ? (
              <Button buttonStyle={styles.deleteBtn} onPress={onClearData}>
                <Ionicons name="trash" color={colors.gray} size={24} />
              </Button>
            ) : null}
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 32,
    alignItems: "center",
    backgroundColor: colors.white,
    gap: 32,
  },
  cameraWrapper: {
    gap: 8,
  },
  cameraWrapperCopy: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 18.75,
    textAlign: "left",
    color: colors.gray,
  },
  text: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 18.75,
    textAlign: "center",
  },
  iconLocality: {
    position: "absolute",
    width: 24,
    height: 24,
    top: 50 / 2 - 12,
    left: 0,
  },
  inputOuterStyles: {
    paddingLeft: 0,
    borderColor: "transparent",
    backgroundColor: colors.white,
    borderBottomColor: colors.border_gray,
    borderRadius: 0,
  },
  deleteBtn: {
    marginTop: 120,
    paddingVertical: 0,
    paddingHorizontal: 0,
    backgroundColor: colors.light_gray,
    borderRadius: 20,
    width: 70,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CreatePostsScreen;
