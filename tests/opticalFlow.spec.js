import { test } from "@playwright/test";
import { expect } from "../utils/opticalFlow/fixtures/extendedExpectFixture";


test("Should apply Optical Flow algorithm with a configured MOTION_THRESHOLD when default visual comparison fails", async ({ page }) => {
    await page.goto("https://lsm.lv/");

    await expect(page).toHaveOpencvScreenshot();
});
