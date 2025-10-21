from flask import Flask, jsonify, request
import pandas as pd
import json
import os

app = Flask(__name__)

SENSORES_FILE = "dados_sensores.csv"
USERS_FILE = "users.txt"

# 🔧 Função para carregar usuários do arquivo .txt
def load_users():
    if not os.path.exists(USERS_FILE):
        return []
    with open(USERS_FILE, 'r') as f:
        lines = f.readlines()
        return [json.loads(line.strip()) for line in lines]

# ✅ Rota GET dos sensores (mantida)
@app.route('/api/sensores', methods=['GET'])
def get_dados_sensores():
    df = pd.read_csv(SENSORES_FILE)
    dados_json = df.to_dict(orient='records')
    return jsonify(dados_json)

# ✅ Rota POST para login (sem registro)
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    users = load_users()

    for user in users:
        if user['email'] == data['email'] and user['password'] == data['password']:
            return jsonify({"message": "Login bem-sucedido", "name": user['name']}), 200

    return jsonify({"message": "Credenciais inválidas"}), 401

if __name__ == '__main__':
    app.run(debug=True)
