import NetInfo, {
  NetInfoState,
  NetInfoSubscription,
} from '@react-native-community/netinfo';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';

import Button from '../components/Button';
import { colors, appStyles } from '../assets/styles';

const { height, width } = Dimensions.get('window');

const ExercisesDisplay = () => {
  const navigation = useNavigation();
  const [isConnected, setIsConnected] = useState(false);
  const [subscription, setSubscription] = useState<NetInfoSubscription | null>(
    null
  );

  useEffect(() => {
    setSubscription(NetInfo.addEventListener(handleConnectivityChange));
  }, []);
  const handleConnectivityChange = (state: NetInfoState) => {
    setIsConnected(state.isConnected);
  };
  return (
    <View style={[appStyles.container]}>
      <Text style={[appStyles.titleText, { fontSize: 26, marginBottom: 0 }]}>
        Ćwiczenia dla Twojego mózgu
      </Text>
      <View style={styles.categoryContainer}>
        <Text style={styles.categoryDescription}>Pamięć</Text>
        <ScrollView
          contentContainerStyle={styles.categoryButtonsContainer}
          horizontal
          centerContent
          showsHorizontalScrollIndicator={false}
        >
          <Button
            onPress={() => {
              navigation.navigate('ShoppingList');
            }}
            text="Lista zakupów"
            style={styles.button}
            textStyle={styles.textButton}
            icon="format-list-checks"
          />
          <Button
            onPress={() => {
              navigation.navigate('PhoneNumber');
            }}
            text="Numer Telefonu"
            style={styles.button}
            textStyle={styles.textButton}
            icon="cellphone-basic"
          />
        </ScrollView>
      </View>
      <View style={styles.categoryContainer}>
        <Text style={styles.categoryDescription}>Myślenie</Text>
        <ScrollView
          contentContainerStyle={styles.categoryButtonsContainer}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          <Button
            onPress={() => {
              navigation.navigate('Equations');
            }}
            text="Równania"
            style={styles.button}
            textStyle={styles.textButton}
            icon="format-list-numbered"
          />
          <Button
            onPress={() => {
              navigation.navigate('OrderOfNumbers');
            }}
            text="Kolejność liczb"
            style={styles.button}
            textStyle={styles.textButton}
            icon="less-than-or-equal"
          />
        </ScrollView>
      </View>
      <View style={styles.categoryContainer}>
        <Text style={styles.categoryDescription}>Język</Text>
        <ScrollView
          contentContainerStyle={styles.categoryButtonsContainer}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          <Button
            disabled={!isConnected}
            onPress={() => {
              navigation.navigate('BuildWords');
            }}
            text="Ułóż słowa"
            style={styles.button}
            textStyle={styles.textButton}
            icon="file-word-box"
          />
          <Button
            disabled={!isConnected}
            onPress={() => {
              navigation.navigate('CompleteWords');
            }}
            text="Wymyśl słowa"
            style={styles.button}
            textStyle={styles.textButton}
            icon="format-letter-case-upper"
          />
        </ScrollView>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  answersContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    marginTop: 50,
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderColor: colors.midnightGreen,
    borderWidth: 0,
    borderBottomWidth: 2,
    justifyContent: 'center',
  },
  textButton: {
    color: colors.midnightGreen,
    fontSize: 18,
  },
  categoryContainer: {
    // backgroundColor: colors.mintCream,
    borderRadius: 20,
    // margin: 10,
    padding: 10,
    height: height * 0.2,
  },
  categoryDescription: {
    alignSelf: 'flex-start',
    color: colors.midnightGreen,
    fontSize: 18,
  },
  categoryButtonsContainer: {
    alignItems: 'center',
    justifyContent: 'space-around',
    width,
  },
  exerciseContainer: {
    backgroundColor: colors.mintCream,
    borderRadius: 10,
  },
});
export default ExercisesDisplay;
