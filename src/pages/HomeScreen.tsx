import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
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
import ImageViewer from 'react-native-image-zoom-viewer';
import {ActivityIndicator} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import successSnackbar from '../components/SnackBars/successSnackbar';
import failedSnackbar from '../components/SnackBars/failedSnackbar';
import RNFetchBlob from 'react-native-blob-util';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {BASE_URL} from '@env';

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
    caption: 'Advanture',
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
    caption: 'Awesome',
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
    caption: 'nice',
    post_date: 'Sept 12, 2024',
  },
];

const HomeScreen = () => {
  const navigation = useNavigation();
  const [commentModal, setCommentModal] = useState(false);
  const [commentsMessage, setCommentsMessage] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const [viewImageModal, setViewImageModal] = useState(false);
  const [downloadImgLoading, setDownloadImgLoading] = useState(false);
  const [commentData, setCommentData] = useState([]);
  const [commentDataLoading, setCommentDataLoading] = useState(false);
  const [addcommentLoading, setAddCommentLoading] = useState(false);

  const downloadImage = async (imageUrl, imageName) => {
    setDownloadImgLoading(true);
    console.log('Downloading Image: ', imageUrl, ' , ', imageName);
    const {config, fs} = RNFetchBlob;
    const imagePath = `${fs.dirs.DownloadDir}/${imageName}.jpg`;

    try {
      const res = await config({
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path: imagePath,
          description: 'Downloading image file.',
          mime: 'image/jpeg',
          mediaScannable: true,
        },
      }).fetch('GET', imageUrl);

      console.log('Image Downloaded:', res.path());
      setDownloadImgLoading(false);
      successSnackbar('Image Downloaded.');
    } catch (error) {
      console.error('Error downloading image:', error);
      setDownloadImgLoading(false);
      failedSnackbar('Download Failed!');
    }
  };

  const getPostData = async () => {
    try {
      const user_id = await AsyncStorage.getItem('userId');
      const data = {
        user_id: user_id,
      };

      let res = await axios.post(`${BASE_URL}feed`, data);
      // console.log('res: ', res.data);
    } catch (err) {
      console.log('get post data err: ', err);
      failedSnackbar('Something went wrong!');
    }
  };

  const getPostComments = async () => {
    setCommentDataLoading(true);
    try {
      const user_id = await AsyncStorage.getItem('userId');
      const data = {
        // user_id: user_id,
        user_id: 17,
        post_id: 5,
      };
      let res = await axios.post(`${BASE_URL}show_comments`, data);
      // console.log('get comment res: ', res.data.data);
      if (res.data.status == true) {
        setCommentData(res.data.data);
      } else {
        failedSnackbar('Something went wrong!');
      }
      setCommentDataLoading(false);
    } catch (err) {
      console.log('get comment err: ', err);
      failedSnackbar('Something went wrong!');
      setCommentDataLoading(false);
    }
  };

  const addComment = async () => {
    setAddCommentLoading(true);
    try {
      const user_id = await AsyncStorage.getItem('userId');
      const data = {
        user_id: 17,
        post_id: 5,
        comment: commentsMessage,
      };
      let res = await axios.post(`${BASE_URL}insert_comment`, data);
      console.log('add comment res: ', res.data.status);
      if (res.data.status) {
        const newId = (commentData.length + 1).toString();
        const newCreatedAt = new Date()
          .toISOString()
          .slice(0, 19)
          .replace('T', ' ');
        const newCommentData = {
          id: newId,
          post_id: '5',
          user_id: '17',
          comment: commentsMessage,
          created_at: newCreatedAt,
          username: 'Dark',
          profile_picture:
            'https://images.pexels.com/photos/678783/pexels-photo-678783.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        };
        setCommentData([newCommentData, ...commentData]);
        setCommentsMessage('');
      } else {
        failedSnackbar('Something went wrong!');
      }
      setAddCommentLoading(false);
    } catch (err) {
      console.log('add comment err: ', err);
      setAddCommentLoading(false);
      failedSnackbar('Something went wrong!');
    }
  };

  useEffect(() => {
    // getPostData();
  }, []);

  const formatDate = dateString => {
    const date = new Date(dateString);

    const options = {month: 'short', day: 'numeric', year: 'numeric'};
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

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
              <TouchableOpacity
                onPress={() => {
                  setSelectedImage(item.post_img);
                  setViewImageModal(true);
                }}
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
              </TouchableOpacity>

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
                    onPress={() => {
                      getPostComments();
                      setCommentData([]);
                      setCommentModal(true);
                    }}>
                    <Icon name="message-reply-text" size={20} color={'#fff'} />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Icon name="share-variant" size={20} color={'#fff'} />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  disabled={downloadImgLoading ? true : false}
                  onPress={() =>
                    downloadImage(item.post_img, `${item.name}_post`)
                  }>
                  {/* {downloadImgLoading ? (
                    <ActivityIndicator size={20} color="#fff" />
                  ) : (
                    <Icon name="tray-arrow-down" size={20} color={'#fff'} />
                  )} */}
                  <Icon name="tray-arrow-down" size={20} color={'#fff'} />
                </TouchableOpacity>
              </View>

              {/* card sub footer */}
              <View style={{paddingHorizontal: 10}}>
                <Text style={{color: '#fff'}}>{item.likes} likes</Text>
                <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 12}}>
                  {item.name}{' '}
                  <Text
                    style={{fontWeight: 'normal', color: '#fff', fontSize: 13}}>
                    {item.caption}
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

          {!commentDataLoading ? (
            <>
              {commentData.length > 0 ? (
                <>
                  {/* list of comments */}

                  <FlatList
                    showsVerticalScrollIndicator={false}
                    style={{flex: 1}}
                    data={commentData}
                    renderItem={({item}) => {
                      return (
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingHorizontal: 10,
                            marginTop: 20,
                          }}>
                          <View
                            style={{
                              height: '100%',
                              justifyContent: 'flex-start',
                            }}>
                            <Image
                              source={{
                                uri: 'https://images.pexels.com/photos/678783/pexels-photo-678783.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                              }}
                              style={{
                                width: 40,
                                height: 40,
                                borderRadius: 50,
                              }}
                            />
                          </View>
                          <View style={{flex: 1, marginHorizontal: 10}}>
                            <Text style={{color: '#fff', fontWeight: 'bold'}}>
                              {item.username}
                              {'  '}
                              <Text
                                style={{
                                  fontSize: 10,
                                  color: 'grey',
                                  marginTop: 2,
                                }}>
                                {formatDate(item.created_at)}
                              </Text>
                            </Text>
                            <Text
                              style={{
                                color: '#fff',
                                fontWeight: 'normal',
                                marginTop: 2,
                              }}>
                              {item.comment}
                            </Text>
                          </View>
                          {/* <View>
                            <Icon name="cards-heart" color={'#fff'} size={20} />
                          </View> */}
                        </View>
                      );
                    }}
                  />
                </>
              ) : (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1,
                  }}>
                  <Text
                    style={{fontSize: 20, color: '#fff', fontWeight: 'bold'}}>
                    No Comments yet
                  </Text>
                  <Text style={{fontSize: 14, color: '#F0F0F0', marginTop: 5}}>
                    Start the conversation.
                  </Text>
                </View>
              )}
              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 10,
                  alignItems: 'center',
                  paddingVertical: 5,
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
                <TouchableOpacity
                  disabled={
                    commentsMessage == '' ||
                    commentsMessage == null ||
                    addcommentLoading
                      ? true
                      : false
                  }
                  onPress={() => {
                    addComment();
                  }}>
                  {!addcommentLoading ? (
                    <Text style={{color: '#0095F6', fontWeight: 'bold'}}>
                      POST
                    </Text>
                  ) : (
                    <ActivityIndicator size={20} color="#fff" />
                  )}
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ActivityIndicator size="large" color="#fff" />
            </View>
          )}
        </View>
      </Modal>

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
export default HomeScreen;

// const data = [
//   {
//     user_id:17,
//     profile_picture:'',
//     post_image:'',
//     caption: '',
//     likes:40,
//     comments: [
//       {
//         user_id: 5,
//         profile_picture: '',
//         comment: 'hehe'
//       },
//       {
//         user_id: 6,
//         profile_picture: '',
//         comment: 'haha'
//       }
//     ],
//     post_publish_date: 'Sept 7, 2024'

//   },
//   {...}
// ]
