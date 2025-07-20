import gradio as gr
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np

MODEL_PATH = "efficientnetv2b1_model.h5"
class_names = ["basah", "kering", "sedang"]
THRESHOLD = 0.46  # 46%

model = load_model(MODEL_PATH)

def predict_apel(img):
    img = img.resize((224, 224))
    img = image.img_to_array(img)
    img = np.expand_dims(img, axis=0)
    img = img / 255.0
    pred = model.predict(img)
    confidence = float(np.max(pred))
    class_idx = int(np.argmax(pred, axis=1)[0])
    if confidence < THRESHOLD:
        return ("Tidak terdeteksi", confidence * 100)
    return (class_names[class_idx], confidence * 100)

iface = gr.Interface(
    fn=predict_apel,
    inputs=gr.Image(type="pil"),
    outputs=[gr.Text(label="Label"), gr.Number(label="Confidence (%)")],
    title="Klasifikasi Kekeringan Apel"
)

iface.launch(server_name="0.0.0.0", server_port=7860) 