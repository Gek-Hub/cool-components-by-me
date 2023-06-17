import http.server
import socketserver
import json
import math
PORT = 8000

class MyHttpHandler(http.server.SimpleHTTPRequestHandler):

    def do_POST(self):
        if self.path == '/calculate':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            post_dict = json.loads(post_data)
            print(post_dict)
            # Получение данных, которые передал клиент
            first_number = float(post_dict.get('firstNumber', '0'))
            second_number = float(post_dict.get('secondNumber', '0'))
            operation = post_dict.get('operation', '0')
            # Выполнение операции
            if operation == '+':
                result = first_number + second_number
                operator = '+'
            elif operation == '-':
                result = first_number - second_number
                operator = '-'
            elif operation == '*':
                result = first_number * second_number
                operator = '*'
            elif operation == '/':
                if second_number == 0:
                    result = 'infinity'
                else:
                    result = first_number / second_number
                operator = '/'
            elif operation =="^":
             result = pow(first_number, second_number)
            elif operation == "%":
             result = first_number % second_number
            elif operation == "cos":
             result = first_number * math.cos((second_number * 3.1415) / 180)
            else:
                result = first_number + second_number
                operator = '+'

            
            # Отправка ответа клиенту
            response_data = f'{first_number} {operation} {second_number} = {result}'
            self.send_response(200)
            self.send_header('Content-type', 'text/plain')
            self.end_headers()
            self.wfile.write(response_data.encode('utf-8'))
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

