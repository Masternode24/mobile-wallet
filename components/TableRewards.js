import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  Linking,
  Alert,
} from "react-native";
import Images from "../Images";
import getLang from "../wallet/get-lang.js";
import BN from "bn.js";
import { observer } from "mobx-react";
import { formatReward, formatStakeAmount } from "../utils/format-value";

const GRAY_COLOR = "rgba(255, 255, 255, 0.18)";
const URL = "https://support.velas.com/hc/en-150/articles/360014994819-F-A-Q";
export default observer(({ store }) => {
  const lang = getLang(store);
  const { stakingStore } = store;

  const rewards = stakingStore.getRewards();
  const columns = [
    lang.epoch || "# Epoch",
    lang.reward || "Reward",
    `${lang.apr || "APR"}, %`,
  ];

  const onPressLink = () => {
    Linking.openURL(URL);
  };

  const tableHeader = () => (
    <View style={styles.tableHeader}>
      {columns.map((column, index) => {
        {
          return (
            <View key={index} style={styles.columnHeader}>
              <Text style={styles.columnHeaderTxt}>{column}</Text>
            </View>
          );
        }
      })}
    </View>
  );
  const ListEmpty = () => {
    return (
      <View
        style={{
          marginTop: "10%",
        }}
      >
        <Text style={styles.emptyMessageStyle}>
          {lang.rewardsEmptyTitle ||
            "We did not find any reward records for this validator"}{'.'}
        </Text>
        <Text style={{ ...styles.emptyMessageStyle, marginTop: 40 }}>
          {lang.rewardsEmptyText || "Read about how rewards are"}{' '}
          <Text
            style={{
              color: Images.colorGreen,
              textDecorationLine: "underline",
            }}
            onPress={onPressLink}
          >
            {lang.rewardsEmptyLink || "getting credited"}{'.'}
          </Text>
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        // data={epoch.slice(0, 10)}
        data={rewards.rewards}
        style={{
          width: "100%",
          paddingHorizontal: 20,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
        ListEmptyComponent={() =>
          !rewards.rewards.length ? <ListEmpty /> : null
        }
        keyExtractor={(item, index) => index + ""}
        ListHeaderComponent={!rewards.rewards.length ? false : tableHeader}
        //stickyHeaderIndices={[0]} - this causes Androids to crash
        renderItem={({ item, index }) => {
          return (
            <View style={styles.tableRow}>
              <Text
                style={{
                  ...styles.columnRowTxt,
                  backgroundColor: index % 2 == 1 ? "#252847" : "#161A3F",
                }}
              >
                {!item.epoch ? "..." : item.epoch}
              </Text>
              <Text
                style={{
                  ...styles.columnRowTxt,
                  backgroundColor: index % 2 == 1 ? "#252847" : "#161A3F",
                }}
              >
                {!item.amount ? "..." : formatReward(item.amount)}
              </Text>
              <Text
                style={{
                  ...styles.columnRowTxt,
                  backgroundColor: index % 2 == 1 ? "#252847" : "#161A3F",
                }}
              >
                {!item.apr ? "..." : !!item.apr && (item.apr * 100).toFixed(2)}
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingTop: 10,
    maxHeight: 400,
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: Images.velasColor4,
    height: 40,
  },
  tableRow: {
    flexDirection: "row",
    height: 40,
    alignItems: "center",
  },
  columnHeader: {
    width: "33.3%",
    justifyContent: "center",
    alignItems: "center",
  },
  columnHeaderTxt: {
    color: GRAY_COLOR,
    fontFamily: "Fontfabric-NexaBold",
  },
  columnRowTxt: {
    width: "33.3%",
    textAlign: "center",
    color: "#fff",
    fontFamily: "Fontfabric-NexaRegular",
    borderWidth: 2,
    borderColor: Images.velasColor4,
    padding: 7,
  },
  emptyMessageStyle: {
    textAlign: "center",
    color: "white",
    fontFamily: "Fontfabric-NexaRegular",
  },
});
