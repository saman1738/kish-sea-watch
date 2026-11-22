// Generated from tests/e2e/specs/beaches-and-live-conditions.json (spec 69742bdb0ea4a669). Edit the spec, not this file.
import { test } from "@e2e-dev/web";
import type { Locator, Screen } from "e2e";
import { expect } from "e2e";

/** Steps this flow's recording found already done; strict replay skips them, as they have nothing to replay. */
const skippedSteps: readonly number[] = JSON.parse(process.env.CAFFEINE_E2E_SKIP_STEPS ?? "[]");

const recording = process.env.CAFFEINE_E2E_MODE === "record" || process.env.CAFFEINE_E2E_MODE === "heal";

/** Whether `holds` turns true within the assertion timeout. */
async function eventually(holds: () => Promise<boolean>): Promise<boolean> {
  const deadline = Date.now() + 5000;
  for (;;) {
    if (await holds()) return true;
    if (Date.now() >= deadline) return false;
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
}

function flowChecks() {
  let failed = 0;
  return {
    /** Spec check `index`: a failure fails a strict replay at once and is kept otherwise. */
    async check(index: number, verify: () => Promise<void>, holds: () => Promise<boolean>): Promise<void> {
      if (!recording) return verify();
      if (failed === 0) {
        try {
          return await verify();
        } catch (error) {
          if ((error as { code?: unknown }).code !== "ASSERTION_FAILED") throw error;
        }
      } else if (await eventually(holds)) {
        return;
      }
      failed += 1;
      expect.soft(false, `check ${String(index)}`).toBe(true);
    },
  };
}

/** `text` as a case-insensitive pattern in which each run of spaces also matches none. */
function spacedText(text: string): RegExp {
  const words = text.trim().split(/\s+/).map((word) => word.replace(/[.*+?^$(){}|[\]\\]/g, "\\$&"));
  return new RegExp(words.join("\\s*"), "i");
}

/** Words the screen shows: visible text, the placeholder of an input that shows it, or a field that holds it right after the step that typed it. */
async function shownText(screen: Screen, text: string, typed = false, pattern?: RegExp): Promise<Locator> {
  const asText = screen.getByText(pattern ?? spacedText(text), { visible: true }).first();
  const field = pattern === undefined ? { exact: false, visible: true } : { exact: true, visible: true };
  const asPlaceholder = screen.getByPlaceholder(text, field).first();
  const asValue = screen.getByDisplayValue(text, field).first();
  for (let waited = 0; waited < 5000; waited += 250) {
    if (await asText.isVisible()) return asText;
    if (await asPlaceholder.isVisible()) return asPlaceholder;
    if (typed && (await asValue.isVisible())) return asValue;
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  return asText;
}

test("beaches-and-live-conditions", async ({ app, agent, screen }) => {
  const flow = flowChecks();
  await app.open("/");
  await flow.check(0, async () => { await expect(await shownText(screen, "Marjan Beach")).toBeVisible({ timeout: 15000 }); }, async () => (await shownText(screen, "Marjan Beach")).isVisible());
  await flow.check(1, async () => { await expect(await shownText(screen, "Water temperature")).toBeVisible({ timeout: 15000 }); }, async () => (await shownText(screen, "Water temperature")).isVisible());
  await flow.check(2, async () => { await expect(await shownText(screen, "Wave height")).toBeVisible({ timeout: 15000 }); }, async () => (await shownText(screen, "Wave height")).isVisible());
  await flow.check(3, async () => { await expect(await shownText(screen, "Wind speed")).toBeVisible({ timeout: 15000 }); }, async () => (await shownText(screen, "Wind speed")).isVisible());
  await flow.check(4, async () => { await expect(await shownText(screen, "UV index")).toBeVisible({ timeout: 15000 }); }, async () => (await shownText(screen, "UV index")).isVisible());

  if (!skippedSteps.includes(1)) await agent.act("Open the map page", { maxModelCalls: 20 });
  await flow.check(5, async () => { await expect(await shownText(screen, "Simorgh Beach")).toBeVisible(); }, async () => (await shownText(screen, "Simorgh Beach")).isVisible());
  await flow.check(6, async () => { await expect(await shownText(screen, "Mir Mahna Coastal Park")).toBeVisible(); }, async () => (await shownText(screen, "Mir Mahna Coastal Park")).isVisible());
  await flow.check(7, async () => { await expect(await shownText(screen, "Fisherman Beach Park")).toBeVisible(); }, async () => (await shownText(screen, "Fisherman Beach Park")).isVisible());
  await flow.check(8, async () => { await expect(screen.getByText(spacedText("No beaches with coordinates are available."), { exact: false, visible: true })).toHaveCount(0); }, async () => (await screen.getByText(spacedText("No beaches with coordinates are available."), { exact: false, visible: true }).count()) === 0);
});
