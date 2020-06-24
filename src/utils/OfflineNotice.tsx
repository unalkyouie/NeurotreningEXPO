import React, {useState, useEffect} from 'react';
import {Dimensions, Text, View, StyleSheet} from 'react-native';
import NetInfo, {
  NetInfoState,
  NetInfoSubscription,
} from '@react-native-community/netinfo';

const {width} = Dimensions.get('window');

const OfflineNotice = () => {
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
    <>
      {!isConnected && (
        <View style={styles.offlineContainer}>
          <Text style={styles.offlineText}>
            Brak połączenia z internetem. Niektóre funkcje mogą być niedostępne.
          </Text>
        </View>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  offlineContainer: {
    backgroundColor: '#b52424',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width,
    position: 'absolute',
    top: 0,
    left: 0,
    padding: 10,
  },
  offlineText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default OfflineNotice;
