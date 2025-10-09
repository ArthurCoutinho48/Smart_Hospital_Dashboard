# simulador_iot.py (coloque esse arquivo dentro da pasta /backend)

import random
import time
import pandas as pd
from datetime import datetime
import os

# Lista de salas
salas = ["Sala 1 - UTI", "Sala 2 - Laboratório", "Sala 3 - Sala de Reunião"]

def gerar_dados():
    sala = random.choice(salas)
    temperatura = round(random.uniform(21.0, 29.0), 1)
    umidade = round(random.uniform(40.0, 70.0), 1)
    co2 = random.randint(350, 900)
    o2 = round(random.uniform(20.0, 21.0), 2)
    energia = round(random.uniform(0.5, 3.0), 2)
    ocupacao = random.randint(0, 5)

    return {
        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "sala": sala,
        "temperatura": temperatura,
        "umidade": umidade,
        "co2": co2,
        "o2": o2,
        "energia": energia,
        "ocupacao": ocupacao
    }

# Gera várias leituras e salva no CSV
dados = [gerar_dados() for _ in range(50)]
df = pd.DataFrame(dados)

# Caminho completo: backend/dad