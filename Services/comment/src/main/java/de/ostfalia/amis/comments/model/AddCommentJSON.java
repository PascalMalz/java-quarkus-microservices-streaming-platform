package de.ostfalia.amis.comments.model;

public class AddCommentJSON {

    private String userId;
    private String filmId;
    private String text;

    public AddCommentJSON() { };

    public AddCommentJSON(String userId, String filmId, String text) {
        this.userId = userId;
        this.filmId = filmId;
        this.text = text;
    }

    @Override
    public String toString() {
        return "AddCommentJSON{" +
                "userId='" + userId + '\'' +
                ", filmId='" + filmId + '\'' +
                ", text='" + text + '\'' +
                '}';
    }

    public String getUserId() {
        return userId;
    }

    public String getFilmId() {
        return filmId;
    }

    public String getText() {
        return text;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public void setFilmId(String filmId) {
        this.filmId = filmId;
    }

    public void setText(String text) {
        this.text = text;
    }
}
