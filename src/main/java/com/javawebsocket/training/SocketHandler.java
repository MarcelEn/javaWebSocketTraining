package com.javawebsocket.training;

import java.io.IOException;

import com.javawebsocket.training.Actions.SetId;
import com.javawebsocket.training.Client.ClientEngine;
import org.json.JSONObject;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;


@Component
public class SocketHandler extends TextWebSocketHandler{

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message)
			throws InterruptedException, IOException {

        JSONObject jsonPayload = new JSONObject(message.getPayload());
        int clientIndex = ClientEngine.getClientIndexOfSession(session.getId());
        if(clientIndex==-1){
            ClientEngine.addSession(session, jsonPayload.get("username").toString());
            session.sendMessage(new TextMessage(new JSONObject(new SetId(session.getId())).toString()));
        }else{
            ClientEngine.broadcastMessage(ClientEngine.getUsernameOfIndex(clientIndex), jsonPayload);
        }

	}
}