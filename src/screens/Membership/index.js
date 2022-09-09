import React, { useMemo } from "react";
import {
  SafeAreaView,
  StatusBar,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { useSelector } from 'react-redux';

import assests from "../../common/assests";
import styles from "./styles";
import MaineHeader from "../../common/headerWithText";
import { SUBSCRIBE_PLAN } from './../../utils/enum';
import color from './../../utils/color';

const Membership = () => {
  const mambershipData = useSelector(state => state.subscribeReducer.subscriptionData);

  const isFree = mambershipData?.subscriptionCode === "BASIC";

  const getMemberColor = useMemo(() => {
    switch (mambershipData?.subscriptionCode) {
      case SUBSCRIBE_PLAN.PREMIUM:
        return color.buttonColor1;
      case SUBSCRIBE_PLAN.PRO:
        return color.goldenColor;
      default:
        return color.hangmanColor;
    }
  }, [mambershipData])

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.statusBar} barStyle="light-content" />
      <MaineHeader
        isBack
        subHeaderTextS={{ color: "#fff" }}
        title={"My Plans"}
      />
      <View style={styles.innerContainer}>

        {/* top container */}
        <View style={styles.topContainer}>
          <Text style={styles.top1Text}>{`Your current plan is`}</Text>

          <View height={10} />

          <Text style={[styles.top2Text, {
            color: getMemberColor
          }]}>{mambershipData?.title}</Text>

          <View height={10} />

          {
            !isFree &&
            <Text style={styles.top3Text}>{`Your plan expires on: ${mambershipData?.expired}`}</Text>
          }
        </View>

        {/* bottom container */}
        <View style={styles.bottomContainer}>
          <View style={[styles.subscribeContainer, {
            borderColor: getMemberColor
          }]}>
            <Text style={[styles.subLine1, {
              color: getMemberColor
            }]}>{mambershipData?.title}</Text>

            <View height={10} />

            <Text style={styles.subLine2}>{isFree ? "FREE" : `$${mambershipData?.price}`}</Text>

            <View height={10} />

            <Text style={styles.subLine3}>Aliquam ut elementum dui, in scelerisque erat vehicula odio vestibulum at.</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Membership;
