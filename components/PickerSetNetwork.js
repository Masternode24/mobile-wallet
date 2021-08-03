import React from "react";
import RNPickerSelect from "react-native-picker-select";
import { Ionicons } from '@expo/vector-icons';


export default ({ store }) => {
  const onValueChangeValue = async value => {
    store.network = value;
  };
  const networkItems = [
    {
      label: "Mainnet",
      value: "mainNet"
    },
    {
      label: "TestNet",
      value: "testNet"
    },
  ];

  return (
    <RNPickerSelect
      placeholder={{}}
      onValueChange={value => {
        onValueChangeValue(value);
      }}
      useNativeAndroidPickerStyle={false}
      value={store.network}
      items={networkItems}
      style={{
        inputIOS: {
          color: "#fff",
          fontSize: 17,
          fontFamily: "Fontfabric-NexaRegular"
        },
        inputAndroid: {
          color: "#fff",
          fontSize: 17,
          fontFamily: "Fontfabric-NexaRegular"
        }
      }}
    />
  );
};
