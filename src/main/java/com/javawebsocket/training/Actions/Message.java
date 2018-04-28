package com.javawebsocket.training.Actions;

public class Message {
    private String username, message;
    public Message(String username, String message){
        this.username = username;
        this.message = message;
    }

    public String getUsername() {
        return username;
    }

    public String getMessage() {
        return message;
    }
}
