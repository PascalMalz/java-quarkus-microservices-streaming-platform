package de.ostfalia.wsamis.businessobject;

import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;
import java.util.UUID;

@StaticMetamodel(Favourite.class)
public class Favourite_ {

    public static volatile SingularAttribute<Favourite, UUID> userId;
    public static volatile SingularAttribute<Favourite, UUID> filmId;
    public static volatile SingularAttribute<Favourite, Film> film;
}
