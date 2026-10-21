import { test, expect } from '@playwright/test';

test('selected Live Trail work accepts durable contextual direction without resuming a paused run', async ({
  page,
  request,
}) => {
  const runs = await (await request.get('/api/runs')).json();
  const state = runs.find(
    (r: { goal: string; status: string }) =>
      r.goal.startsWith('TEST FIXTURE selected graph control:') && r.status === 'PAUSED',
  );
  expect(state).toBeTruthy();
  const node = state.nodes.find(
    (n: { kind: string; criterionId: string }) => n.kind === 'task' && n.criterionId === 'render',
  );
  expect(node).toBeTruthy();
  await page.goto('/');
  await page.getByRole('button', { name: 'Browse runs', exact: true }).click();
  await page
    .getByRole('dialog', { name: 'Existing runs', exact: true })
    .getByRole('button', { name: new RegExp(state.id) })
    .click();
  await page
    .getByRole('button', { name: /Live Trail/ })
    .first()
    .click();
  await page.locator(`.react-flow__node[data-id="${node.id}"]`).click();
  const region = page.getByRole('region', { name: 'Steer selected work', exact: true });
  await expect(region).toBeVisible();
  await expect(region.getByText(node.title, { exact: true })).toBeVisible();
  const text = 'Make the empty-name result understandable before visual refinements.';
  await region.getByLabel('Instruction for selected work', { exact: true }).fill(text);
  await region.getByRole('button', { name: 'Send instruction', exact: true }).click();
  await expect(region.getByRole('status')).toContainText(/saved|recorded|salvat/i);
  const updated = await (await request.get(`/api/runs/${state.id}`)).json();
  const note = updated.notes.find((n: { text: string }) => n.text === text);
  expect(note).toBeTruthy();
  expect(note.context).toEqual({
    nodeId: node.id,
    criterionId: 'render',
    contractVersion: state.contractVersion,
  });
  expect(updated.status).toBe('PAUSED');
  expect(updated.contract).toEqual(state.contract);
  await page.locator('.react-flow__node[data-id="acceptance-render"]').click();
  const criterionText =
    'Keep this acceptance criterion intact while improving the selected result.';
  await region.getByLabel('Instruction for selected work', { exact: true }).fill(criterionText);
  const saved = page.waitForResponse(
    (response) =>
      response.url().endsWith(`/api/runs/${state.id}/direction`) &&
      response.request().method() === 'POST',
  );
  await region.getByRole('button', { name: 'Send instruction', exact: true }).click();
  expect((await saved).status()).toBe(201);
  const criterionState = await (await request.get(`/api/runs/${state.id}`)).json();
  expect(
    criterionState.notes.find((n: { text: string }) => n.text === criterionText).context,
  ).toEqual({
    criterionId: 'render',
    contractVersion: state.contractVersion,
  });
  expect(criterionState.status).toBe('PAUSED');
  expect(criterionState.contract).toEqual(state.contract);
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(region).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false);
});
