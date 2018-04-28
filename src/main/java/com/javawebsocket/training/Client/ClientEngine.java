package com.javawebsocket.training.Client;


import com.javawebsocket.training.Actions.Action;
import org.springframework.web.socket.WebSocketSession;
import java.util.ArrayList;

public class ClientEngine {
    private static ArrayList<Client> clients = new ArrayList<>();

    public static boolean addSession(WebSocketSession session){
        int index = getClientIndexOfSession(session.getId());
        if(index==-1)
            return false;
        clients.add(new Client(session));
        return true;
    }

    private static int getClientIndexOfSession(String sessionId){
        for (int i = 0; i < clients.size(); i++)
            if (clients !=null && clients.get(i).getId().equals(sessionId))
                return i;

        return -1;
    }

    public static void broadcastMessage(Action message){
        clients.forEach(client -> client.sendMessage(message));
    }
}
