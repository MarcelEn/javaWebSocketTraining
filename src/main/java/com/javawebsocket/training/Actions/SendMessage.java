package com.javawebsocket.training.Actions;

public class SendMessage extends Action{
    public SendMessage(String username, String message){
        super("APPLY_MESSAGE", new Message(username, message));
    }
}
