import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Image, StatusBar, Text, View} from 'react-native';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const subscription = setTimeout(() => {
      navigation.replace('login');
    }, 1500);
    return () => clearTimeout(subscription);
  }, []);
  return (
    <>
      <StatusBar hidden={true} backgroundColor={'#000'} />
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#000',
        }}>
        <Image
          source={require('../assets/images/logo/logo.png')}
          style={{width: 100, height: 100}}
          resizeMode="contain"
        />
      </View>
    </>
  );
};
export default SplashScreen;
