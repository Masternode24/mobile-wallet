import React from "react";
import { StyleSheet, Dimensions, Text, ActivityIndicator, Platform, View } from "react-native";
import { Left, Body, Right, ListItem} from "native-base";
import Images from "../Images";
import { Avatar } from "../svg";
import { Badge } from "react-native-elements";
import IdentIcon from "./Identicon";
import { formatStakeAmount } from "../utils/format-value";
import getLang from "../wallet/get-lang.js";
import { observer } from "mobx-react";
import PickerSetComponent from "./PickerSetComponent";

export default observer(({ store, isStaked, ...props }) => {
//   const lang = getLang(store);

//   const typeBadge = (type) => {
//     switch (type) {
//       case "active":
//         return lang.badgeActive || "Active";
//       case "inactive":
//         return lang.badgeInactive || "Inactive";
//       default:
//         return null;
//     }
//   };

//   const badgeStatus = () => {
//     return (
//       <Badge
//         value={
//           <Text style={style.txtStyleBadge}>{typeBadge(props.typeBadge)}</Text>
//         }
//         badgeStyle={
//           props.typeBadge === "active" ? style.active : style.inactive
//         }
//       />
//     );
//   };
  return (
    <View style={{backgroundColor: '#1F2853', height: 140, flexDirection: "row", justifyContent: "center"}}>
        <View style={{flex: 0.3, backgroundColor: "red"}}><PickerSetComponent item='staking' icon='staking'/></View>
        <View style={{flex: 0.3, backgroundColor: "green"}}></View>
        <View style={{flex: 0.3, backgroundColor: "pink"}}></View>
    </View>
  );
});

const style = StyleSheet.create({
  styleTitle: {
    color: "#fff",
    fontSize: 13,
    fontFamily: "Fontfabric-NexaRegular",
  },
  styleBalance: {
    marginTop: 3,
    fontSize: 13,
    fontFamily: "Fontfabric-NexaRegular",
  },
  styleSubTitle: {
    color: "rgba(255, 255, 255, 0.3)",
    fontSize: 10,
    marginTop: 10,
    fontFamily: "Fontfabric-NexaRegular",
  },
  active: {
    backgroundColor: Images.colorGreen,
    borderColor: Images.colorGreen,
    paddingHorizontal: 3,
    height: 11,
    borderRadius: 10,
    marginTop: 5
  },
  inactive: {
    backgroundColor: "#8A8A8A",
    borderColor: "#8A8A8A",
    paddingHorizontal: 3,
    height: 11,
    borderRadius: 10,
    marginTop: 5
  },
  txtStyleBadge: {
    color: "#0B0B25",
    fontSize: 6,
    textTransform: "uppercase",
    fontFamily: "Fontfabric-NexaRegular",
  },
  listItemStyle: {
    marginHorizontal: 20,
    borderBottomWidth: 3,
    borderBottomColor: Images.velasColor4,
    height: 90,
  },
  rightSide: {
    paddingLeft: 10, paddingRight: 10
  },
  leftSide: {
    marginLeft: 10
  },
  bodyPadding: {
    paddingRight: 5
  }
});
