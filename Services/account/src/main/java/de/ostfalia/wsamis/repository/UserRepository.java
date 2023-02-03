package de.ostfalia.wsamis.repository;


import de.ostfalia.wsamis.businessobject.User;
import de.ostfalia.wsamis.businessobject.User_;

import javax.enterprise.context.ApplicationScoped;
import javax.persistence.EntityManager;
import javax.persistence.EntityNotFoundException;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import java.util.List;
import java.util.UUID;

@ApplicationScoped
public class UserRepository {


    @PersistenceContext
    private EntityManager entityManager;

    public List<User> getUserByUserId(UUID userId) {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();

        CriteriaQuery<User> query = criteriaBuilder.createQuery(User.class);

        Root<User> root  = query.from(User.class);
        query.select(root);

        query.where(criteriaBuilder.equal(root.get(User_.id), userId));

        return entityManager.createQuery(query).getResultList();
    }

    public void addUserToUsers(User newUser) {
        entityManager.persist(newUser);
    }

    public User getUserByEmailAndPassword(String email, String password)throws NoResultException {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();

        CriteriaQuery<User> query = criteriaBuilder.createQuery(User.class);

        Root<User> root  = query.from(User.class);
        query.select(root);
        query.where(criteriaBuilder.and(criteriaBuilder.equal(root.get(User_.email),email), criteriaBuilder.equal(root.get(User_.password),password)));
        return entityManager.createQuery(query).getSingleResult();
    }


}
