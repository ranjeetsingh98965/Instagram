import React from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const UploadScreen = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#000'}}>
      {/* Header */}
      <View
        style={{
          flexDirection: 'row',
          padding: 10,
          paddingVertical: 15,
          alignItems: 'center',
        }}>
        <View style={{flex: 1, paddingHorizontal: 10}}>
          <Text
            style={{
              fontWeight: 'bold',
              color: '#fff',
              fontSize: 18,
              textAlign: 'center',
            }}>
            New Post
          </Text>
        </View>
      </View>

      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
          style={{
            backgroundColor: '#1A1A1A',
            width: '40%',
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 10,
            borderRadius: 10,
          }}>
          <Feather name="upload" color={'#fff'} size={25} />
          <Text
            style={{
              marginTop: 5,
              fontWeight: '500',
              fontSize: 14,
              color: '#fff',
            }}>
            UPLOAD
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default UploadScreen;
