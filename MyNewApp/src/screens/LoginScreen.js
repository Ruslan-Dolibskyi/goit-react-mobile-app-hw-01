import { useState } from "react";
import {
  View,
  Text,
  Image,
  Platform,
  Keyboard,
  Pressable,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";

import { colors } from "../../styles/global";
import Input from "../components/Input";
import Button from "../components/Button";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

const LoginScreen = () => {
  const [user, setUser] = useState({
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

  const onLogin = async () => {
    console.log("login", user);
  };

  const onSignUp = () => {
    console.log("signUp");
  };

  const showButton = (
    <TouchableOpacity onPress={togglePasswordVisibility}>
      <Text style={[styles.baseText, styles.passwordButtonText]}>
        {user.isPasswordVisible ? "Показати" : "Сховати"}
      </Text>
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
          <Text style={styles.title}>Увійти</Text>

          <View style={[styles.innerContainer, styles.inputContainer]}>
            <Input
              value={user.email}
              autofocus={true}
              placeholder="Адреса електронної пошти"
              onTextChange={(value) => handleInputChange("email", value)}
            />

            <Input
              value={user.password}
              placeholder="Пароль"
              rightButton={showButton}
              outerStyles={styles.passwordButton}
              onTextChange={(value) => handleInputChange("password", value)}
              secureTextEntry={user.isPasswordVisible}
            />
          </View>

          <View style={[styles.innerContainer, styles.buttonContainer]}>
            <Button onPress={onLogin}>
              <Text style={[styles.baseText, styles.loginButtonText]}>
                Увійти
              </Text>
            </Button>

            <View style={styles.signUpContainer}>
              <Text style={[styles.baseText, styles.passwordButtonText]}>
                Немає акаунту?
                <TouchableWithoutFeedback onPress={onSignUp}>
                  <Text style={styles.signUpText}> Зареєструватися</Text>
                </TouchableWithoutFeedback>
              </Text>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Pressable>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
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
    height: "60%",
    backgroundColor: colors.white,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    paddingHorizontal: 16,
    paddingTop: 32,
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
