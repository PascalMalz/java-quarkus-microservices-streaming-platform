package de.ostfalia.wsamis.businessobject;

import java.io.Serializable;
import java.util.Objects;
import java.util.UUID;

/**
 * Klasse zur Repräsentation des zusammengesetzten Schlüssels der Tabelle FAVOURITE.
 */
public class FavouriteId implements Serializable {

    private UUID userId;

    private UUID filmId;

    public FavouriteId() {
        // default Constructor
    }

    public FavouriteId(UUID userId, UUID filmId) {
        this.userId = userId;
        this.filmId = filmId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        FavouriteId that = (FavouriteId) o;
        return userId.equals(that.userId) && filmId.equals(that.filmId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, filmId);
    }
}
