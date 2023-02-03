package de.ostfalia.wsamis.businessobject;

public class FavouriteJSON {

    private String userId;

    private String filmId;

    public FavouriteJSON() {}

    public String getUserId() {
        return userId;
    }

    public String getFilmId() {
        return filmId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public void setFilmId(String filmId) {
        this.filmId = filmId;
    }

    @Override
    public String toString() {
        return "AddFavouriteJSON{" +
                "userId='" + userId + '\'' +
                ", filmId='" + filmId + '\'' +
                '}';
    }
}
