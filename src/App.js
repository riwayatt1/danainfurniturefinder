import {
  Card, Input, Col, PageHeader, Row, Select, Tag, 
} from 'antd';
import React from 'react';
import logo from './logo.svg';
import './App.css';
import Services from './utils/api';
var numeral = require("numeral");

const { Search } = Input;
const { Option } = Select;


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      style:[],
      searchData:'',
      searchStyle:'',
      searchDelivery:''
    };
  }

  handleRenderCard = () => {
    const componentCard = [];
    
    this.state.data.map((v) => {
      const tag = [];
      const harga = numeral(v.price).format('0,.');
      for(var i=0; i< v.furniture_style.length;i++){
        tag.push(<Tag color="blue">{v.furniture_style[i]}</Tag>)
      }
      componentCard.push(
        <Col span={12} style={{padding:10}}> 
          <Card key={v.name} title={v.name} extra={`Rp ${harga}`} style={{ marginTop:"20px" }}>
            <p>{v.description}</p>
            {tag}
            <p style={{textAlign:"right"}}>{`${v.delivery_time} Days`}</p>
          </Card>
        </Col>
      )
    })
    return componentCard;
  }

  componentDidMount() {
    this.fetchDataProduct();
    this.fetchDataStyle();
  }

  fetchDataProduct = () => [
    new Services().get().then((data) => {
      this.setState({
        data : data.products,
      });
    })
  ]

  fetchDataStyle = () => [
    new Services().get().then((data) => {
      this.setState({
        style:data.furniture_styles,
      });
    })
  ]

  handleSearchOnChange = (e) => {
    this.setState({
      searchData: e.target.value
    }, () => {
      new Services().get().then(( data ) => {
        console.log('resa', data);
        let newList = [];
        let currentList = [...data.products];
        newList = currentList.filter(item => {
          const lc = item.name.toLowerCase();
          console.log('lc', lc)
          const filter = this.state.searchData.toLowerCase();
          return lc.includes(filter);
        });

        this.setState({
          data: newList,
        });

      })
    })
  }

  handleStyleOnChange = (e) => {
    this.setState({
      searchStyle: e
    }, () => {
      new Services().get().then(( data ) => {
        let newList = [];
        let currentList = [...data.products];
        newList = currentList.filter(item => {
          const lc = [...item.furniture_style];
          const filter = this.state.searchStyle.toString().toLowerCase();
          for(let i=0;i<lc.length;i++){
            if(lc.toString().toLowerCase().includes(filter)){
              return true;
            }else{
              return false;
            }
          }
        });
        this.setState({
          data: newList,
        });
      })
    })
  }

  handleDeliveryOnChange = (e) => {
    this.setState({
      searchDelivery: e
    }, () => {
      new Services().get().then(( data ) => {
        let newList = [];
        let currentList = [...data.products];
        newList = currentList.filter(item => {
          const lc = item.delivery_time;
          const filter = this.state.searchDelivery;
          // console.log('lc',lc);
          // console.log('filter',filter.toString());
          if(filter.toString() == ''){
            return true;
          }else if(filter.length == 1){
            if(filter.toString() == '7'){
              if(parseInt(lc) <= parseInt(filter.toString())){
                return true;
              }else{
                return false;
              }
            }else if(filter.toString() == '14'){
              if(parseInt(lc) > 7 && parseInt(lc) <= parseInt(filter.toString())){
                return true;
              }else{
                return false;
              }
            }else if(filter.toString() == '30'){
              if(parseInt(lc) > 14 && parseInt(lc) <= parseInt(filter.toString())){
                return true;
              }else{
                return false;
              }
            }else{
              return true;
            }
            
          }else if(filter.length > 1){
            var result = filter.map(function (x) { 
              return parseInt(x, 10); 
            });

            var max = Math.max(...result);
            if(max == 30){
              if(parseInt(lc) <= max){
                return true;
              }else{
                return false;
              }
            }else if(max == 14){
              if(parseInt(lc) <= max){
                return true;
              }else{
                return false;
              }
            }else if(max == 7){
              if(parseInt(lc) <= max){
                return true;
              }else{
                return false;
              }
            }else{
              return true;
            }
            
          }
          
          
        });
        console.log("baru",newList);
        this.setState({
          data: newList,
        });
      })
    })
  }

  render() {
    const dataStyle = [];
    const dataDelivery = [];

    for(var i=0;i<this.state.style.length; i++){
        dataStyle.push(<Option key={this.state.style[i]} value={this.state.style[i]}>{this.state.style[i]}</Option>)
    }
      dataDelivery.push(<Option key="1" value="7">1 Week</Option>)
      dataDelivery.push(<Option key="2" value="14">2 Week</Option>)
      dataDelivery.push(<Option key="3" value="30">1 Month</Option>)

    return (
      <>
      <div className="container">
          <Row>
            <Col span={12} style={{paddingRight:10}}>
            <Search
              placeholder="Search Furniture"
              onChange={this.handleSearchOnChange}
            />
            </Col>
          </Row>
          <Row style={{marginTop:"20px"}}>
            <Col span={12} style={{paddingRight:10}}>
            <Select
              mode="tags"
              placeholder="Select Furniture Style"
              onChange={this.handleStyleOnChange}
              style={{ width: '100%' }}
            >
              {dataStyle}
            </Select>
            </Col>
            <Col span={12} style={{paddingLeft:10}}>
            <Select
              mode="tags"
              placeholder="Select Delivery Days"
              onChange={this.handleDeliveryOnChange}
              style={{ width: '100%' }}
            >
              {dataDelivery}
            </Select>
            </Col>
          </Row>
          <Row>
              {this.handleRenderCard()}
          </Row>
      </div>
      </>
    );
  }
}

export default App;
