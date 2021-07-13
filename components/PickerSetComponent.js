import React from "react";
import RNPickerSelect from "react-native-picker-select";
import { Icon } from "native-base";
import { View, Platform, StyleSheet } from "react-native";
import Images from "../Images";
import { Badge } from "react-native-elements";
import { Avatar } from 'react-native-elements'
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
  const list = [
    {
      name: 'Staking',
      avatar_url: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FFile%3AFlat_tick_icon.svg&psig=AOvVaw3KPTXXwGt8PE5-i7_0KK9Q&ust=1626272969035000&source=images&cd=vfe&ved=0CAoQjRxqFwoTCNiM3Yah4PECFQAAAAAdAAAAABAD',
      subtitle: 'Velas'
    }
  ]
  return (
    // <Badge
    //   value={
    //     <>
    //       <RNPickerSelect
    //         placeholder={{}}
    //         onValueChange={(value) => {
    //           onValueChangeValue(value);
    //         }}
    //         useNativeAndroidPickerStyle={false}
    //         // items={items}
    //         items={checkItems(props.item)}
    //         style={{
    //           inputIOS: style.inputStyle,
    //           inputAndroid: style.inputStyle,
    //         }}
    //       />
    //       <Icon name="ios-arrow-down" style={style.icon} />
    //     </>
    //   }
    //   badgeStyle={style.active}
    // />
    <View>
  {
    list.map((l, i) => (
      // <ListItem key={i} bottomDivider>
      //   <Avatar source={{uri: l.avatar_url}} />
      //   <ListItem.Content>
      //     <ListItem.Title>{l.name}</ListItem.Title>
      //     <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
      //   </ListItem.Content>
      // </ListItem>
      <ListItem key={i} noBorder underlayColor={Images.velasColor4} avatar onPress={() => console.warn('test')}>
        <Left>
        <Avatar source={{uri: l.avatar_url}} />
        </Left>
        <Body>
          <Text >
          {l.name}
          </Text>
          <Text note >
          {l.subtitle}
          </Text>
        </Body>
        <Right />
      </ListItem>
    ))
  }
</View>
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
  styleTxtStep: {
    color: "#fff",
    fontFamily: "Fontfabric-NexaRegular",
    fontSize: 17,
  },
  badge: {
    backgroundColor: "rgba(255, 255, 255, 0.20)",
    borderColor: "rgba(255, 255, 255, 0.40)",
    borderWidth: 1,
  },
  row: {
    flexDirection: "row",
    marginTop: 35,
    marginLeft: 20,
  },
  title: {
    color: "#fff",
    fontFamily: "Fontfabric-NexaRegular",
    fontSize: 20,
    textAlign: "center",
  },
});
