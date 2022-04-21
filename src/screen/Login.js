import React, { useState } from "react";
import { SafeAreaView, View, Text, TextInput, Pressable } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../consts/color";
import STYLES from "../style/index";

const Login = ({ navigation }) => {
  const [user, setuser] = useState({
    email: "",
    password: "",
  });

  const submit = () => {
    const { email, password } = user;
    if (email && password) {
      postData()
    }else{
      alert("Please enter your email and password")
    }
  };

  const postData = () => {
    const { email, password } = user;
    fetch("http://localhost:4001/user-login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((resjson) => {
        console.log("post:", resjson);
        // setuser("");
        alert(JSON.stringify(resjson.message))
      navigation.navigate("Data")

      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <SafeAreaView
      style={{ paddingHorizontal: 20, flex: 1, backgroundColor: COLORS.white }}
    >
      <View showsVerticalScrollIndicator={false}>
        <View style={{ flexDirection: "row", marginTop: 40 }}>
          <Text
            style={{ fontWeight: "bold", fontSize: 22, color: COLORS.dark }}
          >
            Test
          </Text>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 22,
              color: COLORS.secondary,
            }}
          >
            Yantra
          </Text>
        </View>

        <View style={{ marginTop: 70 }}>
          <Text
            style={{ fontSize: 27, fontWeight: "bold", color: COLORS.dark }}
          >
            Welcome Back
          </Text>
          <Text
            style={{ fontSize: 19, fontWeight: "bold", color: COLORS.light }}
          >
            Sign in to continue
          </Text>
        </View>

        <View style={{ marginTop: 20 }}>
          <View style={STYLES.inputContainer}>
            <Icon
              name="mail-outline"
              color={COLORS.light}
              size={20}
              style={STYLES.inputIcon}
            />
            <TextInput
              placeholder="Email"
              style={STYLES.input}
              onChangeText={(text) => {
                setuser({ ...user, email: text });
              }}
            />
          </View>
          <View style={STYLES.inputContainer}>
            <Icon
              name="lock-outline"
              color={COLORS.light}
              size={20}
              style={STYLES.inputIcon}
            />
            <TextInput
              placeholder="Password"
              style={STYLES.input}
              secureTextEntry
              onChangeText={(text) => {
                setuser({ ...user, password: text });
              }}
            />
          </View>

          <Pressable style={STYLES.btnPrimary} onPress={submit}>
            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}>
              Sign In
            </Text>
          </Pressable>

          <View
            style={{
              marginVertical: 20,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View style={STYLES.line}></View>
            <Text style={{ marginHorizontal: 5, fontWeight: "bold" }}>OR</Text>
            <View style={STYLES.line}></View>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "center",
            marginTop: 40,
            marginBottom: 20,
          }}
        >
          <Text style={{ color: COLORS.light, fontWeight: "bold" }}>
            Don`t have an account ?
          </Text>
          <Pressable onPress={() => navigation.navigate("Register")}>
            <Text style={{ color: COLORS.pink, fontWeight: "bold" }}>
              Sign up
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
