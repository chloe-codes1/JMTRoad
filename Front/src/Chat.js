import React from 'react';
import MessageList from './component/chat/MessageList'

const DUMMY_DATA = [
    {
        senderId: "Chloe",
        text: "I wanna go home..."
    } ,
    {
        senderId: "Camila",
        text: "Same here"
    }
]

const instanceLocator = "v1:us1:91c23d15-dd16-481f-960f-12af296c2ae3"

const testToken ="https://us1.pusherplatform.io/services/chatkit_token_provider/v1/91c23d15-dd16-481f-960f-12af296c2ae3/token"

const userId = "Chloe"

const roomId = "7673f3c1-fa19-4c17-9077-2dd085bc9de2"



class Chat extends React.Component {

    constructor() {
        super()
        this.state = {
            messages: DUMMY_DATA
        }
    }

    componentDidMount () {
        const chatManager = new Chatkit.ChatManager ( {
            instanceLocator: instanceLocator,
            userId: userId,
            tokenProvider: new Chatkit.Token
        })
    }


    render() {
        return (
            <div>
                <MessageList messages = {this.state.messages }/>
                <SendMessageForm/>
            </div>
        )
    }
}
export default Chat;