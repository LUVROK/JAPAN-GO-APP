import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, Pressable, ScrollView, Alert } from 'react-native';
import { MainScreen } from './styles/GL';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AuthContext } from './AuthContext/context'; // состояние входа/выхода
import axios from 'axios';
import { baseURL } from './axiosUrl.js'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';

axios.defaults.baseURL = `${baseURL}`

const Profile = () => {

  const navigation = useNavigation();

  const { signOut } = React.useContext(AuthContext); // чтобы изменить состояние userToken и выйти на экран логина

  const [image, setImage] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [friends, setFriends] = useState([])
  const [friendsPoisk, setFriendsPoisk] = useState([])
  const [Poiskfriends, setPosikFriends] = useState('')
  const [pausePoisk, setPausePoisk] = useState(false)
  const [stateAddFriend, setStateAddFriend] = useState('add-circle')

  // const poiskRef = React.useRef('');

  const handleSignOut = () => {
    signOut()
      .then(() => {
        //navigation.replace("Login")
        signOut()
      })
      .catch(error => alert(error.message))
  }

  // useEffect(() => {
  //   setTimeout(() => {
  //     setPausePoisk(true);
  //   }, 750)

  //   if (pausePoisk === true) {
  //     PoiskFriendusa(Poiskfriends);
  //   }
  // }, [Poiskfriends])

  useEffect(() => {
    const fetchData = async () => {
      const img = await AsyncStorage.getItem('photo');
      const email = await AsyncStorage.getItem('email');
      const name = await AsyncStorage.getItem('name');
      const date = await AsyncStorage.getItem('date');
      setEmail(email);
      setName(name);
      setDate(date);
      setImage(img);
      getfriends();
    }
    fetchData();
  }, []);

  useEffect(() => {
    // console.log(Poiskfriends)
    if (Poiskfriends === '') {
      console.log('YES');
      getfriends();
      setFriendsPoisk([]);
    }
  }, [Poiskfriends])

  // useEffect(() => {
  //   const text = poiskRef.current;
  //   Alert.alert(text)
  // }, [Poiskfriends])

  const PoiskFriendusa = async (emailssss) => {
    if (emailssss !== "") {
      const data = await axios.post('/friends/poiskFriends', {
        headers: {
          'Content-type': 'Application/json',
          'Accept': 'Application/json',
        },
        data: emailssss,
      }).then(console.log('Успешно')).catch((error) => {
        Alert.alert(error.message);
      });
      console.log(data.data.collectionUsers)
      setFriends([])
      // setFriends(data.data.collectionUsers)
      setFriendsPoisk(data.data.collectionUsers)
      setPausePoisk(false)
    }
    else {
      PoiskFriendusa(Poiskfriends);
    }
  }

  const pickImage = async () => {
    // await setImage(img._W)
    // console.log(image)
    // // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true
    });

    // const image = await AsyncStorage.getItem('photo')

    // console.log('length - ' + image.length)

    if (result.base64.length <= 500000) {
      if (!result.cancelled) {
        console.log(result.base64);
        const data = await axios.post('/user/UpdateImage', {
          headers: {
            'Content-type': 'Application/json',
            'Accept': 'Application/json',
          },
          data: {
            photo: result.base64, email: email
          },
        }).then(console.log('Успешно')).catch((error) => {
          Alert.alert(error.message);
        });

        await setImage(result.base64);

        // console.log(data.data.message);

        await AsyncStorage.removeItem('photo');
        await AsyncStorage.setItem('photo', result.base64);
        // }
      }
    }
    else {
      Alert.alert("Файл слишком большой")
    }
  }

  const getfriends = async () => {
    const email1 = await AsyncStorage.getItem('email');
    const data = await axios.post('/friends/getFriends', {
      headers: {
        'Content-type': 'Application/json',
        'Accept': 'Application/json',
      },
      data: email1,
    }).then(console.log('Успешно')).catch((error) => {
      Alert.alert(error.message);
    });
    if (data.status === 205) {
      // console.log(data.status)
    } else {
      setFriends(data.data.friendsCollection);
    }
    // console.log(data.data.data.friends)
    // console.log(data.data.data);
    // if (data.data.data != null) {
    //   await setFriends(data.data.data.email) //??
    // }
  }

  const messenger = async (emailTo) => {

    const data = await axios.post('/messages/createMessenger', {
      headers: {
        'Content-type': 'Application/json',
        'Accept': 'Application/json',
      },
      data: {
        emailTo: emailTo,
        emailFrom: email
      },
    }).then(console.log('Успешно')).catch((error) => {
      Alert.alert(error.message);
    });

    // navigation.navigate("Chat", {
    //   emailTo: emailTo,
    //   emailFrom: email
    // });

    // setStateAddFriend('chatbubble-ellipses')

  }

  const deleteFriend = async (emaildelete) => {
    const data = await axios.post('/friends/deleteFriends', {
      headers: {
        'Content-type': 'Application/json',
        'Accept': 'Application/json',
      },
      data: {
        emailTo: emaildelete,
        emailFrom: email
      },
    }).then(console.log(data)).catch((error) => {
      Alert.alert(error.message);
    });
    setFriends(data.data.friendsCollection)
    // setFriends(data.data.friends)
    // if (data.status === 205) {
    //   // console.log(data.status)
    // } else {
    // setFriends(data.data.friendsCollection);
    // }
    // for (let friend in friends) {
    //   if (friends[friend].email === emaildelete) {
    // console.log(friends[friend])
    // friends.splice(friend, friends.length - 1)
    // console.log(friends)
    // setFriends(friends.splice(friends[friend] - 1, friends[friend]))
    //   }
    // }

    // let objArr = friends;
    // console.log(objArr);

    // let removedEl = objArr.splice(0, 1);
    // console.log(objArr);
  }

  const addFriend = async (emailTo) => {

    const data = await axios.post('/friends/addFriend', {
      headers: {
        'Content-type': 'Application/json',
        'Accept': 'Application/json',
      },
      data: {
        emailFrom: email,
        emailTo: emailTo
      },
    }).then(console.log('Успешно')).catch((error) => {
      Alert.alert(error.message);
    });

    // Alert.alert(data.status)
    Alert.alert(data.data.message);
    setFriends([])

    // setStateAddFriend('chatbubble-ellipses')

  }

  const Poisk = () => {
    PoiskFriendusa(Poiskfriends);
  }

  const returnedFriendsList = () => {
    setPosikFriends('');
    getfriends();
    setFriendsPoisk([]);

    // const text = poiskRef.current;
    // console.log('gggg' + text.value)
  }

  return (
    <View style={MainScreen.container}>
      <View style={MainScreen.textViewCont}>
        <Text style={[MainScreen.text, { fontSize: 16 }]}>Профиль</Text>
      </View>

      <View style={{ width: '100%', flexDirection: 'row' }}>
        <Pressable style={{ flexDirection: 'row', width: 100, margin: 20 }} onPress={pickImage}>
          <Image
            style={styles.imageAvatar}
            source={{
              uri: image !== "" ? `data:image/jpg;base64,${image}` : undefined
            }}
          />
          <View style={{ marginLeft: -25, position: 'relative', backgroundColor: '#FEDBD0', height: 32, width: 32, borderRadius: 20, borderWidth: 3, borderColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
            <Ionicons name={'brush-outline'} size={18} color={'#442C2E'} style={{}} />
          </View>
        </Pressable>
        <View style={{ maxWidth: '60%', margin: 20, marginLeft: 0, height: '100%' }}>
          <Text style={{ fontSize: 22, fontFamily: 'NotoSansBold', opacity: 0.8 }}>{name}</Text>
          <Text style={{ fontSize: 13, fontFamily: 'NotoSansMedium', opacity: 0.6 }}>{email}</Text>
          <Text style={{ fontSize: 13, fontFamily: 'NotoSansMedium', opacity: 0.6 }}>Зарегистрирован в {date}</Text>
        </View>
      </View>

      <View style={{ width: 'auto', height: '60%', marginLeft: 20, marginRight: 20 }}>
        <View style={{ height: '15%', justifyContent: 'center' }}>
          <Text style={styles.friendH1}>Друзья</Text>
          <Pressable style={{ position: 'absolute', right: 0, marginRight: 10 }} onPress={() => Poisk()}>
            <Text style={styles.textFamily}>Поиск</Text>
          </Pressable>
          <View style={styles.input}>
            <TextInput
              placeholder="Найти друга"
              placeholderTextColor={'#A4A4A4'}
              value={Poiskfriends}
              // ref={poiskRef}
              // secureTextEntry={data.secureTextEntry ? true : false}
              autoCapitalize="none"
              name='poisk'
              onChangeText={(text) => setPosikFriends(text)}
            // value={Poiskfriends}
            />
            <Pressable style={{ marginRight: -3 }} onPress={() => returnedFriendsList()}>
              <Ionicons name={'close-circle'} size={18} color={'gray'} style={{}} />
            </Pressable>
            {/* <Pressable style={{ position: 'absolute', right: 5, top: 0, bottom: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              onPress={() => setPosikFriends('')} >
              <Ionicons name="close-circle" size={24} color='#442C2E' />
            </Pressable> */}
          </View>
        </View>
        <ScrollView style={{}}>
          {/* <View style={styles.friendView}>
            <Text style={styles.textFamily}>Богдан</Text>
            <Pressable
              style={{ position: 'absolute', right: 10, top: 0, bottom: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              onPress={() => getfriends()}
            >
              <Ionicons name="add-circle" size={24} color='#442C2E' />
            </Pressable>
          </View> */}
          {/*
            friends.map((data, i) => (
              <View style={styles.friendView} key={i}>
                <Text style={styles.textFamily}>{data.email}</Text>
                <Pressable
                  style={{ position: 'absolute', right: 10, top: 0, bottom: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                  onPress={() => messenger(data.email)}
                >
                  <Ionicons name="chatbubble-ellipses" size={24} color='#442C2E' />
                </Pressable>
              </View>
            ))
          */}
          {
            friendsPoisk.map((data, i) => (
              data.email !== "index0" && data.email !== email ? (
                <View style={styles.friendView} key={i}>
                  <Text style={styles.textFamily}>{data.email}</Text>
                  <Pressable
                    style={{ position: 'absolute', right: 10, top: 0, bottom: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    onPress={() => addFriend(data.email)}
                  >
                    <Ionicons name={`${stateAddFriend}`} size={24} color='#442C2E' />
                  </Pressable>
                </View>
              ) : null
            ))
          }
          {
            friends.map((data, i) => (
              data.email !== "index0" && data.email !== email ? (
                <View style={styles.friendView} key={i}>
                  <Text style={styles.textFamily}>{data.email}</Text>
                  <Pressable
                    style={{ position: 'absolute', right: 10, top: 0, bottom: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    // onPress={() => messenger(data.email)}
                    onPress={() => deleteFriend(data.email)}
                  >
                    <Ionicons name="close-outline" size={24} color='#442C2E' />
                  </Pressable>
                </View>
              ) : null
            ))
          }
        </ScrollView>
      </View>

      {/* <LinearGradient colors={['#FEEAE6', '#FEDBD0', '#442C2E']}
        start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }} locations={[0, 0.2, 1]} style={styles.imageGradient}> */}
      {/* </LinearGradient> */}

      {/* {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />} */}

      {/* <TouchableOpacity
          onPress={onPresstoLoginScreen}
          style={styles.loginScreenButton}
        >
        <Text style={styles.loginText}>Войти</Text>
      </TouchableOpacity> */}

      {/*Статистика по пройденому материалу*/}
      {/* <View style={MainScreen.statCont}>
        <Text style={MainScreen.TextStyleStat}>Статистика</Text>
        <View style={[MainScreen.StatWindowPoints]}>

        </View>
      </View> */}
      {/* <View style={[MainScreen.containerAll, { alignItems: 'center', justifyContent: 'center' }]}>
        <Text style={{ fontSize: 24, fontFamily: 'RobotoBold', color: '#442C2E' }}>Скоро появится</Text>
      </View> */}
      {/* <View style={{ position: 'absolute', top: 70, right: 20, left: 'auto' }}>
        <Pressable style={{ backgroundColor: 'yellow', padding: 20 }} onPress={UserData}>
          <Text>Данные</Text>
        </Pressable>
      </View> */}
      {/* <View style={{ position: 'absolute', top: 70, right: 130, left: 'auto' }}>
        <Pressable style={{ backgroundColor: 'yellow', padding: 20 }} onPress={() => Date()}>
          <Text>ФОТО</Text>
        </Pressable>
      </View> */}
      <TouchableOpacity
        onPress={handleSignOut}
        style={styles.loginOutScreenButton}
      >
        <Ionicons name="exit-outline" size={24} color='#999999' />
        <Text style={[styles.textSignOut, styles.loginText]}>Выйти</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  loginText: {
    fontSize: 14,
    color: '#999999',    // opacity: 0.6,
    //fontFamily: 'RobotoLight'
  },
  input: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 4,
    // marginTop: 0,
    fontSize: 14,
    backgroundColor: '#F2F2F4',
    color: '#442C2E',
    position: 'absolute',
    right: 70,
    width: 150,
    justifyContent: 'space-between',
    flexDirection: 'row'
    // top: 0,
  },
  loginOutScreenButton: {
    position: 'absolute',
    bottom: 0,
    marginBottom: 15,
    marginLeft: 15,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textSignOut: {
    marginLeft: 5
  },
  imageAvatar: {
    resizeMode: "cover",
    backgroundColor: "#ffffff",
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
  },
  imageView: {

  },
  textFamily: {
    fontFamily: 'NotoSansRegular',
  },
  friendH1: {
    fontFamily: 'NotoSansRegular',
    fontSize: 18,
    // marginBottom: 10,
    marginLeft: 10,
  },
  friendView: {
    padding: 15,
    backgroundColor: '#FEDBD0',
    marginTop: 12,
    borderRadius: 15,
    flexDirection: 'row',
  },

  imageGradient: {
    height: 210,
    width: 154,
    height: 154,
    borderRadius: 154 / 2,
    margin: 20,
    padding: 5
  }
});

export default Profile;