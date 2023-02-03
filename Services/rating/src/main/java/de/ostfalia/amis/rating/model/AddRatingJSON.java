package de.ostfalia.amis.rating.model;

import java.util.UUID;

public class AddRatingJSON {

    private String filmId;
    private String userId;
    private int value;

    public AddRatingJSON() { }

    public AddRatingJSON(String filmId, String userId, int value) {
        this.filmId = filmId;
        this.userId = userId;
        this.value = value;
    }

    

    @Override
    public String toString() {
        return "AddRatingJSON{" +
                "filmId=" + filmId +
                ", userId=" + userId +
                ", value=" + value +
                '}';
    }

    public String getFilmId() {
        return filmId;
    }

    public String getUserId() {
        return userId;
    }

    public int getValue() {
        return value;
    }

    public void setFilmId(String filmId) {
        this.filmId = filmId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public void setValue(int value) {
        this.value = value;
    }
}
