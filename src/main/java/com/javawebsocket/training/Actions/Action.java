package com.javawebsocket.training.Actions;

abstract public class Action<Payload> {
    private String type;
    private Payload payload;

    public Action(String type, Payload payload){
        this.type = type;
        this.payload = payload;
    }

    public Payload getPayload() {
        return payload;
    }

    public String getType() {
        return type;
    }
}
