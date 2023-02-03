--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.5
-- Dumped by pg_dump version 9.5.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: wsamis; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE "wsamis" WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'de_DE.UTF-8' LC_CTYPE = 'de_DE.UTF-8';


ALTER DATABASE "wsamis" OWNER TO postgres;

\connect -reuse-previous=on "dbname='wsamis'"

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

--
-- Name: FILM; Type: TABLE; Schema: -; Owner: 
--

CREATE TABLE Rating (
	id	        UUID 			NOT NULL,
	userId   	UUID 			NOT NULL,
	filmId	    UUID 			NOT NULL,
    value       INT          	NOT NULL,
    createTsp   TIMESTAMP    	NOT NULL,
	PRIMARY KEY (id)
);

INSERT INTO Rating VALUES 
('df7a076b-5f92-451a-bfec-9f9ff00a666b', '2286e936-344f-46a4-b294-1755592e4144', '90f6e9bb-534b-4fc6-a69f-acc158a7ec7f', 5, CURRENT_TIMESTAMP);

--TODO INSERT INTO COMMENT VALUES


--
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;

--
-- PostgreSQL database dump complete
--

