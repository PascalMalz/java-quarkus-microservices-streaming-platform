package de.ostfalia.amis.comments.service;

import de.ostfalia.amis.comments.model.Comment;
import de.ostfalia.amis.comments.repository.CommentsRepository;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.util.List;
import java.util.UUID;

@ApplicationScoped
public class CommentsService {

    private final CommentsRepository commentsRepository;

    @Inject
    public CommentsService(CommentsRepository commentsRepository) {
        this.commentsRepository = commentsRepository;
    }

    public List<Comment> getCommentsByFilm(String filmId) {
        return commentsRepository.getCommentsByFilmId(UUID.fromString(filmId));
    }

    public void saveComment(String filmId, String userId, String text) {

        Comment newComment = new Comment(UUID.fromString(filmId), UUID.fromString(userId), text);
        commentsRepository.saveComment(newComment);
    }

    /**
     * Gibt einen Kommentar anhand der Film-ID zurück.
     *
     * @param filmId - ID des Films
     * @return Kommentar
     */
    public Comment getCommentByFilmId(String filmId) {
        return commentsRepository.getCommentByFilmId(UUID.fromString(filmId));
    }

}
