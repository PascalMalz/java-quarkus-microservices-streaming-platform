package de.ostfalia.amis.comments.model;

import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Objects;
import java.util.UUID;

@Entity
@NamedQuery(
    name = "Comment.selectByFilmId",
    query = "SELECT c FROM Comment c WHERE c.filmId = :filmId"
)
public class Comment {

    @Id
    @GeneratedValue
    private UUID id;
    private UUID filmId;
    private UUID userId;
    private String text;
    @CreationTimestamp
    private LocalDateTime createTsp;

    public Comment() { }

    public Comment(UUID filmId, UUID userId, String text) {
        this.filmId = filmId;
        this.userId = userId;
        this.text = text;
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

    public String getText() {
        return text;
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

    public void setText(String text) {
        this.text = text;
    }

    public LocalDateTime getCreateTsp() {
        return createTsp;
    }

    public void setCreateTsp(LocalDateTime createTsp) {
        this.createTsp = createTsp;
    }

    @Override
    public String toString() {
        return "Comment{" +
                "id=" + id +
                ", filmId=" + filmId +
                ", userId=" + userId +
                ", text='" + text + '\'' +
                ", createTsp=" + createTsp +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Comment comment = (Comment) o;
        return id.equals(comment.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
