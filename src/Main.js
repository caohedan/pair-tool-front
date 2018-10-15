import { Layout } from 'antd';
import React, { Component } from 'react';
import { Tabs } from 'antd';
import BasicContent from './basicContent.js'
import Remain from "./Remain";
const TabPane = Tabs.TabPane;
const { Header, Content } = Layout;

class SiderDemo extends Component {
    render() {
        return (
            <Layout>

                    <Header style={{ background: '#fff', padding: 0 }}>
                        <h1 align="center">Pair-Tool</h1>
                    </Header>
                    <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
                        <Tabs tabContentPosition="left">
                            <TabPane tab="默认" key="1">
                              <BasicContent/>
                            </TabPane>
                            <TabPane tab="休假" key="2"><Remain/></TabPane>
                            <TabPane tab="固定" key="3">选项卡三内容</TabPane>
                        </Tabs>

                    </Content>

            </Layout>
        );
    }
}

export default SiderDemo;