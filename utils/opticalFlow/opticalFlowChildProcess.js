import * as child_process from "node:child_process";

const PYTHON = process.platform === "win32" ? "python" : "python3";

export async function motionCompensation(params) {
    const { actualImage, expectedImage } = params;

    try {
        const motions = await executeScript(
            `${PYTHON} opticalFlow.py ${actualImage} ${expectedImage}`,
            { cwd: "./utils/opticalFlow/opencv" },
        );
        return motions && JSON.parse(motions);
    } catch (error) {
        console.warn(`Failed to compare screenshots with opencv Optical flow algorithm:\n${error}`);
    }
}

async function executeScript(cmd, options) {
    return new Promise((resolve, reject) => {
        child_process.exec(cmd, options, (err, output, stderr) => {
            if (err) {
                reject(output || err);
            }
            resolve(output.toString());
        });
    });
}
