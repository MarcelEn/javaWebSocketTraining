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

const UserInput = props => (
    <div>
        <input
            type="text"
            placeholder="Message"
            value={props.userMessageInput}
            onChange={props.handleMessageInput}
        />
        <br />
        <button
            onClick={props.handleMessageSubmit}
            disabled={props.userMessageInput === ''}
        >
            Submit
        </button>
    </div>
)

const Messages = props => (
    <div>
        {
            props.messages.map(
                message => (
                    <div>
                        <p>
                            <b>
                                {message.username}
                            </b>
                        </p>
                        <p>
                            {message.message}
                        </p>
                    </div>
                )
            )
        }
    </div>
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
            ws: null,
            userMessageInput: ''
        }
        this.handleUsernameChange = this.handleUsernameChange.bind(this)
        this.handleUsernameSubmit = this.handleUsernameSubmit.bind(this)
        this.handleMessageInput = this.handleMessageInput.bind(this)
        this.handleMessageSubmit = this.handleMessageSubmit.bind(this)
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
                username: that.state.username
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
            case 'APPLY_MESSAGE':
                this.setState({ messages: [...this.state.messages, message.payload] })
                break;
            default:
                break;
        }
    }
    handleMessageInput(proxy) {
        this.setState({ userMessageInput: proxyToValue(proxy) })
    }
    handleMessageSubmit() {
        this.state.ws.send(JSON.stringify({
            message: this.state.userMessageInput
        }))
        this.setState({ userMessageInput: '' })
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
                <Messages
                    messages={this.state.messages}
                />
                <UserInput
                    userMessageInput={this.state.userMessageInput}
                    handleMessageInput={this.handleMessageInput}
                    handleMessageSubmit={this.handleMessageSubmit}
                />
            </Layout>
        )
    }
}

export default App;
