import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  Linking,
} from "react-native";
import Images from "../Images";
import getLang from "../wallet/get-lang.js";

const GRAY_COLOR = "rgba(255, 255, 255, 0.18)";
const URL = "https://support.velas.com/hc/en-150/articles/360014994819-F-A-Q";
export default ({store}) => {
  const lang = getLang(store);
        
  const columns = [lang.epoch || "# Epoch", lang.reward || "Reward",lang.apr ||  "APR"];

    const epoch = [
      {
        epoch: "#33",
        reward: "0.100 VLX",
        apr: "10.9%",
      },
      {
        epoch: "#32",
        reward: "0.200 VLX",
        apr: "15.1%",
      },
      {
        epoch: "#31",
        reward: "0.300 VLX",
        apr: "16.4%",
      },
      {
        epoch: "#30",
        reward: "0.600 VLX",
        apr: "18.9%",
      },
      {
        epoch: "#29",
        reward: "0.50 VLX",
        apr: "5.9%",
      },
      {
        epoch: "#28",
        reward: "0.100 VLX",
        apr: "10.9%",
      },
      {
        epoch: "#27",
        reward: "0.100 VLX",
        apr: "10.9%",
      },
      {
        epoch: "#26",
        reward: "0.100 VLX",
        apr: "10.9%",
      },
      {
        epoch: "#25",
        reward: "0.100 VLX",
        apr: "10.9%",
      },
      {
        epoch: "#24",
        reward: "0.100 VLX",
        apr: "10.9%",
      }
    ];
  // const epoch = [];

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
          marginTop: "40%",
        }}
      >
        <Text style={styles.emptyMessageStyle}>
          {lang.rewardsEmptyTitle || "We did not find any reward records for this validator."}
        </Text>
        <Text style={{ ...styles.emptyMessageStyle, marginTop: 40 }}>
          {lang.rewardsEmptyText || "Read about how rewards are"}
          <Text
            style={{
              color: Images.colorGreen,
              textDecorationLine: "underline",
            }}
            onPress={onPressLink}
          >
            {lang.rewardsEmptyLink || "getting credited."}
          </Text>
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={epoch.slice(0, 10)}
        style={{
          width: "100%",
          paddingHorizontal: 20,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
        ListEmptyComponent={() => (!epoch.length ? <ListEmpty /> : null)}
        keyExtractor={(item, index) => index + ""}
        ListHeaderComponent={!epoch.length ? false : tableHeader}
        stickyHeaderIndices={[0]}
        renderItem={({ item, index }) => {
          return (
            <View style={styles.tableRow}>
              <Text
                style={{
                  ...styles.columnRowTxt,
                  backgroundColor: index % 2 == 1 ? "#252847" : "#161A3F",
                }}
              >
                {item.epoch}
              </Text>
              <Text
                style={{
                  ...styles.columnRowTxt,
                  backgroundColor: index % 2 == 1 ? "#252847" : "#161A3F",
                }}
              >
                {item.reward}
              </Text>
              <Text
                style={{
                  ...styles.columnRowTxt,
                  backgroundColor: index % 2 == 1 ? "#252847" : "#161A3F",
                }}
              >
                {item.apr}
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: 'row',
    paddingTop: 10,
    maxHeight: 400
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