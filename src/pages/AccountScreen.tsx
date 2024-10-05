import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import {ActivityIndicator} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const AccountScreen = () => {
  const navigation = useNavigation();
  const [selectedImage, setSelectedImage] = useState('');
  const [viewImageModal, setViewImageModal] = useState(false);

  const imageData = [
    'https://images.pexels.com/photos/158063/bellingrath-gardens-alabama-landscape-scenic-158063.jpeg',
    'https://images.pexels.com/photos/36487/above-adventure-aerial-air.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/326900/pexels-photo-326900.jpeg',
  ];

  const signOut = async () => {
    try {
      await auth().signOut();
      await AsyncStorage.clear();
      navigation.replace('login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#000'}}>
      {/* header */}
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
              textAlign: 'left',
            }}>
            Lily
          </Text>
        </View>
      </View>

      {/* profile card */}
      <View style={{flexDirection: 'row', alignItems: 'center', padding: 10}}>
        <View style={{marginRight: 5}}>
          <Image
            source={{
              uri: 'https://images.pexels.com/photos/678783/pexels-photo-678783.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            }}
            style={{width: 80, height: 80, borderRadius: 50}}
          />
        </View>
        <View style={{flex: 1}}>
          <View style={{flexDirection: 'row'}}>
            <View style={{alignItems: 'center', flex: 1}}>
              <Text style={{fontWeight: 'bold', color: '#fff', fontSize: 18}}>
                3
              </Text>
              <Text style={{fontSize: 12, color: 'grey'}}>posts</Text>
            </View>
            <View style={{alignItems: 'center', flex: 1}}>
              <Text style={{fontWeight: 'bold', color: '#fff', fontSize: 18}}>
                0
              </Text>
              <Text style={{fontSize: 12, color: 'grey'}}>followers</Text>
            </View>
            <View style={{alignItems: 'center', flex: 1}}>
              <Text style={{fontWeight: 'bold', color: '#fff', fontSize: 18}}>
                1
              </Text>
              <Text style={{fontSize: 12, color: 'grey'}}>following</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={signOut}
            style={{
              padding: 5,
              backgroundColor: '#000',
              borderRadius: 4,
              borderWidth: 1,
              borderColor: '#fff',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10,
              marginHorizontal: 15,
            }}>
            <Text style={{color: '#fff', fontSize: 12, fontWeight: '500'}}>
              Sign Out
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* name and bio */}
      <View style={{padding: 10}}>
        <Text style={{color: '#fff'}}>Lily</Text>
        <Text style={{color: 'grey', fontSize: 12, marginTop: 2}}>
          Nature Lover
        </Text>
      </View>

      {/* Post List */}
      <FlatList
        data={imageData}
        numColumns={3}
        contentContainerStyle={{marginTop: 15}}
        renderItem={({index}) => {
          return (
            <TouchableOpacity
              style={{}}
              onPress={() => {
                setSelectedImage(imageData[index]);
                setViewImageModal(true);
              }}>
              <Image
                source={{uri: imageData[index]}}
                style={{
                  width: windowWidth / 3,
                  height: 130,
                  borderWidth: 1,
                  borderColor: '#000',
                }}
                resizeMode="cover"
              />
            </TouchableOpacity>
          );
        }}
      />
      {/* view Image */}
      <Modal
        visible={viewImageModal}
        animationType="fade"
        onRequestClose={() => setViewImageModal(false)}>
        <View style={{flex: 1, backgroundColor: '#000'}}>
          {/* header */}
          <TouchableOpacity
            onPress={() => setViewImageModal(false)}
            style={{position: 'absolute', zIndex: 99, top: 10, left: 10}}>
            <Icon name="arrow-left" size={22} color={'#fff'} />
          </TouchableOpacity>

          <ImageViewer
            imageUrls={[
              {
                url: selectedImage,
              },
            ]}
            onSwipeDown={() => setViewImageModal(false)}
            enableSwipeDown={true}
            renderIndicator={() => null}
            loadingRender={() => (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ActivityIndicator size="large" color="#fff" />
              </View>
            )}
            style={{
              width: windowWidth,
              height: windowHeight,
            }}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
};
export default AccountScreen;
