package com.javawebsocket.training.Client;


import com.javawebsocket.training.Actions.Action;
import com.javawebsocket.training.Actions.Message;
import com.javawebsocket.training.Actions.SendMessage;
import org.json.JSONObject;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;
import java.util.ArrayList;

public class ClientEngine {
    private static ArrayList<Client> clients = new ArrayList<>();

    public static boolean addSession(WebSocketSession session, String username){
        int index = getClientIndexOfSession(session.getId());
        if(index==-1){
            clients.add(new Client(session, username));
            return true;
        }
        return false;
    }

    public static int getClientIndexOfSession(String sessionId){
        for (int i = 0; i < clients.size(); i++){
            if (clients.get(i).getId().equals(sessionId)){
                return i;
            }
        }


        return -1;
    }

    public static String getUsernameOfIndex(int index){
        return clients.get(index).getUsername();
    }

    public static void broadcastMessage(String username, JSONObject payload) {
        clients.forEach(client -> client.sendMessage(new SendMessage(username, payload.get("message").toString())));
    }
}
