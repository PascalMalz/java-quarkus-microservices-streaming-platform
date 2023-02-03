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
-- Name: GENRE; Type: TABLE; Schema: -; Owner: 
--

CREATE TABLE GENRE (
	ID		UUID			NOT NULL,
	NAME	VARCHAR(100)	NOT NULL,
	PRIMARY KEY (ID)
);

INSERT INTO GENRE VALUES
('fcb298fe-6acb-4974-951e-fcbdfbc4a58b', 'Comedy'),
('a51957f3-abec-41d2-aa7e-80fb676f1cfc', 'Drama'),
('035db1b1-bff3-4e68-b997-10ad57cfdc08', 'Kids'),
('ed5d42e4-360d-4417-9baa-d4f1ad5a6cac', 'Action')
;

--
-- Name: FILM; Type: TABLE; Schema: -; Owner: 
--

CREATE TABLE FILM (
	ID 				UUID 			NOT NULL,
	TITLE 			VARCHAR(50) 	NOT NULL,
	DESCRIPTION 	VARCHAR(2500) 	NOT NULL,
	ACTORS			VARCHAR(1000)	NOT NULL,
	LENGTH			VARCHAR(50)		NOT NULL,
	RELEASE			DATE			NOT NULL,
	AGE				VARCHAR(50)		NOT NULL,
	PRIMARY KEY (ID)
);

