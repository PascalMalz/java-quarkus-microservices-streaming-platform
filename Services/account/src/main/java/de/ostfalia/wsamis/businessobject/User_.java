package de.ostfalia.wsamis.businessobject;

import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;
import java.util.UUID;

@StaticMetamodel(User.class)
public class User_ {


    public static volatile SingularAttribute<User, UUID> id;
    public static volatile SingularAttribute<User, String> email;
    public static volatile SingularAttribute<User, String> password;
}
