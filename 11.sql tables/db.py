import psycopg2
 
conn = psycopg2.connect(dbname="postgres", user="postgres", password="1111", host="127.0.0.1")
cursor = conn.cursor()
 
conn.autocommit = True
# команда для создания базы данных ipdb
sql = "SELECT 'CREATE DATABASE ipdb' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'ipdb')"
 
# выполняем код sql
cursor.execute(sql)
print("База данных успешно создана")
 

conn = psycopg2.connect(dbname="ipdb", user="postgres", password="1111", host="127.0.0.1")
cursor = conn.cursor()
 
# создаем таблицу people
cursor.execute("Drop TABLE people;")
cursor.execute("CREATE TABLE people (id SERIAL PRIMARY KEY, name VARCHAR(50),  age INTEGER, russian bool, iq INTEGER);")
# поддверждаем транзакцию
conn.commit()
print("Таблица people успешно создана")
 

# добавляем строку в таблицу people
cursor.execute("INSERT INTO people (name, age, russian, iq) VALUES "+
               "('Tom', 42, false, 100),"+
               "('Gek', 34, true, 80),"+
               "('El', 36, true, 200),"+
               "('En', 12, false, 132),"+
               "('Em', 45, false, 82),"+
               "('Erron', 38, false, 101),"+
               "('Ruk', 24, false, 110),"+
               "('Rem', 19, true, 99),"+
               "('Mikasa', 27, true, 140),"+
               "('Light', 16, false, 123),"+
               "('Misa', 23, false, 102)")
# выполняем транзакцию
conn.commit()  
print("Данные добавлены")
 # получаем все данные из таблицы people
cursor.execute("SELECT * FROM people")
print(cursor.fetchall())
 
cursor.close()
conn.close()
input()