import { expect, test } from "@playwright/test";

test("home page boots and renders the project title", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Aarshiya Science Learning System" }),
  ).toBeVisible();
});
