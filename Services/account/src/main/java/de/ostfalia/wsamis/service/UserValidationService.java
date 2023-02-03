package de.ostfalia.wsamis.service;

import de.ostfalia.wsamis.businessobject.User;
import de.ostfalia.wsamis.repository.UserRepository;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityNotFoundException;
import javax.persistence.NoResultException;
import java.util.UUID;

@ApplicationScoped
public class UserValidationService {
    private UserRepository userRepository;

    public UUID userValidation(String email, String password) {
    try{
        User user = userRepository.getUserByEmailAndPassword(email, password);
        return user.getId();
    }catch (NoResultException exception){
        return null;
    }
    }

    @Inject
    public UserValidationService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
}
