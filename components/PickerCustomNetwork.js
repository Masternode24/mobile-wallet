import React from "react";
import { Input, Item, Text } from "native-base";
import getLang from "../wallet/get-lang.js";
import { StyleSheet } from "react-native";

const InputComponent = ({ onChange, value, onBlur, placeholder }) => {

  return (
    <Item style={{ borderBottomColor: "transparent" }}>
      <Input
        placeholder={placeholder}
        placeholderTextColor={"rgba(255,255,255,0.60)"}
        onChangeText={onChange}
        value={value}
        onBlur={() => onBlur}
        returnKeyType="done"
        keyboardType="default"
        style={style.inputStyle}
        selectionColor={"#fff"}
        keyboardAppearance="dark"
      />
    </Item>
  );
};

export default ({ store }) => {
  const lang = getLang(store);

  const handleChange = (text) => {
    store.current.networkCustom = text;
  };
  const onBlur = (text) => {
    store.current.networkCustom = text;
  };
  store.current.networkCustom;
  console.log("store.current.networkCustom", store.current.networkCustom);
  return (
    <InputComponent
      onChange={(text) => handleChange(text)}
      value={store.current.networkCustom}
      placeholder={lang.enterCustom || "Enter custom network"}
      onBlur={onBlur}
    />
  );
};

const style = StyleSheet.create({
  inputStyle: {
    fontSize: 17,
    color: "#fff",
    fontFamily: "Fontfabric-NexaRegular",
    marginBottom: 5,
    maxWidth: '90%',
  }
})
