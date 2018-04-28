package com.javawebsocket.training.Client;

import com.javawebsocket.training.Actions.Action;

import org.json.JSONObject;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;

public class Client {
    private WebSocketSession session;
    private String username;

    public String getUsername() {
        return username;
    }

    public Client(WebSocketSession session, String username){
        this.username = username;
        this.session = session;
    }

    public String getId(){
        return session.getId();
    }

    public void sendMessage(Action message) {
        try {
            if(session.isOpen())
                session.sendMessage(new TextMessage(new JSONObject(message).toString()));
        } catch (IOException e){
            e.printStackTrace();
        }
    }
}
