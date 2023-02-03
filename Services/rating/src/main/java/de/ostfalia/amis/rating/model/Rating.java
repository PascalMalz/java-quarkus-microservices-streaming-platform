package de.ostfalia.amis.rating.model;

import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.NamedQuery;
import java.time.LocalDateTime;
import java.util.Objects;
import java.util.UUID;


@Entity
@NamedQuery(
        name = "Rating.selectByFilmId",
        query = "SELECT r FROM Rating r WHERE r.filmId = :filmId"
)
public class Rating {

    @Id
    @GeneratedValue
    private UUID id;
    private UUID filmId;
    private UUID userId;
    private int value;
    @CreationTimestamp
    private LocalDateTime createTsp;

    public Rating() { }

    public Rating(UUID filmId, UUID userId, int value) {
        this.filmId = filmId;
        this.userId = userId;
        this.value = value;
    }

    public UUID getId() {
        return id;
    }

    public UUID getFilmId() {
        return filmId;
    }

    public UUID getUserId() {
        return userId;
    }

    public int getValue() {
        return value;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public void setFilmId(UUID filmId) {
        this.filmId = filmId;
    }

    public void setUserId(UUID userId) {
        this.userId = userId;
    }

    public void setValue(int value) {
        this.value = value;
    }

    public LocalDateTime getCreateTsp() {
        return createTsp;
    }

    public void setCreateTsp(LocalDateTime createTsp) {
        this.createTsp = createTsp;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Rating rating = (Rating) o;
        return id.equals(rating.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "Rating{" +
                "id=" + id +
                ", filmId=" + filmId +
                ", userId=" + userId +
                ", value=" + value +
                ", createTsp=" + createTsp +
                '}';
    }
}
