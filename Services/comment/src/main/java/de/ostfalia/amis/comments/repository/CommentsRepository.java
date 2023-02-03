package de.ostfalia.amis.comments.repository;

import de.ostfalia.amis.comments.model.Comment;

import javax.enterprise.context.ApplicationScoped;
import javax.persistence.EntityManager;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;
import java.util.UUID;

@ApplicationScoped
public class CommentsRepository {

    @PersistenceContext
    private EntityManager entityManager;

    public List<Comment> getCommentsByFilmId(UUID filmId) {
        return this.entityManager.createNamedQuery("Comment.selectByFilmId", Comment.class)
        .setParameter("filmId", filmId)
        .getResultList();
    }

    @Transactional
    public void saveComment(Comment comment) {
        try {
            this.entityManager.persist(comment);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

        /**
     * Gibt den Kommentar anhand der ID aus der Datenbank zurück
     *
     * @param filmId - ID des Films
     * @return text - Kommentartext
     */
    public Comment getCommentByFilmId(UUID filmId) {
        return entityManager.find(Comment.class, filmId);
    }
}
