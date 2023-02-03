package de.ostfalia.wsamis.businessobject;

import javax.persistence.*;
import java.sql.Date;
import java.util.Objects;
import java.util.Set;
import java.util.UUID;

/**
 * Entity zur Repräsentation der Datenbanktabelle FILM.
 */
@Entity
public class Film {

    @Id
    @GeneratedValue
    private UUID id;

    private String description;

    private String title;

    private String actors;

    private String length;

    private Date release;

    private String age;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "GENRE_FILM",
        joinColumns = @JoinColumn(name = "FILM_ID"),
        inverseJoinColumns = @JoinColumn(name = "GENRE_ID")
    )
    private Set<Genre> genres;

    public Film() {
        // default constructor
    }

    public Film(String title, String description) {
        this.title = title;
        this.description = description;
    }

    public UUID getId() {
        return id;
    }

    public String getDescription() {
        return description;
    }

    public String getTitle() {
        return title;
    }

    public String getActors() {
        return actors;
    }

    public String getLength() {
        return length;
    }

    public Date getRelease() {
        return release;
    }

    public String getAge() {
        return age;
    }

    public Set<Genre> getGenres() {
        return genres;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setActors(String actors) {
        this.actors = actors;
    }

    public void setLength(String length) {
        this.length = length;
    }

    public void setRelease(Date release) {
        this.release = release;
    }

    public void setAge(String age) {
        this.age = age;
    }

    public void setGenres(Set<Genre> genres) {
        this.genres = genres;
    }

    @Override
    public String toString() {
        return "Film{" +
                "id=" + id +
                ", description='" + description + '\'' +
                ", title='" + title + '\'' +
                ", actors='" + actors + '\'' +
                ", length='" + length + '\'' +
                ", release=" + release +
                ", age='" + age + '\'' +
                ", genres=" + genres +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Film film = (Film) o;
        return id.equals(film.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
