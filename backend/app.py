from flask import Flask
from routes import trivia_api

app = Flask(__name)
app.register_blueprint(trivia_api)

if __name__ == '__main__':
    app.run()