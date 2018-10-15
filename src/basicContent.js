import React, { Component } from 'react';
import axios from 'axios';
import { Table } from 'antd';
import AddForm from "./addForm";
const columns = [{
    title: 'No',
    dataIndex: 'key',
}, {
    title: 'Pair_1',
    dataIndex: 'pair_1',
}, {
    title: 'Pair_2',
    dataIndex: 'pair_2',
}];
class BasicContent extends Component {
    constructor(props){
        super(props);
        this.state = {
            members: [],
        };
    }
    componentDidMount () {
        this.getDataFromApi(this);
        console.log(this.state.members)

    }
  getDataFromApi(BasicContent){
      let  url="http://10.222.47.217:8000/pair_tool/"
      let members =[] ;
      axios.get(url,{
          headers: {
              'Access-Control-Allow-Origin':'*',
              'Content-Type': 'multipart/form-data'}
      })
          .then(function (response) {
              members = response.data;
              console.log(members)
              let jsonMembers = [];
              for (var i in members) {
                  console.log(i)
                  let jsonMember = {};
                  jsonMember = {
                      key : i*1+1,
                      pair_1: members[i][0],
                      pair_2: members[i][1],
                  }
                  jsonMembers.push(jsonMember)
                  console.log(jsonMembers)
              }
              BasicContent.setState({members:jsonMembers});
              console.log(BasicContent.state.members)
          })
          .catch(function (error) {
              console.log(error);
          });
  }
    render() {
        return (
            <div>
                <h4><AddForm/></h4>
                <Table columns={columns} dataSource={this.state.members} size="middle" />
            </div>

        );
    }
}

export default BasicContent;