import { test, expect } from '@playwright/test';

async function setup(page: any) {
  await page.goto('/');
  await page.getByRole('button', { name: 'Delegations', exact: true }).click();
  const runs = await (await page.request.get('/api/runs')).json();
  const run = runs.find((r: any) => r.provider === 'demo');
  const spec = {
    repository: run.repository,
    contract: {
      ...run.contract,
      goal: 'DEMO UI fixture: develop two outcomes without another launch prompt.',
    },
    milestones: run.contract.criteria.map((c: any, i: number) => ({
      id: c.id,
      title: c.title,
      outcome: 'Deliver and verify ' + c.title,
      criterionIds: [c.id],
      dependsOn: i ? [run.contract.criteria[i - 1].id] : [],
    })),
    environment: { copyIgnoredPaths: [] },
  };
  await page.getByText('Review a new continuous delegation', { exact: true }).click();
  await page.getByLabel('Delegation JSON', { exact: true }).fill(JSON.stringify(spec));
  return spec;
}
test('continuous delegation preflight creates no work; authorization and outcome control fit mobile', async ({
  page,
}) => {
  await setup(page);
  const before = await (await page.request.get('/api/runs')).json();
  await page.getByRole('button', { name: 'Review continuous delegation', exact: true }).click();
  await expect(page.getByRole('region', { name: 'Delegation preflight' })).toContainText(
    'Host creates verified local checkpoint commits',
  );
  expect((await (await page.request.get('/api/runs')).json()).length).toBe(before.length);
  await page
    .getByRole('button', { name: 'Authorize and start continuous work', exact: true })
    .click();
  await expect(page.getByRole('region', { name: 'Delegation progress' })).toContainText(
    'AUTHORIZED',
  );
  await expect(page.getByRole('region', { name: 'Delegated outcome graph' })).toBeVisible();
  await page.setViewportSize({ width: 390, height: 844 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false);
  await page.getByRole('button', { name: 'Pause delegation', exact: true }).click();
  await expect(page.getByRole('region', { name: 'Delegation progress' })).toContainText('PAUSED');
  expect((await (await page.request.get('/api/runs')).json()).length).toBe(before.length);
});
test('lost real authorization response is recovered without another delegation submission', async ({
  page,
}) => {
  await setup(page);
  await page.getByRole('button', { name: 'Review continuous delegation', exact: true }).click();
  await expect(
    page.getByRole('button', { name: 'Authorize and start continuous work', exact: true }),
  ).toBeVisible();
  let posts = 0;
  let id = '';
  await page.route('**/api/delegations', async (route) => {
    if (route.request().method() !== 'POST') return route.continue();
    posts++;
    const response = await route.fetch();
    expect(response.status()).toBe(201);
    id = (await response.json()).id;
    await route.abort('failed');
  });
  await page
    .getByRole('button', { name: 'Authorize and start continuous work', exact: true })
    .click();
  await expect(page.getByText('No automatic retry.', { exact: false })).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Authorize and start continuous work', exact: true }),
  ).toBeDisabled();
  await page.getByRole('button', { name: 'Refresh delegations', exact: true }).click();
  await expect(page.locator('option[value=\"' + id + '\"]')).toHaveCount(1);
  await page.getByRole('button', { name: 'Inspect saved authorization', exact: true }).click();
  await expect(page.getByLabel('Saved delegation', { exact: true })).toHaveValue(id);
  expect(posts).toBe(1);
  await expect(page.getByRole('region', { name: 'Delegation progress' })).toBeVisible();
  await page.getByRole('button', { name: 'Pause delegation', exact: true }).click();
});
