package de.ostfalia.wsamis.businessobject;

import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;
import java.util.Date;
import java.util.UUID;

@StaticMetamodel(Film.class)
public class Film_ {

    public static volatile SingularAttribute<Film, UUID> id;
    public static volatile SingularAttribute<Film, String> title;
    public static volatile SingularAttribute<Film, String> description;
    public static volatile SingularAttribute<Film, String> actors;
    public static volatile SingularAttribute<Film, String> length;
    public static volatile SingularAttribute<Film, Date> release;
}
