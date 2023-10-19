import os
import flask
from werkzeug.utils import secure_filename
from PIL import Image

from ultralytics import YOLO

MODELS_FOLDER = "models"

STATIC_FOLDER = "static"
ALLOWED_EXTENSIONS = {"jpg", "jpeg"}

app = flask.Flask(__name__)

app.config['STATIC_FOLDER'] = STATIC_FOLDER

def is_valid(filename):
    return '.' in filename and \
            filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route("/predict", methods=["POST"])
def predict():
  try:
    if "images" not in flask.request.files:
      data = {
        "error": {
          "message": "No images attached."
        }
      }
      statusCode = 400
      return data, statusCode
    
    files = flask.request.files.getlist("images")
    urls = list()
    for file in files:
      if file and is_valid(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['STATIC_FOLDER'], filename)
        # Load the pretrained model
        model = YOLO(os.path.join(MODELS_FOLDER, 
                                  "yolov8_segmentation_fractureAtlas.pt"))
        # Open an image using PIL
        source = Image.open(file)
        # Run inference on the source
        results = model(source)
        # Show the results
        for result in results:
          im_array = result.plot() # Plot a BGR numpy array of predictions
          im = Image.fromarray(im_array[..., ::-1]) # RGB PIL image
          im.save(filepath) # Save image
          # Get URL for prediction image
          urls.append(flask.url_for("static", filename=filename)) 

    data = {
      "urls": urls
    }
    statusCode = 200
    return data, statusCode
  
  except Exception as e:
    data = {
      "error": {
        "message": e
      }
    }
    statusCode = 500
    return data, statusCode