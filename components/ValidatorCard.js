import React, { useRef } from "react";
import { StyleSheet, View, Dimensions, Linking, Alert } from "react-native";
import { Card, CardItem, Text, Left, Body, Right } from "native-base";
import Images from "../Images";
import { InfoIcon } from "../svg";
import { Tooltip } from "react-native-elements";
import { formatBalance, formatValue } from "../utils/format-value";

var width = Dimensions.get("window").width;
const BG_COLOR = "#161A3F";


export default (props) => {
  const tooltipRef = useRef(null);

  const onPressMore = () => {
    Linking.openURL(props.link);
    tooltipRef.current.toggleTooltip(false);
  };
  return (
    <Card transparent style={{...style.card, height: props.info ? 120 : 105}}>
      {props.info && 
      
      <View
        style={{
          alignSelf: "flex-end",
          paddingRight: 5,
        }}
      >
        <Tooltip
        ref={tooltipRef}
          withOverlay={false}
          containerStyle={style.tooltipContainerStyle}
          pointerColor="#27282C"
          withPointer={false}
          
          popover={
            props.readMore ? (
              <Text style={style.txtInfo}>
                {props.info}
                <Text
                  style={[
                    style.txtInfo,
                    {
                      color: Images.colorGreen,
                      textDecorationLine: "underline",
                    },
                  ]}
                  onPress={onPressMore}
                >
                  {props.readMore}
                </Text>
              </Text>
            ) : (
              <Text style={style.txtInfo}>{props.info}</Text>
            )
          }
        >
          <InfoIcon style={style.positionIcon} />
        </Tooltip>
      </View>
      }

      <CardItem style={style.bgCard}>
        <Left style={{ flex: 0 }} />
        <Body style={{ flex: 1, height: 20 }}>
          {props.cardSymbol && (
            <Text style={style.textHeader}>{props.cardSymbol}</Text>
          )}
          {props.cardIcon && (
            <View
              style={{
                alignSelf: "center",
              }}
            >
              {props.cardIcon}
            </View>
          )}
        </Body>
        <Right style={{ flex: 0 }} />
      </CardItem>

      <CardItem style={style.bgCard}>
        <Left style={{ flex: 0 }} />
        <Body style={{ flex: 1 }}>
          <Text style={style.textBody}>{formatValue(props.value || 0)}</Text>
        </Body>
        <Right style={{ flex: 0 }} />
      </CardItem>

      <CardItem style={style.bgCard}>
        <Left style={{ flex: 0 }} />
        <Body style={{ flex: 1 }}>
          <Text style={style.textFooter} numberOfLines={1}>{props.subtitle}</Text>
        </Body>
        <Right style={{ flex: 0 }} />
      </CardItem>
    </Card>
  );
};

const style = StyleSheet.create({
  card: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: BG_COLOR,
    width: width * 0.5 - 20,
    marginTop: 0,
    paddingVertical: 5,
  },
  bgItem: {
    backgroundColor: BG_COLOR,
  },
  bgCard: {
    backgroundColor: BG_COLOR,
    paddingTop: 5,
    paddingBottom: 5,
  },
  textFooter: {
    fontSize: 10,
    textTransform: "uppercase",
    color: "rgba(225, 225, 225, 0.50)",
    fontFamily: "Fontfabric-NexaBold",
    alignSelf: "center",
  },
  textBody: {
    width: "100%",
    textAlign: "center",
    fontSize: 20,
    textTransform: "uppercase",
    color: "#fff",
    fontFamily: "Fontfabric-NexaBold",
  },
  textHeader: {
    width: "100%",
    textAlign: "center",
    fontSize: 20,
    textTransform: "uppercase",
    color: Images.colorGreen,
    fontFamily: "Fontfabric-NexaBold",
  },
  positionIcon: {
    // marginTop: -10,
  },
  tooltipContainerStyle: {
    height: 'auto',
    // marginTop: -20,
    backgroundColor: "#27282C",
    borderRadius: 0,
  },
  txtInfo: {
    fontSize: 10,
    color: "#fff",
    fontFamily: "Fontfabric-NexaRegular",
  },
  areaBtn: {
    height: 30,
    width: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});