INSERT INTO FILM VALUES 
('90f6e9bb-534b-4fc6-a69f-acc158a7ec7f', 'Borat', 'Der kasachische TV-Star und Vorzeigepatriot Borat wird nicht eher ruhen, bis er alles über die Sitten und Gebräuche der Vereinigten Staaten von Amerika in Erfahrung gebracht hat. Aus diesem Grund begibt er sich auf eine Odyssee durch die USA. Was folgt, ist ein Reigen an politisch reichlich unkorrekten Begegnungen zwischen Borat und den amerikanischen Bürgern, die ihm erfolglos beizubringen versuchen, was einen wirklichen Amerikaner ausmacht. Borat hinterlässt eine Schneise der Verwüstung.', 'Sacha Baron Cohen, Ken Davitian, Luenell Campbell', '82 Minuten', '2006-09-08', 'FSK 12'),
('473943f2-4506-49d2-872f-4358a26f2209', '22 Jump Street', 'Schmidt und Jenko sind zurück! Allerdings unter einer neuen Adresse, denn Deputy Chief Hardy hat die Spezialeinheit für jugendliche Undercover-Einsätze nach der erfolgreichen Zerschlagung eines High School-Drogenrings mittlerweile im Gebäude gegenüber untergebracht: 22 Jump Street. Hier hat ihr Vorgesetzter Captain Dickson bereits neue Pläne für sie: Als verdeckte Ermittler sollen sie diesmal in ein College geschleust werden.', 'Jonah Hill, Channing Tatum, Ice Cube, Amber Stevens, Wyatt Russell', '112 Minuten', '2014-07-31', 'FSK 12'),
('5b4c45c7-1744-40cc-ba11-e1f7b35d688f', '96 Hours Taken', 'Nur widerwillig erlaubt Ex-CIA-Agent Bryan Mills seiner Tochter Kim, mit einer Freundin nach Paris zu reisen. Kaum ist sie dort angekommen, wird sein schlimmster Albtraum wahr: Die Freundinnen gelangen in die Fänge von albanischen Mädchenhändlern. Sogleich begibt sich Bryan selbst nach Europa, um seine Tochter zu retten. Der ehemalige Geheimdienstmitarbeiter weiß genau, was er tut, und verfolgt Kims Entführer quer durch Paris. Um sie zu finden, hat er nämlich nur 96 Stunden Zeit.', 'Liam Neeson, Maggie Grace, Famke Janssen, Olivier Rabourdin', '93 Minuten', '2009-02-19', 'FSK 16'),
('4f9f9c27-98d4-44f0-a464-cbb5b80c6c1b', 'Avengers Endgame', 'Die Hälfte allen Lebens im Universum wurde ausgelöscht und es scheint nur eine mögliche Zukunft zu geben. Besitzen die Avengers und ihre verbündeten Superhelden was nötig ist, um die vernichtende Macht der Infinity-Steine aufzuheben? Die Zeit für das letzte Spiel ist gekommen und es müssen Opfer gebracht werden.', 'Robert Downey Jr., Chris Evans, Scarlett Johansson, Mark Ruffalo, Paul Rudd, Samuel L. Jackson, Chris Hemsworth, Tom Hiddleston, Benedict Cumberbatch', '182 Minuten', '2019-04-24', 'FSK 12'),
('f3deb9a7-645e-45dd-82ae-8f5d03412730', 'Klick', ' überarbeitete Architekt Michael Newman gelangt mit Hilfe eines exzentrischen Tüftlers in den Besitz einer magischen Fernbedienung, mit der er nicht nur seinen Fernseher und die Stereoanlage steuern, sondern gleich sein ganzes Leben nach Belieben vor- und zurückspulen kann. Doch schon bald verfliegt Michaels erste Euphorie über die neugewonnene Macht, als das Hightech-Gerät anfängt, ihn selbst auf eine Art und Weise zu kontrollieren.', 'Adam Sandler, Kate Beckinsale, Christopher Walken, David Hasselhoff', '107 Minuten', '2006-09-28', 'FSK 6'),
('06717386-08e6-410d-9be1-b5101cc4768e', 'König der Löwen', 'Die ganze Tierwelt ist gerührt von der Geburt des Löwen Simba, dem Sohn von König Mufasa. Doch Mufasas hinterhältiger Bruder Scar sieht in dem Thronfolger eine Gefahr für seine eigenen Machtansprüche. Daher tötet er den König und überzeugt den verzweifelten Simba, dass er die Schuld am Tod seines Vaters trage. Der Löwenjunge flieht und begegnet dabei den Freunden Timon und Pumbaa, die ihm helfen, neuen Mut zu fassen. Er beschließt, in seine Heimat zurückzukehren und sich seinem Onkel zu stellen.', '', '88 Minuten', '1994-11-17', 'FSK 0'),
('4804d0bd-2d2f-42f4-988d-16591150534c', 'Mr. Bean macht Ferien', 'Mr. Bean hat den dauernden englischen Regen satt, ist urlaubsreif und fährt nach Südfrankreich. Dabei schafft er es in den Wettbewerb der Filmfestspiele. Wie immer ist kein Fettnäpfchen vor ihm sicher, keine Panne undenkbar, und daneben macht sich auch noch das doppelte Missverständnis breit, der wortkarge Engländer sei ein Kidnapper oder ein gefeierter Filmemacher. Dementsprechend wartet auf ihn also entweder die Gendarmerie oder die Goldene Palme.', 'Rowan Atkinson, Emma de Caunes, Max Baldry, Willem Dafoe, Jean Rochefort', '90 Minuten', '2007-03-29', 'FSK 0'),
('7ff4f8ec-ff4d-4d3d-982f-556248176e26', 'Wo ist Fred?' , 'Solange Maras Sohn sich nicht einverstanden erklärt, will sie Fred nicht heiraten. Leider hält der Junge nicht viel von ihm, ist aber ein glühender Basketballfan und wünscht sich einen signierten Ball seines Idols Mercurio Müller. Müller wirft nach jedem Spiel einen solchen Ball auf die Behinderten-Tribüne. Fred gibt sich als behindert aus, um einen Ball zu ergattern - zunächst mit Erfolg, allerdings muss er die Fassade vorrübergehend aufrechterhalten, was ihn vor größere Probleme stellt.', 'Til Schweiger, Alexandra Maria Lara, Jürgen Vogel, Anja Kling, Christoph Maria Herbst, Tanja Wenzel', '107 Minuten', '2006-11-16', 'FSK 12'),
('9cc9b89e-d93a-4cbc-9a49-328ce1464e9b', 'World War Z', 'Auf der ganzen Welt bricht eine Pandemie unerklärlichen Ursprungs aus, die die Menschen reihenweise in Zombies verwandelt. U.N.-Mitarbeiter Gerry Lane befindet sich mit seiner Familie in New York City, als die tödliche Epidemie sich weiter ausbreitet und unvorstellbares Chaos entsteht. Mit allen Mitteln versucht Gerry seine Familie aus der Stadt zu schaffen und sie in Sicherheit zu bringen.', 'Brad Pitt, Mireille Enos, Daniella Kertesz, James Badge Dale, David Morse, Matthew Fox', '116 Minuten', '2013-06-23', 'FSK 16'),
('ef36fe6c-edda-4f0f-8e69-d2b32e427d6a', 'Zoomania', 'Diese moderne, heiß-kalte Metropole ist etwas anders als andere Städte, eine Stadt der unbegrenzten Möglichkeiten, egal ob süße Maus oder coole Sau. Ein Ort an dem sich Kamel und Eisbär "Gute Nacht" sagen und wirklich absolut jedes Tier einen passenden Stadtteil findet, der für seine animalischen Bedürfnisse die richtigen Wohlfühltempera-turen bereit hält. So lebt hier ein Melting Pot an Tieren aus allen möglichen Lebensräumen und Klimazonen friedlich zusammen. Mehr oder weniger friedlich... Auch hier passieren natürlich wilde Dinge und als die junge, ehrgeizige, flotte Hasendame Hopps - Judy Hopps - frisch vom Lande und der Polizeischule in die große Stadt kommt, muss sie in einem Team knallharter, ziemlich imposanter Cops erst einmal beweisen, dass sie wirklich was drauf hat. Schnell bekommt sie ihre Chance, doch dann erweist sich ihr erster, richtiger Fall als eine Nummer größer als gedacht. Hopps ist allerdings festentschlossen, diese zwielichtige Verschwörung aufzudecken, auch wenn das bedeutet, dass sie dafür mit diesem groß-mäuligen, ausgefuchstem Trickbetrüger Nick Wilde zusammenarbeiten muss.', '', '104 Minuten', '2016-03-03', 'FSK 0')
;

