import React, { Component } from 'react';
import Tabs from '../../components/tabs'
import TabPane from '../../components/tabs/TabPane'
class App extends Component {
    render() {
        return (
            <div className="App">
                <Tabs classPrefix={'tabs'} defaultActiveIndex={0} className="tabs-bar">
                    <TabPane key={0}
                    tab={<span>Home</span>}>
                    Home pane
                    </TabPane>
                    <TabPane key={1}
                        tab={<span>About</span>}>
                        About pane
                    </TabPane>
                    <TabPane key={2}
                        tab={<span>Link</span>}>
                        Link pane
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}
export default App;
