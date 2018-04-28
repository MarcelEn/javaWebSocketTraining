import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


const Layout = props => (
    <div className="App">
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to Chat</h1>
        </header>
        <div className="App-intro">
            {props.children}
        </div>
    </div>
)

const SetUserName = props => (
    <Layout>
        <input
            type="text"
            placeholder="username"
            value={props.username}
            onChange={props.handleUsernameChange}
        />
        <br />
        <button
            onClick={props.handleUsernameSubmit}
            disabled={props.username === ''}
        >
            Connect
        </button>
    </Layout>
)




const proxyToValue = proxy => proxy.target.value




class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submittedUsername: false,
            username: '',
            id: null,
            messages: [],
            userInput: '',
            ws: null
        }
        this.handleUsernameChange = this.handleUsernameChange.bind(this)
        this.handleUsernameSubmit = this.handleUsernameSubmit.bind(this)
    }

    handleUsernameChange(proxy) {
        this.setState({ username: proxyToValue(proxy) })
    }
    handleUsernameSubmit() {
        var ws = new WebSocket('ws://' + window.location.host + '/chat')
        const that = this;
        ws.onmessage = function (message) {
            that.onmessage(JSON.parse(message.data))
        }

        ws.onopen = function () {
            ws.send(JSON.stringify({
                user: that.state.username
            }))
            ws.send(JSON.stringify({
                user: that.state.username
            }))
        }

        ws.onerror = function (error) {
            console.log('WEbSocket error ' + error)
            console.dir(error)
        }
        this.setState({ ws, submittedUsername: true })
    }

    onmessage(message) {
        switch (message.type) {
            case 'SET_ID':
                this.setState({ id: message.payload })
                break;
            default:
                break;
        }
    }

    render() {
        if (!this.state.submittedUsername)
            return (
                <SetUserName
                    username={this.state.username}
                    handleUsernameChange={this.handleUsernameChange}
                    handleUsernameSubmit={this.handleUsernameSubmit}
                />
            )
        if (!this.state.id)
            return (
                <Layout>
                    Waiting for id
                </Layout>
            )
        return (
            <Layout>
                hi
            </Layout>
        )
    }
}

export default App;
