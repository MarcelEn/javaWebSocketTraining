package com.javawebsocket.training.Client;

import com.javawebsocket.training.Actions.Action;

import org.json.JSONObject;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

public class Client {
    private WebSocketSession session;

    public Client(WebSocketSession session){
        this.session = session;
    }

    public String getId(){
        return session.getId();
    }

    public void sendMessage(Action message){
        session.sendMessage(new TextMessage(new JSONObject(message).toString());
    }
}
