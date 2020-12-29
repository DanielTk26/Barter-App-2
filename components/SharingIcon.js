import * as React from "react";
import LottieView from "lottie-react-native";

export default class SharingIcon extends React.Component {
  render() {
    return (
      <LottieView
      style={{width:150,height:150,marginTop:10}}
        source={require("../assets/31821-share-everythin-moneybooks.json")}
      />
    );
  }
}
