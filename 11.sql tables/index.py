import http.server
import socketserver
import json
import math
import psycopg2
 
conn = psycopg2.connect(dbname="ipdb", user="postgres", password="1111", host="localhost")
cursor = conn.cursor()
PORT = 8000

class MyHttpHandler(http.server.SimpleHTTPRequestHandler):
    def do_POST(self):
        if self.path == '/query':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            post_dict = json.loads(post_data)
            print(post_dict)
            # Получение данных, которые передал клиент
            code = post_dict.get('code', 'select')
            query = str(post_dict.get('query', '0'))
            # Выполнение операции
            if(code == "user_query"):
                pass
            if(code == "select"):
                query = "SELECT * FROM people;"
            if(code == "delete"):
                ids = query.split(' ')
                query = "DELETE FROM people WHERE id<0 " 
                for i in ids:
                    if(i==''):continue
                    query+=f"OR id = {i} "
                query+=';'
                cursor.execute(query)
                query = "SELECT * FROM people;"
            if(code == "insert"):
                cursor.execute(query)
                query = "SELECT * FROM people;"
            if(code == "update"):
                cursor.execute(query)
                query = "SELECT * FROM people;"
            # Отправка ответа клиенту
            cursor.execute(query)

            titles = [desc[0] for desc in cursor.description]
            response_data = json.dumps(cursor.fetchall()+[titles])
            self.send_response(200)
            self.send_header('Content-type', 'text/plain')
            self.end_headers()
            self.wfile.write(response_data.encode('utf-8'))
            conn.commit()

        else:
            # Если путь не /calculate, используйте стандартную обработку
            super().do_POST()

Handler = MyHttpHandler
Handler.extensions_map={
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '': 'application/octet-stream', 
}
with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print("Сервер запущен на порту ", PORT)
    httpd.serve_forever()

