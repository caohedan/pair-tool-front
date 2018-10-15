import {Transfer,Button,Table} from 'antd';
import React, {Component} from 'react';
import { Row, Col } from 'antd';
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
class Remain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mockData: [],
            targetKeys: [],
            members: [],
            showTable:"",
        }
    }

    componentDidMount() {
        this.getMember(this);

    }

    convertToShowData = (members) => {
        console.log(members)
        let membersData = [];
        for (var member of members) {
            member = {
                key: member,
                title: member,
                chosen: false,
            }
            membersData.push(member)
        }
        this.setState({members:membersData})
        return membersData;
    }
    getMember(OnLeave){
        let url = "http://10.222.47.217:8000/pair_tool/users/";
        fetch(url, {
            method: 'GET',
            headers: {
                "Content-type": "application/json\\n",
            }
        }).then(function (response) {
            return response.json()
        }).then(function (json) {
            console.log(json);
            OnLeave.convertToShowData(json);
        }).catch(function (ex) {
            console.log('parsing failed', ex)
        })
    }

    handleChange = (targetKeys) => {
        this.setState({targetKeys});
        console.log(targetKeys)
    }
    displayTable = (members)=>{
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
        this.setState({showTable: <Table columns={columns} dataSource={jsonMembers} size="middle" />})
    }
    handleRandom = (Remain) => {
        let targetKeys = this.state.targetKeys;
        let remainMemebr = this.state.members.map(x=>x.key).filter(x=> !targetKeys.includes(x));
        let members  = [targetKeys,remainMemebr];
        console.log(members)
        let url = "http://10.222.47.217:8000/pair_tool/";
        // let data ={
        //     "type":1,
        //     "members":members
        // }
        let data = {
            "type":"on leave",
            "members":targetKeys,
        }
        console.log(JSON.stringify(data))
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            return response.json()
        }).then(function (json) {
            if (json) {
                // alert("success");
               Remain.displayTable(json);
                console.log('parsed json', json)
            }
            // alert("failed")

        }).catch(function (ex) {
            console.log('parsing failed', ex)
        })
    }
    render() {
       // console.log(this.state.members)
        return (
            <div>
                <Row className="Button">
                    <Col span="10">
                    </Col>
                    <Col span="4">
                        <Button type="primary"  key="button" onClick={()=>{this.handleRandom(this)}}>Random</Button>
                    </Col>

                </Row>
                <Row className="testRowClassName">
                    <Col span="24"><Transfer
                        dataSource={this.state.members}
                        targetKeys={this.state.targetKeys}
                        onChange={this.handleChange}
                        render={item => item.title}
                    />
                    </Col>

                </Row>
                <Row  >
                    <Col span="24">
                    </Col>
                </Row>
                <Row  >
                    {this.state.showTable}
                </Row>
            </div>

        );
    }

}

export default Remain;