import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import NetInfo, {
  NetInfoState,
  NetInfoSubscription,
} from '@react-native-community/netinfo';
import {useNavigation} from '@react-navigation/native';

import Button from '../components/Button';
import {colors, appStyles} from '../assets/styles';

const ExerciseScreen = () => {
  const navigation = useNavigation();
  const [isConnected, setIsConnected] = useState(false);
  const [subscription, setSubscription] = useState<NetInfoSubscription | null>(
    null,
  );

  useEffect(() => {
    setSubscription(NetInfo.addEventListener(handleConnectivityChange));
  }, []);
  const handleConnectivityChange = (state: NetInfoState) => {
    setIsConnected(state.isConnected);
  };
  return (
    <View style={[appStyles.container]}>
      <Text style={[appStyles.titleText, {fontSize: 20, marginBottom: 0}]}>
        Ćwiczenia dla Twojego mózgu
      </Text>
      <View style={styles.categoryContainer}>
        <Text style={styles.categoryDescription}>Pamięć</Text>
        <ScrollView
          contentContainerStyle={styles.categoryButtonsContainer}
          horizontal
          centerContent>
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
          horizontal>
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
          horizontal>
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
    height: '60%',
    justifyContent: 'center',
    margin: 5,
    marginTop: 50,
  },
  button: {
    backgroundColor: 'transparent',
    borderColor: colors.midnightGreen,
    borderWidth: 0,
    borderBottomWidth: 2,
    // marginHorizontal: 30,
  },
  textButton: {
    color: colors.midnightGreen,
    fontSize: 18,
  },
  categoryContainer: {
    backgroundColor: colors.mintCream,
    borderRadius: 20,
    margin: 10,
    padding: 10,
    height: '40%',
  },
  categoryDescription: {
    alignSelf: 'flex-start',
    color: colors.midnightGreen,
    fontSize: 18,
  },
  categoryButtonsContainer: {
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
  },
  exerciseContainer: {
    backgroundColor: colors.mintCream,
    borderRadius: 10,
  },
});
export default ExerciseScreen;
