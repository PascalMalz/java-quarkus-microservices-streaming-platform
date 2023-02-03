package de.ostfalia.wsamis.businessobject;

public class UserJSON {
    private String email;

    private String password;

    public UserJSON() {}

    public String getEmail() {return email;}

    public String getPassword() {return password;}

    public void setEmail(String email) {this.email = email;}

    public void setPassword(String password) {this.password = password;}

    @Override
    public String toString(){
        return "AddUserJSON{" +
                "email='" + email + '\'' +
                ", passwort = '" + password +
                '}';
    }
}
