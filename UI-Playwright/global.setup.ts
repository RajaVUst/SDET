import fs from 'fs';
import path from 'path';

export default async function globalSetup() {
  const results = path.join(process.cwd(), 'allure-results');

  fs.mkdirSync(results, { recursive: true });

  fs.copyFileSync(
    'resources/allure/categories.json',
    path.join(results, 'categories.json')
  );

  fs.copyFileSync(
    'resources/allure/environment.properties',
    path.join(results, 'environment.properties')
  );
}