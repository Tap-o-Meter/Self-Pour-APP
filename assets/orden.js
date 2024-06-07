import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button,Alert } from 'react-native';
import { ArticulosFeed } from "../container";
import {MaterialHeaderButtons, Item} from '../../config/HeaderIcon'
import {SetData} from '../../config/connexion';

class Orden extends Component {
  static navigationOptions = ({ navigation, screenProps, state }) => ({
    title: `${(navigation.state.params).first +" "+(navigation.state.params).last}`,
    headerTitleStyle : {textAlign: 'center',alignSelf:'center'},
    headerStyle:{
      backgroundColor:'white',
    },headerRight: (
      <MaterialHeaderButtons>
        <Item title="add" iconName="check" onPress={navigation.state.params.handleSave}  />
      </MaterialHeaderButtons>
    ),
  });

  componentDidMount() {
    this.props.navigation.setParams({ handleSave: this.borrar });
  }

  borrar = () => {
    const url = 'http://hacktronicksmxl.com/pedidos/adminActions.php?action=removePedido&id='+this.props.navigation.state.params.id
    Alert.alert('Confirmar','¿Desea marcar cómo entregado?',[{text: 'No',style: 'cancel'},{text: 'Sí', onPress: () => {SetData(url);this.props.navigation.goBack(null)} }]);
  }

    render(){
      return(
        <View style={{ height:100+"%", width:100+"%"}}>
          <View style={{flexDirection:'row', marginTop: 25, marginLeft: 15}}>
            <View>
              <Text style={{fontSize:18, color: "rgb(180,180,180)"}}>No. de pedido</Text>
              <Text style={{marginTop: 5, fontSize:18, fontWeight:"400"}}>{this.props.navigation.state.params.id}</Text>
              <Text style={{marginTop:15, fontSize:16, color: "rgb(180,180,180)"}}>Día de entrega</Text>
              <Text style={{marginTop: 5, fontSize:18, fontWeight:"400"}}>{this.props.navigation.state.params.dia}</Text>
            </View>
            <View style={{flex:1, alignItems: "left",justifyContent: 'flex-end', marginLeft: 20 }}>
              <Text style={{fontSize:16, color: "rgb(180,180,180)"}}>Teléfono</Text>
              <Text style={{marginTop: 5, fontSize:18, fontWeight:"400"}}>{this.props.navigation.state.params.tel}</Text>
              <Text style={{marginTop:15, fontSize:16, color: "rgb(180,180,180)"}}>Punto de entrega</Text>
              <Text style={{marginTop: 5, fontSize:18, fontWeight:"400"}}>{this.props.navigation.state.params.esc}</Text>
            </View>
          </View>
          <Text style={{fontSize:20, marginTop:30, marginLeft:15, color: "rgb(180,180,180)"}}>Lista de Articulos</Text>
          <ArticulosFeed item = {this.props.navigation.state.params.id}/>
          <View style={{position: 'absolute', bottom: 0, flexDirection:'row', alignItems:'center', height:54, width:100+"%", borderTopColor:"rgb(233,233,233)", borderTopWidth:1, backgroundColor: 'rgb(41,182,246)' }}>
            <Text style={{fontSize:26, color:'white', marginLeft:10}}>Total:</Text>
            <Text style={{position:'absolute', right:10, fontSize:20, marginLeft:10, color: 'white'}}>${this.props.navigation.state.params.total}</Text>
          </View>
        </View>
      )
    }
}

const styles = StyleSheet.create({
  noId: {
    fontSize:30,
    marginLeft: 20
  },
  fecha:{
    fontSize:12,
    marginTop: 5,
    marginLeft:20
  },
  borde:{
    borderBottomColor: "rgb(233,233,233)",
    borderBottomWidth: StyleSheet.hairlineWidth
  },
});

export default Orden;
