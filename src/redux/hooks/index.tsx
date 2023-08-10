import React, {useEffect} from 'react';
import NetInfo from '@react-native-community/netinfo';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import colors from '../../style/colors';
import {useNoteContext} from '../context/data';

interface Props {
  children: React.ReactChild | React.ReactChild[];
}
export const Context = React.createContext<boolean>(true);

const AppNetInfo = ({children}: Props): JSX.Element => {
  const {isConnected, setIsConnected, isUploading, isDownloading} =
    useNoteContext();

  useEffect(() => {
    const handleConnectivityChange = state => {
      setIsConnected(state.isConnected);
    };

    const unsubscribe = NetInfo.addEventListener(handleConnectivityChange);

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Context.Provider value={isConnected}>
      <>
        <SafeAreaView>
          {!isConnected && (
            <View style={styles.barStyle}>
              <Text style={styles.labelStyle}>No Internet Connection</Text>
            </View>
          )}

          {isUploading && (
            <View style={styles.barStyleGreen}>
              <Text style={styles.labelStyle}>Uploading data to cloud</Text>
            </View>
          )}

          {isDownloading && (
            <View style={styles.barStyleBlue}>
              <Text style={styles.labelStyle}>Downloading data from cloud</Text>
            </View>
          )}
        </SafeAreaView>
      </>
      {children}
    </Context.Provider>
  );
};

const styles = StyleSheet.create({
  barStyle: {
    padding: 5,
    backgroundColor: colors.Text.error,
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelStyle: {color: colors.Text.white},
  barStyleGreen: {
    padding: 5,
    backgroundColor: colors.Generic.success,
    alignItems: 'center',
    justifyContent: 'center',
  },
  barStyleBlue: {
    padding: 5,
    backgroundColor: colors.Text.blue,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AppNetInfo;
