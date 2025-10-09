from flask import Flask, jsonify
import pandas as pd

app = Flask(__name__)

# Carrega os dados simulados do CSV
df = pd.read_csv("dados_sensores.csv")

@app.route('/api/sensores', methods=['GET'])
def get_dados_sensores():
    # Converte os dados do CSV para JSON
    dados_json = df.to_dict(orient='records')
    return jsonify(dados_json)

if __name__ == '__main__':
    app.run(debug=True)