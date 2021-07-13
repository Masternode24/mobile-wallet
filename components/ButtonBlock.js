import React, { useEffect } from "react";
import { StyleSheet, Text, Platform, TouchableOpacity } from "react-native";
import { Button } from "native-base";
import Images from "../Images";

export default (props) => {
  const checkStyle = (type) => {
    switch (type) {
      case "STAKE_MORE":
        return { backgroundColor: Images.colorGreen };
      case "STAKE":
        return { backgroundColor: Images.colorGreen };
      case "OK":
        return { backgroundColor: Images.colorGreen };
      case "NEXT":
        return { backgroundColor: Images.colorGreen };
      case "CONFIRM":
        return { backgroundColor: Images.colorGreen };
      case "REQUEST_WITHDRAW":
        return { backgroundColor: Images.coral };
      case "WITHDRAW":
        return { backgroundColor: Images.coral };
      case "DISABLED":
        return { backgroundColor: Images.colorGray };
      default:
        return null;
    }
  };

  const checkTextStyle = (type) => {
    switch (type) {
      case "REQUEST_WITHDRAW":
        return { color: "#fff" };
      case "WITHDRAW":
        return { color: "#fff" };
        case "DISABLED":
          return { color: 'gray' }
      default:
        return null;
    }
  };
  return (
    <Button
      block
      style={[style.btnStyle, checkStyle(props.type)]}
      onPress={props.onPress}
    >
      <Text style={[style.textBtn, checkTextStyle(props.type)]}>
        {props.text}
      </Text>
    </Button>
  );
};

const style = StyleSheet.create({
  textBtn: {
    fontSize: 12,
    color: Images.velasColor4,
    fontFamily: "Fontfabric-NexaBold",
    fontWeight: Platform.OS === "ios" ? "bold" : null,
    textTransform: "uppercase",
  },
  btnStyle: {
    marginVertical: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 0,
    marginHorizontal: 20,
    backgroundColor: "#fff",
  },
});
