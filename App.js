import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, AsyncStorage, TextInput, FlatList, SafeAreaView, Linking, Button, ScrollView} from 'react-native';
//import { hide } from 'expo/build/launch/SplashScreen';

function Item({ title }) {
  
  _handleOpenWithLinking = () => {
    let vari=JSON.stringify({title})
    var obj=JSON.parse(vari);
    Linking.openURL(obj.title);

  }
  return (
    <View style={styles.item}>
      <TouchableOpacity onPress={this._handleOpenWithLinking}>
      <Text>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default class App extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      tema: '',
      url:'',
      DATA:[],
    };
  }
  //guardar
  //saveItem = async (key, value) => {
    saveItem = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
      //await AsyncStorage.setItem(key, JSON.stringify(value));
      //this.setState({tema:''});
      //this.setState({url:''});
      //this.setState({url1:''});
    } catch (error) {
      console.log("Saving data error");
    }
  };
  saveStorage =() =>{
    //this.saveItem(this.state.tema,{"url1":this.state.url, "url2":this.state.url1})
    this.saveItem(this.state.tema,this.state.url)
    this.getData();
  }
  //obtener
  showItem = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        return value;
      }else{
        console.log("Read data error");
      }
    } catch (error) {
      console.log("Read data error");
    }
  };
  showStorage =() =>{
    /*this.showItem(this.state.tema).then(result=>{
      let Obj=JSON.parse(result)
      alert(Obj);
    })*/
    AsyncStorage.getItem(this.state.tema, (err, result) => {
      let ur=result
      alert(ur.tema);
    });
  }
  //remove
  removeItem = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      // Error saving data
      console.log("Remove data error");
    }
  };
  removeStorage =() =>{
    this.removeItem(this.state.tema);
    this.getData();
  }
  //temas
  getData = async () => {
    let key
    let todo=""
    AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (err, stores) => {
        stores.map((result, i, store) => {
           key = ">>>"+store[i][0]+"<<< "+store[i][1];
           if(todo!=""){
            todo=todo+" "+key;
            key=todo.split(" ")
           }else{
            todo=todo+key;
           }
           
          //let value = store[i][1];
          //alert(value)
          
        });
        
        this.setState({DATA:key})
          //alert(this.state.DATA);
          //alert(key+"KK");
          //alert(todo+"++");
      });
    });
  };

  //borrar todo
  clearAsyncStorage = async() => {
    AsyncStorage.clear();
  }
  //abrir link
  _handleOpenWithLinking = () => {
    Linking.openURL('https://expo.io');
  }

  render(){
    
    let {container, btnStyle, txtStyle}=styles;
    return (
      <View style={styles.container}>
        <Text style={styles.Titulo}>Biblioteca de URL's</Text>
        <View style={styles.formulario}>
        <View style={styles.formulario2}>
          <TextInput style={styles.input}
          placeholder="Tema"
          value={this.state.tema}
          onChangeText={data=>this.setState({tema:data})}
          />
          <TextInput style={styles.input}
          placeholder="URL"
          value={this.state.url}
          onChangeText={data=>this.setState({url:data})}
          />
          </View>
          <TouchableOpacity style={styles.btnStyle} onPress={this.saveStorage}> 
            <Text style={txtStyle}>Save Data</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.lista}>
        <SafeAreaView style={styles.safe}>
          <FlatList
            data={this.state.DATA}
            renderItem={({ item }) => <Item title={item} />}
            //keyExtractor={item => item.tema}
          />
        </SafeAreaView>
        </View>
        <View style={styles.ultimos}> 
        <TouchableOpacity style={styles.btnbajos} onPress={this.removeStorage}>
          <Text style={txtStyle}>Remove Data</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnbajos} onPress={this.getData}>
          <Text style={txtStyle}> ver lista</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnbajos} onPress={this.clearAsyncStorage}>
          <Text style={txtStyle}>borrar todo</Text>
        </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F4DA',
    alignItems: 'center',
    justifyContent: 'center',
    padding:'5%'
  },
  Titulo: {
    fontSize:50,
    color:'#7A7757',
    fontWeight: 'bold'
  },
  formulario:{
    flex:2,
    flexDirection:'row',
  },
  formulario2:{
    flex:3,
    flexDirection:'column',
  },
  input:{
    backgroundColor:'#fff',
    margin: 8,
    height: 42,
    borderRadius:10,

  },
  btnStyle:{
    width:100,
    height:100,
    alignItems:'center',
    alignContent:'center',
    backgroundColor:'#B3EA36',
    margin:8,
    justifyContent:'center',
    flex:1,
    borderRadius:20,
  },
  lista:{
    flex:4,
    alignItems:'center',
  },
  safe:{
    width:'100%',
    height:'100%',
    backgroundColor:'#DEF0B5',
    padding:8,
    alignItems:'center',
    alignContent:'center',
    justifyContent:"center",
  },
  ultimos:{
    flex:1,
    flexDirection:'row',
  },
  btnbajos:{
    width:100,
    height:50,
    alignItems:'center',
    alignContent:'center',
    backgroundColor:'#B3EA36',
    margin:8,
    justifyContent:"center",
    flex:1,
    borderRadius:20,
  },
  txtStyle:{
    color:'#121900',
    fontSize:15,
  },
  item:{
    alignSelf:"center",
    margin:6,
    fontSize: 50,
  }
});