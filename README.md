# Playwright visual testing enhancements

Template project for Playwright visual testing process modifications

## Prerequisites

- Executor should have Node.js, Python 3.x and opencv installed.
- Dependencies should be installed via `yarn` command from the root.
- Playwright dependencies should be installed via `yarn playwright install` command from the root.

## Launching the templates

There are 3 scripts to launch a template for each of the enhancement approaches:

- `yarn gaussian` - launches a test with a 1px Gaussian blur;

- `yarn opticalFlow` - launches a test with an OpenCV optical flow algorithm alongside standard comparison with
pre-configured motion threshold value of 3;

- `yarn ssim` - launches a test with pre-configured SSIM threshold value of 0.95.

Please note that these are templates that open and screenshot an LSM homepage, not the actual scenarios.
