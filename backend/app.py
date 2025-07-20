from flask import Flask, request, jsonify
from flask_cors import CORS
from keras.models import load_model
from keras.preprocessing import image
import numpy as np
from PIL import Image
import io

MODEL_PATH = "efficientnetv2b1_model.h5"
class_names = ["basah", "kering", "sedang"]
THRESHOLD = 0.50  # 46%

model = load_model(MODEL_PATH)

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])

@app.route('/api/predict/', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    try:
        img = Image.open(file.stream).convert('RGB')
        img = img.resize((224, 224))
        img = image.img_to_array(img)
        img = np.expand_dims(img, axis=0)
        img = img / 255.0
        pred = model.predict(img)
        confidence = float(np.max(pred))
        class_idx = int(np.argmax(pred, axis=1)[0])
        if confidence < THRESHOLD:
            label = "Tidak terdeteksi"
        else:
            label = class_names[class_idx]
        return jsonify({
            'label': label,
            'confidence': confidence * 100
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True) 