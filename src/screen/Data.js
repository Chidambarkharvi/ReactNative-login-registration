
import { StatusBar, } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text,Button, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Card, Surface, Title, TextInput, Modal } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import ModalView from '../components/ModalView';

const url = 'http://localhost:4001/users'

export default function Data() {
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [id, setid] = useState('');
  const [name, setname] = useState('');
  const [salary, setsalary] = useState('');
  const [loading, setLoading] = useState(false);
  const [postId, setPostId] = useState(0);

  const getPosts = async () => {  
    setLoading(true)
    await fetch(url)
      .then((res) => res.json())
      .then(res => {
        console.log('data', res)
        setData(res);
      }).catch(e => { console.log(e) })
      setLoading(false)
  }

  const addPost = (id, name,salary) => {
    fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        id,
        name,
        salary
      })
    }).then((res) => res.json())
      .then(resjson => {
        console.log('post:', resjson)
        getPosts()
        setVisible(false);
        setid('')
        setname('')
        setsalary('')

      }).catch(e => { console.log(e) })
  }

  const editPost = (id, name, salary) => {
    console.log("editpost")
    fetch( `http://localhost:4001/users/${id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
       
         name,
         salary,
      })
    }).then((res) => res.json())
      .then(resjson => {
        console.log('updated:', resjson)
        getPosts()
        setVisible(false);
        setid('')
        setname('')
        setsalary('')

      }).catch(e => { console.log(e),"error" })
  }

  const deletePost = (id) => {
    fetch(url + `/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    }).then((res) => res.json())
      .then(resjson => {
        console.log('delete:', resjson)
        getPosts()
      }).catch(e => { console.log(e) })
  }

  const edit = (id, name, salary) => {
    setVisible(true)
    setid(id)
    setname(name)
    setsalary(salary)
  }

  useEffect(() => {
    getPosts();
  }, [])

  if (loading) {
    return (
      <View style={styles.container}>
<Text> Loading ...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Surface style={{ marginTop: 24, padding: 16, elevation: 2, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Title>Posts</Title>
        <TouchableOpacity onPress={() => setVisible(true)}>
          <Text style={{ padding: 10, borderRadius: 20, backgroundColor: 'steelblue', color: 'white' }}>Add Post</Text>
        </TouchableOpacity>
      </Surface>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          return (
            <Card style={{ padding: 16, margin: 16, elevation: 4, borderRadius: 8 }}>
              <View style={styles.rowView}>
                <View>
                  <Text style={{ fontSize: 18 }}>{item.title}</Text>
                  <Text>ID: {item.id}</Text>
                </View>
                <View>
                  <Text style={{ fontSize: 18 }}>{item.title}</Text>
                  <Text>name: {item.name}</Text>
                </View>
                <View>
                  <Text style={{ fontSize: 18 }}>{item.title}</Text>
                  <Text>salary: {item.salary}</Text>
                </View>
                <View style={styles.rowView}>
                  <TouchableOpacity style={{ marginHorizontal: 16 }}
                    onPress={() => edit(item.id, item.name, item.salary, )}>
                    <AntDesign name="edit" style={{ color:"blue" }} size={24} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {deletePost(item.id)
                  getPosts()
                  }}>
                    <AntDesign  style={{ color:"red" }} name="delete" size={24} />
                  </TouchableOpacity>
                </View>
              </View>
            </Card>
          )
        }}
      />



      <Modal
        visible={visible}
        title= {id ? "Edit Post" :  "Add post"  }
        // onDismiss={() => setVisible(false)}
        // onSubmit={() => {
        //   console.log("hhhh",id)
        //   if ( name && salary) {
        //     addPost( id, name, salary)
        //   getPosts()

        //   }else if(id && name && salary){
        //     editPost( id, name, salary)
        //     getPosts()

          // }

        // }}
        cancelable
      >
        <TextInput
          label="id"
          value={id}
          onChangeText={(text) => setid(text)}
          mode="outline"
        />
        <TextInput
          label="name"
          value={name}
          onChangeText={(text) => setname(text)}
          mode="outlined"
        />
        <TextInput
          label="salary"
          value={salary}
          onChangeText={(text) => setsalary(text)}
          mode="outlined"
        />
           <TouchableOpacity onPress={() => setVisible(false)}>
          <Text style={{ padding: 10, borderRadius: 20, backgroundColor: 'steelblue', color: 'white' }}>cancel</Text>
        </TouchableOpacity>
     
      </Modal>


      
      <ModalView
        visible={visible}
        title= {id ? "Edit Post" :  "Add post"  }
        onDismiss={() => setVisible(false)}
        onSubmit={() => {
          if ( name && salary) {
            addPost( id, name, salary)
          getPosts()

          }else if(id && name && salary){
            editPost( id, name, salary)
            getPosts()

          }

        }}
        cancelable
      >
        <TextInput
          label="id"
          value={id}
          onChangeText={(text) => setid(text)}
          mode="outline"
        />
        <TextInput
          label="name"
          value={name}
          onChangeText={(text) => setname(text)}
          mode="outlined"
        />
        <TextInput
          label="salary"
          value={salary}
          onChangeText={(text) => setsalary(text)}
          mode="outlined"
        />
      </ModalView>


 




    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  rowView: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
  }
});