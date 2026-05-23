import { expect, test } from "@playwright/test";

test("Should apply Gaussian blur before image comparison", async ({ page }) => {
    await page.goto("https://lsm.lv/");

    await expect(page).toHaveScreenshot({ stylePath: "utils/gaussianBlur/gaussianBlur.css" });
});
