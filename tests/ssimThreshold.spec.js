import { expect, test } from "@playwright/test";

test("Should use experimental SSIM comparator with a configured SSIM_THRESHOLD", async ({ page }) => {
    await page.goto("https://lsm.lv/");

    await expect(page).toHaveScreenshot({ _comparator: "ssim-cie94" });
});
