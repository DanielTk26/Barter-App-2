import * as React from "react";
import {StyleSheet,View,Text,TextInput,TouchableOpacity,Keyboard,KeyboardAvoidingView,Platform,Alert,TouchableWithoutFeedback,ScrollView, Modal} from "react-native";
import firebase from "firebase";
import db from "../config";
import SharingIcon from "../components/SharingIcon";

export default class SignupLoginScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      isVisible: false,
      firstName: "",
      lastName: "",
      mobileNumber: "",
      address: "",
      confirmPassword: "",
    };
  }

  userLogin = (username, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(username, password)
      .then(() => {
        return Alert.alert("Successfully Login");
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        return Alert.alert(errorMessage);
      });
  };

  userSignUp = (username, password, confirmPassword) => {
    if (password !== confirmPassword) {
      return Alert.alert("password doesn't match\nCheck your password.");
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(username, password)
        .then((response) => {
          db.collection("users").add({
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            mobile_number: this.state.mobileNumber,
            username: this.state.username,
            address: this.state.address,
          });
          return Alert.alert("User Added Successfully", "", [
            { text: "OK", onPress: () => this.setState({ isVisible: false }) },
          ]);
        })
        .catch(function (error) {
        
          var errorCode = error.code;
          var errorMessage = error.message;
          return Alert.alert(errorMessage);
        });
    }
  };

  showModal = () => (
    <Modal
      animationType="fade"
      transparent={true}
      visible={this.state.isVisible}
    >
      <View style={styles.modalContainer}>
        <ScrollView style={{ width: "100%" }}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  justifyContent: "center",
                  alignSelf: "center",
                  fontSize: 30,
                  color: "black",
                  margin: 50,
                }}
              >
              Sign Up
              </Text>
              
              <TextInput
                style={styles.formTextInput}
                placeholder={"First Name"}
                maxLength={8}
                onChangeText={(text) => {
                  this.setState({
                    firstName: text,
                  });
                }}
              />

              <TextInput
                style={styles.formTextInput}
                placeholder={"Last Name"}
                maxLength={8}
                onChangeText={(text) => {
                  this.setState({
                    lastName: text,
                  });
                }}
              />

              <TextInput
                style={styles.formTextInput}
                placeholder={"Mobile Number"}
                maxLength={10}
                keyboardType={"numeric"}
                onChangeText={(text) => {
                  this.setState({
                    mobileNumber: text,
                  });
                }}
              />
              
              <TextInput
                style={styles.formTextInput}
                placeholder={"Address"}
                multiline={true}
                onChangeText={(text) => {
                  this.setState({
                    address: text,
                  });
                }}
              />
              
              <TextInput
                style={styles.formTextInput}
                placeholder={"Your username"}
                keyboardType={"email-address"}
                onChangeText={(text) => {
                  this.setState({
                    username: text,
                  });
                }}
              />
              
              <TextInput
                style={styles.formTextInput}
                placeholder={"Password"}
                secureTextEntry={true}
                onChangeText={(text) => {
                  this.setState({
                    password: text,
                  });
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder={"Confrim Password"}
                secureTextEntry={true}
                onChangeText={(text) => {
                  this.setState({
                    confirmPassword: text,
                  });
                }}
              />
              <View style={styles.modalBackButton}>
                <TouchableOpacity
                  style={styles.signButton}
                  onPress={() =>
                    this.userSignUp(
                      this.state.username,
                      this.state.password,
                      this.state.confirmPassword
                    )
                  }
                >
                  <Text style={styles.signButtonText}>Sign Up</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.modalBackButton}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => this.setState({ isVisible: false })}
                >
                  <Text style={{ color: "black" }}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </ScrollView>
      </View>
    </Modal>
  );

  render() {
    return (
      <View style={styles.container}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          {this.showModal()}
        </View>
        <View style={styles.profileContainer}>
          <SharingIcon />
          <Text style={styles.title}>Barter App</Text>
          <Text style={{ color: "#ff8a65" }}> Trade your stuff </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Text
            style={{
              color: "black",
              fontSize: 18,
              fontWeight: "bold",
              marginLeft: 55,
            }}
          >
            USERNAME
          </Text>
          
          <View style={{ alignItems: "center" }}>
            <TextInput
              style={styles.loginBox}
              keyboardType={"email-address"}
              onChangeText={(text) => {
                this.setState({
                  username: text,
                });
              }}
            />
          </View>
          
          <Text
            style={{
              color: "black",
              fontSize: 18,
              fontWeight: "bold",
              marginLeft: 55,
            }}
          >
            PASSWORD
          </Text>
          
          <View style={{ alignItems: "center" }}>
            <TextInput
              style={styles.loginBox}
              secureTextEntry={true}
              onChangeText={(text) => {
                this.setState({
                  password: text,
                });
              }}
            />
          </View>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              style={[styles.button, { marginBottom: 10 }]}
              onPress={() => {
                this.userLogin(this.state.username, this.state.password);
              }}
            >
              <Text
                style={{ color: "blue", fontSize: 18, fontWeight: "bold" }}
              >
                LOGIN
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.setState({ isVisible: true });
              }}
            >
              <Text
                style={{ color: "blue", fontSize: 18, fontWeight: "bold" }}
              >
                SIGN UP
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  profileContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 60,
    fontWeight: "300",
    color: "#ff9800",
  },
  loginBox: {
    width: 300,
    height: 35,
    borderBottomWidth: 1.5,
    borderColor: "grey",
    fontSize: 20,
    marginBottom: 20,
    marginTop: 5,
  },
  button: {
    width: "75%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    backgroundColor: "red",
    elevation: 10,
  },
  buttonContainer: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    marginRight: 30,
    marginLeft: 30,
    marginTop: 80,
    marginBottom: 80,
  },
  formTextInput: {
    width: "75%",
    height: 35,
    alignSelf: "center",
    borderColor: "grey",
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 20,
    padding: 10,
  },
  signButton: {
    width: 200,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 30,
  },
  signButtonText: {
    color: "black",
    fontSize: 15,
    fontWeight: "bold",
  },
  cancelButton: {
    width: 200,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },
});