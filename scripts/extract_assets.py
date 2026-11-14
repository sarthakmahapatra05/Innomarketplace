import os
from PIL import Image

uploaded_dir = r'C:/Users/sarth/.gemini/antigravity/brain/79517859-723e-43c6-9edf-7ccbf0b35733/.user_uploaded'
out_dir = r'./public/images'
os.makedirs(out_dir, exist_ok=True)

if os.path.exists(uploaded_dir):
  for f in os.listdir(uploaded_dir):
    pass
