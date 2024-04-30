import asyncio
from bullmq import Worker
# from prisma import Prisma
from dotenv import load_dotenv
from PIL import Image, ImageOps
from io import BytesIO
import requests
import os

load_dotenv()


async def fetch_image(photo_url):
    response = requests.get(photo_url)
    response.raise_for_status()
    return Image.open(BytesIO(response.content)).convert('RGB')

def square_crop(image):
    min_side = min(image.width, image.height)
    left = (image.width - min_side) / 2
    top = (image.height - min_side) / 2
    right = left + min_side
    bottom = top + min_side
    return image.crop((int(left), int(top), int(right), int(bottom)))

def resize_image(image, size=(1000, 1000)):
    return image.resize(size, Image.LANCZOS)

async def upload_image(upload_endpoint, path, image):
    output_io = BytesIO()
    image.save(output_io, "JPEG", quality=85)
    output_io.seek(0)
    
    files = {"file": (path, output_io, "image/jpeg")}
    data = {"path": path}
    response = requests.post(upload_endpoint, files=files, data=data)
    
    if response.status_code != 200:
        raise Exception(f"Image upload failed with status code: {response.status_code}")

async def process(job, job_token):
    photo_url = job.data.get("photoUrl")
    if not photo_url:
        raise ValueError("Photo URL not provided in job data.")
    
    split_result = photo_url.split("/")
    base_url = "/".join(split_result[:3])
    path = "/".join(split_result[3:])

    image = fetch_image(photo_url)
    image = ImageOps.exif_transpose(image)

    cropped_image = square_crop(image)
    resized_image = resize_image(cropped_image)

    upload_endpoint = f"{base_url}/upload"
    await upload_image(upload_endpoint, path, resized_image)

    print(f"Job {job.id} completed successfully.")


async def main():
    print('work is starting...')
    # Feel free to remove the connection parameter, if your redis runs on localhost
    worker = Worker("compress", process, {"connection" : {
        "host": 'host.docker.internal',
        "port": os.getenv('REDIS_PORT'),
    }})

    # This while loop is just for the sake of this example
    # you won't need it in practice.
    while True:  # Add some breaking conditions here
        await asyncio.sleep(1)

    # When no need to process more jobs we should close the worker
    await worker.close()


if __name__ == "__main__":
    asyncio.run(main())