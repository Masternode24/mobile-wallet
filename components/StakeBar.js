import React, { useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import getLang from "../wallet/get-lang.js";
import { observer } from "mobx-react";
import { StakingHeader, NetworkHeader, EpochHeader } from "../svg/index";
import DropDown from "./DropDown";
import { Tooltip } from "react-native-elements";

export default observer(({ store, isStaked, selectedItem, ...props }) => {
  const stakingData = ["Velas", "Solana"];
  const networkData = ["TestNet", "MainNet"];
  const currentBlock = 442424;
  const time = "00:40:22";
  const epoch = 444;

  const EpochValue = () => {
    const tooltipRef = useRef(null);
    const EpochDetail = () => {
      return (
        <View>
          <View style={style.tooltipRowStyle}>
            <Text style={style.tooltipRowText}>Current block</Text>
            <Text style={[style.tooltipRowText, {fontFamily: "Fontfabric-NexaBold"}]}> #{currentBlock}</Text>
          </View>
          <View style={style.tooltipRowStyle}>
            <Text style={style.tooltipRowText}>Time until end</Text>
            <Text style={[style.tooltipRowText, {fontFamily: "Fontfabric-NexaBold"}]}> {time}</Text>
          </View>
        </View>
      )
    };
    return (
      <Tooltip
        ref={tooltipRef}
        withOverlay={false}
        containerStyle={style.tooltipContainerStyle}
        pointerColor="#27282C"
        withPointer={false}
        popover={<EpochDetail />}
      >
        <Text style={style.epochText}>{epoch}</Text>
      </Tooltip>
    );
  };
  return (
    <View style={style.mainRow}>
      <View style={style.partRow}>
        <View style={style.iconView}>
          <StakingHeader />
        </View>
        <View style={style.columnView}>
          <Text style={style.subtitleText}>Staking</Text>
          <DropDown data={stakingData} defaultButtonText={stakingData[0]} />
        </View>
      </View>

      <View style={style.partRow}>
        <View style={style.iconView}>
          <NetworkHeader />
        </View>
        <View style={style.columnView}>
          <Text style={style.subtitleText}>Network</Text>
          <DropDown data={networkData} defaultButtonText={networkData[0]} />
        </View>
      </View>

      <View style={style.partRow}>
        <View style={style.iconView}>
          <EpochHeader />
        </View>
        <View style={style.columnView}>
          <Text style={[style.subtitleText, {top: 0}]}>Epoch</Text>
          <EpochValue />
        </View>
      </View>
    </View>
  );
});

const style = StyleSheet.create({
  mainRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 45,
    backgroundColor: "#1F2853",
    alignItems: "center",
    // borderBottomWidth: 2,
    // borderBottomColor: Images.velasColor4
  },
  partRow: {
    width: "30%",
    flexDirection: "row",
  },
  iconView: {
    width: "30%",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  columnView: {
    width: "70%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  subtitleText: {
    color: "rgba(255, 255, 255, 0.3)",
    marginLeft: 10,
    textTransform: "uppercase",
    fontSize: 10,
    top: 15,
    // zIndex: 9999
  },
  epochText: {
    fontSize: 13,
    color: "white",
    fontFamily: "Fontfabric-NexaRegular",
    marginLeft: 10,
    marginTop: 3,
  },
  tooltipContainerStyle: {
    height: 50,
    width: 'auto',
    marginTop: 15,
    backgroundColor: "#27282C",
    borderRadius: 0,
  },
  tooltipRowStyle: {
    flexDirection: "row", marginHorizontal: 10
  },
  tooltipRowText: {
    color: "white",  fontFamily: "Fontfabric-NexaRegular", fontSize: 14 
  }
});
