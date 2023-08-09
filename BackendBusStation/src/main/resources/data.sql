INSERT INTO `user` (id, username, password, role)
              VALUES (1,'miroslav','$2y$12$NH2KM2BJaBl.ik90Z1YqAOjoPgSd0ns/bF.7WedMxZ54OhWQNNnh6','ADMIN');
INSERT INTO `user` (id, username, password, role)
              VALUES (2,'tamara','$2y$12$DRhCpltZygkA7EZ2WeWIbewWBjLE0KYiUO.tHDUaJNMpsHxXEw9Ky','KORISNIK');
INSERT INTO `user` (id, username, password, role)
              VALUES (3,'petar','$2y$12$i6/mU4w0HhG8RQRXHjNCa.tG2OwGSVXb0GYUnf8MZUdeadE4voHbC','KORISNIK');

              
INSERT INTO prevoznici (id, naziv, adresa, pib) VALUES (1, 'Zoki Prevoz', 'Safarikova 23', '123456789');
INSERT INTO prevoznici (id, naziv, adresa, pib) VALUES (2, 'Boki Prevoz', 'Cara Dusana 23', '987654321');
INSERT INTO prevoznici (id, naziv, adresa, pib) VALUES (3, 'Goki Prevoz', 'Carice Milice 23', '1234598765');
INSERT INTO prevoznici (id, naziv, adresa, pib) VALUES (4, 'Sima Prevoz', 'Cara Lazara 23', '543216789');
INSERT INTO prevoznici (id, naziv, adresa, pib) VALUES (5, 'Pera Prevoz', 'Kralja Petra I 23', '134679258');


INSERT INTO linije (id, broj_mesta, cena_karte, vreme_polaska, destinacija, prevoznik_id) 
	VALUES (1, 50, 1300.50, '12:56', 'Novi Sad', 1);
INSERT INTO linije (id, broj_mesta, cena_karte, vreme_polaska, destinacija, prevoznik_id) 
	VALUES (2, 45, 850.30, '10:30', 'Subotica', 2);
INSERT INTO linije (id, broj_mesta, cena_karte, vreme_polaska, destinacija, prevoznik_id) 
	VALUES (3, 55, 1500.50, '22:45', 'Sombor', 3);
INSERT INTO linije (id, broj_mesta, cena_karte, vreme_polaska, destinacija, prevoznik_id) 
	VALUES (4, 40, 1700.50, '13:00', 'Kraljevo', 4);
INSERT INTO linije (id, broj_mesta, cena_karte, vreme_polaska, destinacija, prevoznik_id) 
	VALUES (5, 60, 700.50, '06:15', 'Leskovac', 5);