--
-- Name: GENRE_FILM; Type: TABLE; Schema: -; Owner: 
--

CREATE TABLE GENRE_FILM (
	GENRE_ID	UUID	NOT NULL,
	FILM_ID		UUID	NOT NULL,
	PRIMARY KEY (GENRE_ID, FILM_ID),
	FOREIGN KEY (GENRE_ID) REFERENCES GENRE (ID),
	FOREIGN KEY (FILM_ID) REFERENCES FILM (ID)
);

INSERT INTO GENRE_FILM VALUES
('fcb298fe-6acb-4974-951e-fcbdfbc4a58b', '90f6e9bb-534b-4fc6-a69f-acc158a7ec7f'),
('fcb298fe-6acb-4974-951e-fcbdfbc4a58b', '473943f2-4506-49d2-872f-4358a26f2209'),
('ed5d42e4-360d-4417-9baa-d4f1ad5a6cac', '5b4c45c7-1744-40cc-ba11-e1f7b35d688f'),
('ed5d42e4-360d-4417-9baa-d4f1ad5a6cac', '4f9f9c27-98d4-44f0-a464-cbb5b80c6c1b'),
('fcb298fe-6acb-4974-951e-fcbdfbc4a58b', 'f3deb9a7-645e-45dd-82ae-8f5d03412730'),
('a51957f3-abec-41d2-aa7e-80fb676f1cfc', 'f3deb9a7-645e-45dd-82ae-8f5d03412730'),
('035db1b1-bff3-4e68-b997-10ad57cfdc08', '06717386-08e6-410d-9be1-b5101cc4768e'),
('fcb298fe-6acb-4974-951e-fcbdfbc4a58b', '4804d0bd-2d2f-42f4-988d-16591150534c'),
('fcb298fe-6acb-4974-951e-fcbdfbc4a58b', '7ff4f8ec-ff4d-4d3d-982f-556248176e26'),
('ed5d42e4-360d-4417-9baa-d4f1ad5a6cac', '9cc9b89e-d93a-4cbc-9a49-328ce1464e9b'),
('035db1b1-bff3-4e68-b997-10ad57cfdc08', 'ef36fe6c-edda-4f0f-8e69-d2b32e427d6a'),
('035db1b1-bff3-4e68-b997-10ad57cfdc08', '4804d0bd-2d2f-42f4-988d-16591150534c')
;

--
-- Name: FAVOURITE; Type: TABLE; Schema: -; Owner: 
--

CREATE TABLE FAVOURITE (
	USER_ID 	UUID 	NOT NULL,
	FILM_ID 	UUID 	NOT NULL,
	PRIMARY KEY (USER_ID, FILM_ID),
	FOREIGN KEY (FILM_ID) REFERENCES Film(ID)
);

INSERT INTO FAVOURITE VALUES 
('2286e936-344f-46a4-b294-1755592e4144', '90f6e9bb-534b-4fc6-a69f-acc158a7ec7f'),
('2286e936-344f-46a4-b294-1755592e4144', '473943f2-4506-49d2-872f-4358a26f2209')
;

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

