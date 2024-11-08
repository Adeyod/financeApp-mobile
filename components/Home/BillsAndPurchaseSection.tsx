import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Colors } from '@/constants/Colors';
import {
  Feather,
  FontAwesome,
  MaterialIcons,
  FontAwesome6,
  Entypo,
  Ionicons,
  MaterialCommunityIcons,
  Foundation,
} from '@expo/vector-icons';

const BillsAndPurchaseSection = () => {
  return (
    <View style={styles.mainContainerStyle}>
      <View style={styles.transferContainerStyle}>
        <View>
          <Pressable>
            <View style={styles.fundFlowContainerStyle}>
              <View style={styles.fundFlowContainerStyle}>
                <Foundation
                  style={styles.logoStyle}
                  name="graph-trend"
                  size={24}
                  color="black"
                />
              </View>
              <Text style={styles.fundFlowContainerTextStyle}>Airtime</Text>
            </View>
          </Pressable>
        </View>

        <View>
          <Pressable>
            <View style={styles.fundFlowContainerStyle}>
              <View style={styles.fundFlowContainerStyle}>
                <MaterialCommunityIcons
                  style={styles.logoStyle}
                  name="cards-playing-club-outline"
                  size={24}
                  color="black"
                />
              </View>
              <Text style={styles.fundFlowContainerTextStyle}>Data</Text>
            </View>
          </Pressable>
        </View>

        <View>
          <Pressable>
            <View style={styles.fundFlowContainerStyle}>
              <View style={styles.fundFlowContainerStyle}>
                <Ionicons
                  name="football"
                  style={styles.logoStyle}
                  size={24}
                  color="black"
                />
              </View>
              <Text style={styles.fundFlowContainerTextStyle}>Betting</Text>
            </View>
          </Pressable>
        </View>

        <View>
          <Pressable>
            <View style={styles.fundFlowContainerStyle}>
              <View style={styles.fundFlowContainerStyle}>
                <Entypo
                  name="tv"
                  size={24}
                  color="black"
                  style={styles.logoStyle}
                />
              </View>
              <Text style={styles.fundFlowContainerTextStyle}>TV</Text>
            </View>
          </Pressable>
        </View>
      </View>

      <View style={styles.transferContainerStyle}>
        <View>
          <Pressable>
            <View style={styles.fundFlowContainerStyle}>
              <View style={styles.fundFlowContainerStyle}>
                <MaterialCommunityIcons
                  style={styles.logoStyle}
                  name="credit-card-refund"
                  size={24}
                  color="black"
                />
              </View>
              <Text style={styles.fundFlowContainerTextStyle}>Loan</Text>
            </View>
          </Pressable>
        </View>

        <View>
          <Pressable>
            <View style={styles.fundFlowContainerStyle}>
              <View style={styles.fundFlowContainerStyle}>
                <FontAwesome6
                  style={styles.logoStyle}
                  name="money-bill-trend-up"
                  size={24}
                  color="black"
                />
              </View>
              <Text style={styles.fundFlowContainerTextStyle}>Invest</Text>
            </View>
          </Pressable>
        </View>

        <View>
          <Pressable>
            <View style={styles.fundFlowContainerStyle}>
              <View style={styles.fundFlowContainerStyle}>
                <MaterialCommunityIcons
                  style={styles.logoStyle}
                  name="human-male-female-child"
                  size={24}
                  color="black"
                />
              </View>
              <Text style={styles.fundFlowContainerTextStyle}>Childcare</Text>
            </View>
          </Pressable>
        </View>

        <View>
          <Pressable>
            <View style={styles.fundFlowContainerStyle}>
              <View style={styles.fundFlowContainerStyle}>
                <FontAwesome6
                  style={styles.logoStyle}
                  name="people-group"
                  size={24}
                  color="black"
                />
              </View>
              <Text style={styles.fundFlowContainerTextStyle}>More</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default BillsAndPurchaseSection;

const styles = StyleSheet.create({
  mainContainerStyle: {
    display: 'flex',
    // flexDirection: 'row',
    backgroundColor: Colors.colors.secondary,
    paddingVertical: 20,
    borderRadius: 20,
  },
  transferContainerStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 40,
    marginVertical: 20,
    // backgroundColor: Colors.colors.secondary,
    borderRadius: 10,
  },

  fundFlowStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fundFlowTextStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginLeft: -40,
    // color: 'white',
  },
  fundFlowContainerStyle: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  logoStyle: {
    backgroundColor: '#FFF8E7',
    padding: 10,
    borderRadius: 10,
  },
  fundFlowContainerTextStyle: {
    color: 'white',
    fontStyle: 'italic',
  },
});
