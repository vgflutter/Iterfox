import { test, expect } from '@playwright/test';

// HTTP project data are explicit test fixtures. This case exercises the actual
// project UI and continuation preparation, never a model call or authorization.
test('project memory and milestone graph survive reload and prepare an editable next-session goal', async ({
  page,
  request,
}) => {
  const runs = await (await request.get('/api/runs')).json();
  const repository = runs[0].repository;
  await page.goto('/');
  await page.getByRole('button', { name: 'Projects', exact: true }).click();
  await page.getByRole('button', { name: 'New project', exact: true }).click();
  await page.getByLabel('Project name', { exact: true }).fill('Browser continuity trial');
  await page.getByLabel('Repository root', { exact: true }).fill(repository);
  await page
    .getByLabel('Project purpose', { exact: true })
    .fill('Retain decisions and prepare useful work across sessions.');
  await page.getByLabel('Audience', { exact: true }).fill('A returning developer');
  await page.getByRole('button', { name: 'Save project', exact: true }).click();
  await expect(
    page.getByRole('heading', { name: 'Browser continuity trial', exact: true }),
  ).toBeVisible();
  const token = (await (await request.get('/api/meta')).json()).token;
  const headers = { 'X-Iterfox-Token': token };
  const projects = await (await request.get('/api/projects', { headers })).json();
  const project = projects.find((p: { name: string }) => p.name === 'Browser continuity trial');
  expect(project).toBeTruthy();
  const outcome = 'Give selected graph nodes a contextual feedback action.';
  const revised = await request.post(`/api/projects/${project.id}/revisions`, {
    headers,
    data: {
      expectedRevision: project.revision,
      changes: {
        decisions: ['Preserve current APIs.'],
        hypotheses: ['A compact inspector may help.'],
        milestones: [
          {
            id: 'graph',
            title: 'A useful graph control',
            outcome,
            dependsOn: [],
            status: 'active',
          },
        ],
      },
    },
  });
  expect(revised.status()).toBe(200);
  await page.reload();
  await page.getByRole('button', { name: 'Projects', exact: true }).click();
  await page.getByRole('button', { name: /Browser continuity trial/ }).click();
  const graph = page.getByRole('region', { name: 'Project milestone graph', exact: true });
  await expect(graph).toBeVisible();
  await graph.getByText('A useful graph control', { exact: true }).click();
  await expect(page.getByText(outcome, { exact: true }).first()).toBeVisible();
  await page.getByRole('button', { name: 'Prepare next session', exact: true }).click();
  await expect(page.getByRole('dialog', { name: 'Night Run preflight' })).toBeVisible();
  await expect(page.getByLabel(/Desired result/)).toHaveValue(
    /Give selected graph nodes a contextual feedback action/,
  );
  await expect(page.getByLabel(/Handoff for your absence/)).toHaveValue(/Preserve current APIs/);
  await expect(page.getByRole('button', { name: /Authorize & start/ })).toHaveCount(0);
});
