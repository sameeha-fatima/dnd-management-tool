from flask import Flask, request
from dotenv import load_dotenv

app = Flask(__name__)

@app.route("/", methods=["GET"])
def main_page():
  if request.method == "GET":
    return {"message": "Hello World!"}

if __name__ == "__main__":
  app.run(port=5000, debug=True)
