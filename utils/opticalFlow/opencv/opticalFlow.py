import cv2 as cv
from datetime import datetime, timedelta
import json
import sys

def main():
    start = datetime.now()

    actual, expected = process_arguments()

    try:
        actual_img = cv.imread(actual)
        expected_img = cv.imread(expected)

        actual_grey = cv.cvtColor(actual_img, cv.COLOR_BGR2GRAY)
        expected_grey = cv.cvtColor(expected_img, cv.COLOR_BGR2GRAY)

        flow = cv.calcOpticalFlowFarneback(actual_grey, expected_grey, None, 0.5, 3, 15, 30, 5, 1.2, 0)
        magnitude, angle = cv.cartToPolar(flow[..., 0], flow[..., 1])

        end = datetime.now()
        delta = timedelta(microseconds=(end - start).microseconds)

        output = {
            "magnitude": float(magnitude.max()),
            "angle": float(angle.max()),
            "duration": str(delta),
        }
        dump = json.dumps(output)
        print(dump)
    except Exception as error:
        print(f"Failed to compare images: {error}")
        exit(1)

def process_arguments():
    try:
        actual, expected = sys.argv[1:3]
        return actual, expected
    except:
        print("Missing inputs for the script, please specify paths to images: ./opticalFlow.py path/actual/img path/expected/img")
        exit(1)

if __name__ == "__main__":
    main()
