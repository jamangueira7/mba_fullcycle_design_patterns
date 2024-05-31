drop schema branas;

create schema branas DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci; ;

use branas;

create table branas.contract (
                                 id_contract VARCHAR(50) DEFAULT (UUID()) primary key,
                                 description text,
                                 amount float,
                                 periods integer,
                                 date timestamp
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

create table branas.payment (
                                id_payment VARCHAR(50) DEFAULT (UUID()) primary key,
                                id_contract VARCHAR(50),
                                amount float,
                                date timestamp,
                                FOREIGN KEY (id_contract)
                                    REFERENCES contract(id_contract)
                                    ON DELETE CASCADE
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

insert into branas.contract values ('4224a279-c162-4283-86f5-1095f559b08c', 'Prestação de serviços escolares', 6000, 12, '2024-01-01T10:00:00');
insert into branas.contract values ('ba4d9b95-1f10-4add-92e8-f1ca16d77282', 'Prestação de serviços escolares', 1200, 12, '2024-01-01T10:00:00');
insert into branas.payment values ('c931d9db-c8d8-44d4-8861-b3d6b734c64e', '4224a279-c162-4283-86f5-1095f559b08c', 6000, '2024-01-05T10:00:00');
insert into branas.payment values ('cb54af19-27cc-4c95-bc90-8d94fa4b18f7', 'ba4d9b95-1f10-4add-92e8-f1ca16d77282', 12, '2024-01-05T10:00:00');