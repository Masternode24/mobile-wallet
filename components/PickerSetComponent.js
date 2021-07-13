import React from "react";
import RNPickerSelect from "react-native-picker-select";
import { Ionicons } from "@expo/vector-icons";
import { Icon } from "native-base";
import { View, Platform, StyleSheet } from "react-native";
import Images from "../Images";
import { Badge } from "react-native-elements";

export default ({ store, ...props }) => {
  const onValueChangeValue = async (value) => {
    store.staking = value;
    // localStorage.setItem("staking", value);

    await console.log("store.staking", store.staking.selected);
  };
  const checkItems = (item) => {
    switch (item) {
      case "staking":
        return staking;
      case "networks":
        return networks;
      default:
        return null;
    }
  };
  const staking = [
    {
      label: "Velas Staking",
      value: "Velas",
    },
    {
      label: "Solana Staking",
      value: "Solana",
    },
  ];
  const networks = [
    {
      label: "Mainnet",
      value: "Mainnet",
    },
    {
      label: "TestNet",
      value: "TestNet",
    },
  ];

  return (
    <Badge
      value={
        <>
          <RNPickerSelect
            placeholder={{}}
            onValueChange={(value) => {
              onValueChangeValue(value);
            }}
            useNativeAndroidPickerStyle={false}
            // items={items}
            items={checkItems(props.item)}
            style={{
              inputIOS: style.inputStyle,
              inputAndroid: style.inputStyle,
            }}
          />
          <Icon name="ios-arrow-down" style={style.icon} />
        </>
      }
      badgeStyle={style.active}
    />
  );
};

const style = StyleSheet.create({
  viewLabel: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: '#1F2853',
  },
  inputStyle: {
    color: "#fff",
    fontFamily: "Fontfabric-NexaBold",
    fontSize: 10,
    fontWeight: Platform.OS === "ios" ? "bold" : null,
    // width: "160%",
  },
  icon: {
    color: "white",
    // marginTop: 3,
    marginLeft: 5,
    fontSize: 12,
  },
  active: {
    backgroundColor: "#1F2853",
    borderColor: "#1F2853",
    paddingHorizontal: 5,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  active1: {
    backgroundColor: "red",
    borderColor: "red",
    paddingHorizontal: 5,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
