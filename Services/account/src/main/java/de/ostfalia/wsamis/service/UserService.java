package de.ostfalia.wsamis.service;


import de.ostfalia.wsamis.businessobject.User;
import de.ostfalia.wsamis.repository.UserRepository;
import io.vertx.core.impl.cpu.CpuCoreSensor;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;

@ApplicationScoped
public class UserService {
    private UserRepository userRepository;


    @Transactional
    public void addUser(String email, String password) {
        userRepository.addUserToUsers(new User(email, password));
    }

    @Inject
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

}