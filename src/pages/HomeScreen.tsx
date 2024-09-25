import {useNavigation} from '@react-navigation/native';
import React, {useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  SafeAreaView,
  StatusBar,
  Text,
  Touchable,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const feedData = [
  {
    id: 1,
    name: 'elizabeth',
    user_img:
      'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600',
    post_img:
      'https://images.pexels.com/photos/600107/pexels-photo-600107.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    likes: '45',
    isLiked: 1,
    first_comment: 'Advanture',
    post_date: 'Sept 7, 2024',
  },
  {
    id: 2,
    name: 'Happy',
    user_img:
      'https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=600',
    post_img:
      'https://images.pexels.com/photos/14553268/pexels-photo-14553268.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    likes: '4k',
    isLiked: 0,
    first_comment: 'Awesome',
    post_date: 'july 21, 2024',
  },
  {
    id: 3,
    name: 'Lily',
    user_img:
      'https://images.pexels.com/photos/678783/pexels-photo-678783.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    post_img:
      'https://images.pexels.com/photos/158063/bellingrath-gardens-alabama-landscape-scenic-158063.jpeg?auto=compress&cs=tinysrgb&w=600',
    likes: '529',
    isLiked: 0,
    first_comment: 'nice',
    post_date: 'Sept 12, 2024',
  },
];

const commentList = [
  {
    id: 1,
    name: 'Happy',
    user_img:
      'https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=600',
    comment: 'awesome',
    date: 'Jul 8, 2024',
  },
  {
    id: 2,
    name: 'Lily',
    user_img:
      'https://images.pexels.com/photos/678783/pexels-photo-678783.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    comment: 'Beautiful',
    date: 'Jul 9, 2024',
  },
];

const HomeScreen = () => {
  const navigation = useNavigation();
  const [commentModal, setCommentModal] = useState(false);
  const [commentsMessage, setCommentsMessage] = useState('');

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#000'}}>
      <StatusBar
        backgroundColor={'#000'}
        animated={true}
        barStyle={'light-content'}
        hidden={false}
      />
      {/* Header */}
      <View
        style={{
          backgroundColor: '#000',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
          paddingVertical: 2,
        }}>
        <View
          style={{
            width: 100,
            height: 40,
            alignItems: 'flex-start',
          }}>
          <Image
            source={require('../assets/images/insta.png')}
            style={{width: '100%', height: '100%', tintColor: '#fff'}}
            resizeMode="contain"
          />
        </View>
        <View>
          <Icon name="message-text" size={20} color="#fff" />
        </View>
      </View>

      {/* Feed Card start */}
      <FlatList
        data={feedData}
        renderItem={({item}) => {
          return (
            <View style={{marginTop: 4}}>
              {/* card header */}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('checkprofile')}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={{
                      uri: item.user_img,
                    }}
                    style={{width: 35, height: 35, borderRadius: 50}}
                    resizeMode="cover"
                  />
                  <View style={{marginHorizontal: 10, width: '80%'}}>
                    <Text
                      style={{fontWeight: 'bold', color: '#fff'}}
                      numberOfLines={1}>
                      {item.name}
                    </Text>
                  </View>
                </TouchableOpacity>
                <View>
                  <Icon name="dots-vertical" size={20} color={'#fff'} />
                </View>
              </View>

              {/* image */}
              <View
                style={{
                  width: '100%',
                  height: (windowHeight * 30) / 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={{uri: item.post_img}}
                  style={{width: '100%', height: '100%'}}
                  resizeMode="cover"
                />
              </View>

              {/* card footer */}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  {item.isLiked ? (
                    <TouchableOpacity>
                      <Icon name="heart" size={20} color={'red'} />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity>
                      <Icon name="heart-outline" size={20} color={'#fff'} />
                    </TouchableOpacity>
                  )}

                  <TouchableOpacity
                    style={{paddingHorizontal: 20}}
                    onPress={() => setCommentModal(true)}>
                    <Icon name="message-reply-text" size={20} color={'#fff'} />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Icon name="share-variant" size={20} color={'#fff'} />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity>
                  <Icon name="bookmark-outline" size={20} color={'#fff'} />
                </TouchableOpacity>
              </View>

              {/* card sub footer */}
              <View style={{paddingHorizontal: 10}}>
                <Text style={{color: '#fff'}}>{item.likes} likes</Text>
                <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 12}}>
                  {item.name}{' '}
                  <Text
                    style={{fontWeight: 'normal', color: '#fff', fontSize: 13}}>
                    {item.first_comment}
                  </Text>
                </Text>
                <Text style={{color: 'grey', fontSize: 12, marginTop: 2}}>
                  View all comments
                </Text>
                <Text style={{color: 'grey', fontSize: 10, marginTop: 2}}>
                  {item.post_date}
                </Text>
              </View>
            </View>
          );
        }}
      />
      {/* Feed Card end */}

      {/* Comment Modal */}
      <Modal
        visible={commentModal}
        animationType="slide"
        onRequestClose={() => setCommentModal(false)}>
        <View style={{flex: 1, backgroundColor: '#000'}}>
          {/* comment Header */}
          <View
            style={{
              flexDirection: 'row',
              padding: 10,
              paddingVertical: 15,
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => setCommentModal(false)}
              style={{position: 'absolute', left: 0, paddingHorizontal: 10}}>
              <Icon name="arrow-left" size={22} color={'#fff'} />
            </TouchableOpacity>
            <View style={{flex: 1, paddingHorizontal: 10}}>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: '#fff',
                  fontSize: 18,
                  textAlign: 'center',
                }}>
                Comments
              </Text>
            </View>
          </View>

          {/* list of comments */}
          <FlatList
            contentContainerStyle={{flex: 1}}
            data={commentList}
            renderItem={({item}) => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 10,
                    marginTop: 15,
                  }}>
                  <View>
                    <Image
                      source={{
                        uri: item.user_img,
                      }}
                      style={{width: 35, height: 35, borderRadius: 50}}
                    />
                  </View>
                  <View style={{flex: 1, marginHorizontal: 10}}>
                    <Text style={{color: '#fff', fontWeight: 'bold'}}>
                      {item.name}{' '}
                      <Text style={{color: '#fff', fontWeight: 'normal'}}>
                        {item.comment}
                      </Text>
                    </Text>
                    <Text style={{fontSize: 10, color: 'grey', marginTop: 2}}>
                      {item.date}
                    </Text>
                  </View>
                  <View>
                    <Icon name="cards-heart" color={'#fff'} size={20} />
                  </View>
                </View>
              );
            }}
          />

          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 10,
              alignItems: 'center',
            }}>
            <View>
              <Image
                source={{
                  uri: 'https://images.pexels.com/photos/678783/pexels-photo-678783.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                }}
                style={{width: 35, height: 35, borderRadius: 50}}
              />
            </View>
            <View
              style={{
                flex: 1,
                marginHorizontal: 10,
              }}>
              <TextInput
                placeholder="write your comment here..."
                placeholderTextColor={'grey'}
                style={{color: '#fff'}}
                onChangeText={txt => setCommentsMessage(txt)}
                value={commentsMessage}
              />
            </View>
            <View>
              <Text style={{color: '#0095F6', fontWeight: 'bold'}}>POST</Text>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};
export default HomeScreen;
