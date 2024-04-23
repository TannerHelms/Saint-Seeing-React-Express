import asyncio
from bullmq import Worker
from prisma import Prisma
from dotenv import load_dotenv
from PIL import Image
from io import BytesIO
import requests

load_dotenv()


async def process(job, job_token):
    """Process a job that involves downloading, cropping, and uploading an image."""
    db = Prisma()
    await db.connect()

    photo_url = job.data.get("photoUrl")
    if not photo_url:
        raise ValueError("Photo URL not provided in job data.")

    # Split the photo URL to extract base URL and path
    split_result = photo_url.split("/")
    base_url = "/".join(split_result[:3])
    path = "/".join(split_result[3:])

    # Fetch the image from the given URL
    response = requests.get(photo_url)
    response.raise_for_status()  # Raise an exception if the request failed

    # Load the image into a Pillow object
    image = Image.open(BytesIO(response.content))

    # Determine the shorter edge to create a square crop
    min_side = min(image.width, image.height)

    # Calculate the coordinates for the square crop
    left = (image.width - min_side) / 2
    top = (image.height - min_side) / 2
    right = left + min_side
    bottom = top + min_side

    # Crop the image to a square aspect ratio
    image = image.crop((int(left), int(top), int(right), int(bottom)))

    # Resize the cropped image to 1000x1000 pixels
    image = image.resize((1000, 1000), Image.LANCZOS)

    # Save the image to a temporary in-memory file
    output_io = BytesIO()
    image.save(output_io, "JPEG", quality=85)  # Save with compression
    output_io.seek(0)  # Rewind to the start of the stream
    # Send the image to the specified server endpoint
    upload_endpoint = f"{base_url}/upload"
    files = {"file": (path, output_io, "image/jpeg")}
    data = {"path": path}

    # Send the POST request to upload the image
    upload_response = requests.post(upload_endpoint, files=files, data=data)

    # Check if the upload was successful
    if upload_response.status_code != 200:
        raise Exception("Image upload failed with status code:", upload_response.status_code)

    print(f"Job {job.id} completed successfully.")


async def main():
    print('worker starting...')
    # Feel free to remove the connection parameter, if your redis runs on localhost
    worker = Worker("compress", process)

    # This while loop is just for the sake of this example
    # you won't need it in practice.
    while True:  # Add some breaking conditions here
        await asyncio.sleep(1)

    # When no need to process more jobs we should close the worker
    await worker.close()


if __name__ == "__main__":
    asyncio.run(main())