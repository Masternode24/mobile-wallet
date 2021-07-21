import React, { useState } from "react";
import { StyleSheet, Image, View, Alert } from "react-native";
import { Text, Input, Item, Label, Button } from "native-base";
import Images from "../Images";
import { Badge } from "react-native-elements";
import InputAmount from "./InputAmount";

export default ({isWithdraw, ...props}) => {
  
  return (
    <>
      <Label style={style.labelTextTop}>{props.title}</Label>
      <Item style={style.styleItem}>
        <InputAmount 
          placeholder="0.00"
          placeholderTextColor="rgba(255,255,255,0.60)"
          value={props.value}
          onChangeText={props.onChange}
          style={style.input}
          returnKeyType="done"
          selectionColor={"#fff"}
          keyboardAppearance="dark"
          keyboardType="numeric"
          maxLength={14}
      />
        <Badge
          onPress={props.onPressMax}
          value={<Text style={style.txtBtnSendMax}>{props.btnTxt}</Text>}
          badgeStyle={style.btnSendMax}
        />
      </Item>

      <View style={style.containerBottomInput}>
          <Text style={style.labelTextBottom}>
            {props.sub_text + ":"} {isWithdraw ? props.total_stake : props.available_balance}{" "}<Text style={style.labelTokenStyle}>{props.token}</Text>
          </Text>
      </View>
    </>
  );
};

const style = StyleSheet.create({
  containerBottomInput: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    flexDirection: "row",
  },
  subContainerInput: {
    flexDirection: "row",
    alignItems: "center",
  },
  btnSendMax: {
    backgroundColor: Images.color4,
    borderColor: Images.color4,
    paddingHorizontal: 10,
    height: 25,
    marginHorizontal: 10,
    borderRadius: 10
  },
  txtBtnSendMax: {
    // color: "#9d41eb",
    textDecorationLine: "underline",
    color: "white",
    fontSize: 12,
    alignItems: "center",
    fontFamily: "Fontfabric-NexaRegular",
  },
  labelTextBottom: {
    color: "#fff",
    fontFamily: "Fontfabric-NexaRegular",
    fontSize: 16,
  },
  labelTokenStyle: {
    color: "#fff",
    fontFamily: "Fontfabric-NexaRegular",
    fontSize: 16,
    textTransform: "uppercase",
  },
  tokenStyle: {
    color: "#fff",
    fontFamily: "Fontfabric-NexaRegular",
    fontSize: 12,
    marginRight: 10,
    textTransform: "uppercase",
  },
  labelTextTop: {
    color: "#fff",
    fontFamily: "Fontfabric-NexaRegular",
    fontSize: 16,
    margin: 20,
  },
  labelLogo: {
    height: 10,
    width: 10,
    marginHorizontal: 5,
  },
  styleItem: {
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: "#12173E",
    borderBottomColor: "transparent",
    paddingLeft: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    color: "#fff",
    fontFamily: "Fontfabric-NexaRegular",
    height: 50,
    // width: '70%'
    flex: 1
  },
});
