import React, {Component} from 'react';
import {Input} from 'antd';
const Search = Input.Search;

class AddForm extends Component {


    addMemeber(name) {
        if (name.length < 1)
            return;
        console.log(name);
        let user ={
            "members": [name]
        }
        let url = "http://10.222.47.217:8000/pair_tool/users/";

        fetch(url, {
            method: 'PUT',
            body: JSON.stringify(user),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            alert("success");
        }).catch(function (ex) {
            alert("failed")
            console.log('parsing failed', ex)
        })
    }

    render() {

        return (

            <Search
                placeholder="input new member name"
                enterButton="Add"
                size="large"
                onSearch={value => this.addMemeber(value)}
            />
        );
    }
}

export default AddForm;