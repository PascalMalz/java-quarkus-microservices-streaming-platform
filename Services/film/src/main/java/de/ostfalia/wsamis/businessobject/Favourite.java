package de.ostfalia.wsamis.businessobject;

import javax.persistence.*;
import java.util.Objects;
import java.util.UUID;

/**
 * Entity zur Repräsentation der Datenbanktabelle FAVOURITE.
 */
@Entity
@IdClass(FavouriteId.class)
public class Favourite {

    @Id
    @Column(name = "USER_ID")
    private UUID userId;

    @Id
    @Column(name = "FILM_ID")
    private UUID filmId;

    @ManyToOne
    @MapsId("filmId")
    @JoinColumn(name = "FILM_ID")
    private Film film;

    public Favourite() {
    }

    public Favourite(UUID userId, UUID filmId, Film film) {
        this.userId = userId;
        this.filmId = filmId;
        this.film = film;
    }

    public UUID getUserId() {
        return userId;
    }

    public UUID getFilmId() {
        return filmId;
    }

    public Film getFilm() {
        return film;
    }

    public void setUserId(UUID userId) {
        this.userId = userId;
    }

    public void setFilmId(UUID filmId) {
        this.filmId = filmId;
    }

    public void setFilm(Film film) {
        this.film = film;
    }

    @Override
    public String toString() {
        return "Favourite{" +
                "userId=" + userId +
                ", filmId=" + filmId +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Favourite favourite = (Favourite) o;
        return userId.equals(favourite.userId) && filmId.equals(favourite.filmId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, filmId);
    }
}
