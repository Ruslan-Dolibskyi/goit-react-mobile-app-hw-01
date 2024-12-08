import { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Keyboard,
  Pressable,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import { colors } from "../../styles/global";
import Input from "../components/Input";
import Button from "../components/Button";
import { Ionicons } from "@expo/vector-icons";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

const RegistrationScreen = ({ navigation }) => {
  // Додано параметр navigation
  const [user, setUser] = useState({
    login: "",
    email: "",
    password: "",
    isPasswordVisible: true,
  });

  const handleInputChange = (field, value) => {
    setUser((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setUser((prev) => ({
      ...prev,
      isPasswordVisible: !prev.isPasswordVisible,
    }));
  };

  const onRegister = async () => {
    console.log("register", user);
  };

  const onSignIn = () => {
    navigation.navigate("LoginScreen"); // Змінено для переходу до LoginScreen
  };

  const pickImage = async () => {};

  const photoButton = (
    <TouchableOpacity style={styles.photoButton} onPress={pickImage}>
      <Ionicons name="add-circle-outline" size={32} color={colors.blue} />
    </TouchableOpacity>
  );

  return (
    <Pressable style={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>
      <Image
        source={require("../../assets/background.png")}
        resizeMode="cover"
        style={styles.image}
      />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <View style={styles.formContainer}>
          <View style={styles.photoContainer}></View>
          <Text style={styles.title}>Реєстрація</Text>

          <View style={[styles.innerContainer, styles.inputContainer]}>
            <Input
              value={user.login}
              placeholder="Логін"
              onTextChange={(value) => handleInputChange("login", value)}
            />
            <Input
              value={user.email}
              placeholder="Адреса електронної пошти"
              onTextChange={(value) => handleInputChange("email", value)}
            />
            <Input
              value={user.password}
              placeholder="Пароль"
              rightButton={
                <TouchableOpacity onPress={togglePasswordVisibility}>
                  <Text style={[styles.baseText, styles.passwordButtonText]}>
                    {user.isPasswordVisible ? "Показати" : "Сховати"}
                  </Text>
                </TouchableOpacity>
              }
              outerStyles={styles.passwordButton}
              onTextChange={(value) => handleInputChange("password", value)}
              secureTextEntry={user.isPasswordVisible}
            />
          </View>

          <View style={[styles.innerContainer, styles.buttonContainer]}>
            <Button onPress={onRegister}>
              <Text style={[styles.baseText, styles.loginButtonText]}>
                Зареєструватися
              </Text>
            </Button>
            <View style={styles.signUpContainer}>
              <Text style={[styles.baseText, styles.passwordButtonText]}>
                Вже є акаунт?
                <TouchableWithoutFeedback onPress={onSignIn}>
                  <Text style={styles.signUpText}> Увійти</Text>
                </TouchableWithoutFeedback>
              </Text>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Pressable>
  );
};

export default RegistrationScreen;

const styles = StyleSheet.create({
  photoContainer: {
    position: "absolute",
    top: -60,
    alignSelf: "center",
    zIndex: 10,
  },
  photoButton: {
    width: 120,
    height: 120,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.light_gray,
  },
  photo: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  innerContainer: {
    gap: 16,
  },
  inputContainer: {
    marginTop: 32,
  },
  buttonContainer: {
    marginTop: 42,
  },
  image: {
    position: "absolute",
    top: 0,
    bottom: 0,
    height: "100%",
    width: "100%",
  },
  formContainer: {
    width: SCREEN_WIDTH,
    height: "67%",
    backgroundColor: colors.white,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    paddingHorizontal: 16,
    paddingTop: 92,
  },
  title: {
    fontSize: 30,
    fontWeight: "500",
    lineHeight: 36,
    textAlign: "center",
  },
  baseText: {
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 18,
  },
  loginButtonText: {
    color: colors.white,
    textAlign: "center",
  },
  passwordButtonText: {
    color: colors.blue,
  },
  passwordButton: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  signUpContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  signUpText: {
    textDecorationLine: "underline",
  },
});
