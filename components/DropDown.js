import React from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import Images from "../Images";
import getLang from "../wallet/get-lang.js";
import { observer } from "mobx-react";
import PickerSetComponent from "./PickerSetNetwork";
import SelectDropdown from "react-native-select-dropdown";

export default observer(({ store, selectedItem, ...props }) => {

  return (
    <SelectDropdown
      data={props.data}
      onSelect={(selectedItem, index) => {
        console.log(selectedItem);
      }}
      buttonTextAfterSelection={(selectedItem, index) => {
        return selectedItem;
      }}
      rowTextForSelection={(item, index) => {
        return item;
      }}
      buttonTextStyle={style.buttonTextStyle}
      buttonStyle={style.buttonStyle}
      dropdownStyle={style.dropdownStyle}
      rowStyle={style.rowStyle}
      rowTextStyle={style.rowTextStyle}
      defaultButtonText={props.defaultButtonText || props.epoch}
      statusBarTranslucent={true}
    />
  );
});

const style = StyleSheet.create({
  buttonTextStyle: {
    fontSize: 13,
    color: "white",
    fontFamily: "Fontfabric-NexaRegular",
    textTransform: "uppercase",
    textAlign: "left",
    marginTop: 3,
    marginLeft: 10,
  },
  buttonStyle: {
    backgroundColor: "transparent",
    // backgroundColor: "red",
    height: '100%',
    width: "100%",
    paddingHorizontal: 0,
  },
  rowTextStyle: {
    fontFamily: "Fontfabric-NexaRegular",
    color: "white",
    fontSize: 14,
  },
  rowStyle: {
    borderBottomWidth: 2,
    borderBottomColor: Images.velasColor4,
  },
  dropdownStyle: {
    backgroundColor: "#161A3F",
    // marginLeft: -50,
    minWidth: 100
  },
});
