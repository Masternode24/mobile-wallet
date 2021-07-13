import React from "react";
import RNPickerSelect from "react-native-picker-select";
import { View, Platform, StyleSheet } from "react-native";
import Images from "../Images";
import { Badge } from "react-native-elements";
import { Avatar } from "react-native-elements";
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Thumbnail,
  Text,
  Left,
  Body,
  Right,
  Button,
} from "native-base";
import { StakingHeader, NetworkHeader, EpochHeader } from "../svg/index";

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
      case "network":
        return network;
      default:
        return null;
    }
  };
  const checkIcon = (icon) => {
    switch (icon) {
      case "staking":
        return <StakingHeader/>;
      case "network":
        return <NetworkHeader/>;
      case "epoch":
        return <EpochHeader/>;
      default:
        return null;
    }
  };
  const staking = [
    {
      label: "Velas",
      value: "Velas",
    },
    {
      label: "Solana",
      value: "Solana",
    },
  ];
  const network = [
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
    <View>
        <ListItem
          noBorder
          underlayColor={Images.velasColor4}
          avatar
          onPress={() => console.warn("test")}
          style={{marginLeft: 10}}
        >
          <Left>
           {checkIcon(props.icon)}
          </Left>
          <Body>
            {/* <Text style={{fontSize: 7, textTransform: "uppercase", fontFamily: "Fontfabric-NexaRegular", color: "#fff"}}>{checkItems(props.item)}</Text> */}
            <RNPickerSelect
              placeholder={{}}
              onValueChange={(value) => {
                onValueChangeValue(value);
              }}
              useNativeAndroidPickerStyle={false}
              items={checkItems(props.item)}
              style={{
                inputIOS: style.inputStyle,
                inputAndroid: style.inputStyle,
              }}
            />
          </Body>
          <Right />
        </ListItem>
    </View>
  );
};

const style = StyleSheet.create({
  inputStyle: {
    color: "#fff",
    fontFamily: "Fontfabric-NexaBold",
    fontSize: 10,
    fontWeight: Platform.OS === "ios" ? "bold" : null,
    textTransform: "uppercase",
  },
});
