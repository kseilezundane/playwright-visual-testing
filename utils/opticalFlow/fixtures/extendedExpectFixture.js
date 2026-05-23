import { expect as baseExpect } from "@playwright/test";
import { motionCompensation } from "../opticalFlowChildProcess";

export const expect = baseExpect.extend({
    async toHaveOpencvScreenshot(locator, options) {
        const result = {
            name: "toHaveOpencvScreenshot",
            message: () => "Images are identical",
            pass: true,
        };
        try {
            await baseExpect(locator).toHaveScreenshot(options);
        } catch (error) {
            result.name = error.matcherResult.name;
            result.pass = error.matcherResult.pass;
            result.actual = error.matcherResult.actual;
            result.expected = error.matcherResult.expected;
            result.diff = error.matcherResult.diff;

            const motionResults = await motionCompensation({
                actualImage: error.matcherResult.actual,
                expectedImage: error.matcherResult.expected,
            });

            const threshold = process.env.MOTION_THRESHOLD || 0;

            const message = motionResults ?
                `${error.matcherResult.message}\n` +
                `Motion magnitude detected: ${motionResults.magnitude}, allowed threshold: ${threshold}.` :
                error.matcherResult.message;

            if ((motionResults?.magnitude && threshold) && (motionResults?.magnitude < threshold)) {
                process.stdout.write(
                    "DEBUG: Default image comparison failed. Optical flow results:\n" +
                    JSON.stringify(motionResults),
                );
                result.pass = true;
            }
            result.message = () => message;
        }
        return result;
    }
});
