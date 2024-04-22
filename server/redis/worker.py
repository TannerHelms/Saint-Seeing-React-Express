import asyncio
from bullmq import Worker
from prisma import Prisma
from dotenv import load_dotenv

load_dotenv()


async def process(job, job_token):
    db = Prisma()
    await db.connect()
    jobId = job.data['jobId']
    photoUrl = job.data['photoUrl']
    print(photoUrl)
    print(f"Job {job.id} completed")


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