import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, AsyncStorage, TextInput, FlatList, SafeAreaView } from 'react-native';


//let DATA = [{tema:'hola', url:'adios'}]

function Item({ title }) {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

export default class App extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      tema: '',
      url:'',
      url1:'',
      DATA:['a','a'],
    };
  }
  
  //guardar
  saveItem = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
      //this.setState({tema:''});
      //this.setState({url:''});
      //this.setState({url1:''});
    } catch (error) {
      // Error saving data
      console.log("Saving data error");
    }
  };
  saveStorage =() =>{
    this.saveItem(this.state.tema,{"url1":this.state.url, "url2":this.state.url1})
  }
  //obtener
  showItem = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        // We have data!!
        return value;
      }else{
        console.log("Read data error");
      }
    } catch (error) {
      // Error retrieving data
      console.log("Read data error");
    }
  };
  showStorage =() =>{
    this.showItem(this.state.tema).then(result=>{
      let Obj=JSON.parse(result)
      alert("??"+Obj.Aa+"=>"+Obj.url1+" :: "+Obj.url2);
    })
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
  }
  //temas
  getData = async () => {
    let key
    let todo=""
    AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (err, stores) => {
        stores.map((result, i, store) => {
          // get at each store's key/value so you can work with it
           key = store[i][0];
           todo=todo+key+" ";
           key=todo.split(" ")
          //let value = store[i][1];
          
        });
        
        this.setState({DATA:key})
          //alert(this.state.DATA);
          //alert(key+"KK");
          //alert(todo+"++");
      });
    });
  };

  render(){
    
    let {container, btnStyle, txtStyle}=styles;
    return (
      
      <View style={styles.container}>
         
        <TextInput
        placeholder="Tema"
        value={this.state.tema}
        onChangeText={data=>this.setState({tema:data})}
        />
        <TextInput
        placeholder="URL1"
        value={this.state.url}
        onChangeText={data=>this.setState({url:data})}
        />
        <TextInput
        placeholder="URL"
        value={this.state.url1}
        onChangeText={data=>this.setState({url1:data})}
        />
        <TouchableOpacity style={styles.btnStyle} onPress={this.saveStorage}> 
          <Text style={txtStyle}>Save Data</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnStyle} onPress={this.showStorage}>
          <Text style={txtStyle}>Read Data</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnStyle} onPress={this.removeStorage}>
          <Text style={txtStyle}>Remove Data</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnStyle} onPress={this.getData}>
          <Text style={txtStyle}>todo</Text>
        </TouchableOpacity>
        
        <SafeAreaView style={styles.container}>
          <FlatList
            data={this.state.DATA}
            renderItem={({ item }) => <Item title={item} />}
            //keyExtractor={item => item.tema}
          />
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding:'5%'
  },
  btnStyle:{
    backgroundColor: '#7f7fff',
    justifyContent:'center',
    height: 50,
    width:100,
    marginTop:10,
    alignItems:'center'
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});/*

        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          title: 'First Item',
        },
        {
          id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
          title: 'Second Item',
        },
        {
          id: '58694a0f-3da1-471f-bd96-145571e29d72',
          title: 'Third Item',
        },
      */ 