import { mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';
import http from 'node:http';
import https from 'node:https';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');
const outputDir = resolve(projectRoot, 'public', 'thumbnails');
const baseUrl = process.env.THUMBNAIL_BASE_URL || 'http://127.0.0.1:4173';
const templateIds = [
  'modern',
  'professional',
  'minimalist',
  'executive',
  'creative',
  'tech',
  'academic',
  'compact',
  'elegant',
  'startup',
];

async function importPlaywright() {
  try {
    return await import('playwright');
  } catch (error) {
    throw new Error(
      'Playwright is not installed. Run "npm install" after adding dependencies, then run "npx playwright install chromium".'
    );
  }
}

async function waitForServer(url, timeoutMs = 30000) {
  const startedAt = Date.now();

  while (Date.now() - startedAt < timeoutMs) {
    try {
      await requestUrl(url);
      return;
    } catch {
      // Server is still starting.
    }

    await new Promise((resolveWait) => setTimeout(resolveWait, 500));
  }

  throw new Error(`Timed out waiting for Vite at ${url}`);
}

function requestUrl(url) {
  const client = url.startsWith('https:') ? https : http;

  return new Promise((resolveRequest, rejectRequest) => {
    const request = client.get(url, (response) => {
      response.resume();

      if (response.statusCode && response.statusCode >= 200 && response.statusCode < 400) {
        resolveRequest();
        return;
      }

      rejectRequest(new Error(`Server returned ${response.statusCode}`));
    });

    request.on('error', rejectRequest);
    request.setTimeout(3000, () => {
      request.destroy(new Error('Server check timed out'));
    });
  });
}

function startViteServer() {
  if (process.env.THUMBNAIL_BASE_URL) {
    return null;
  }

  const viteBin = resolve(projectRoot, 'node_modules', 'vite', 'bin', 'vite.js');
  const child = spawn(process.execPath, [viteBin, '--host', '127.0.0.1', '--port', '4173'], {
    cwd: projectRoot,
    stdio: ['ignore', 'pipe', 'pipe'],
    shell: false,
  });

  child.stdout.on('data', (data) => process.stdout.write(data));
  child.stderr.on('data', (data) => process.stderr.write(data));

  return child;
}

async function main() {
  const { chromium } = await importPlaywright();
  await mkdir(outputDir, { recursive: true });

  const server = startViteServer();

  try {
    await waitForServer(`${baseUrl}/thumbnail.html`);

    const browser = await chromium.launch();
    const page = await browser.newPage({
      viewport: {
        width: 900,
        height: 1100,
      },
      deviceScaleFactor: 2,
    });

    for (const templateId of templateIds) {
      const url = `${baseUrl}/thumbnail.html?template=${encodeURIComponent(templateId)}`;
      const outputPath = resolve(outputDir, `${templateId}.png`);

      await page.goto(url, { waitUntil: 'networkidle' });
      await page.waitForSelector('body[data-thumbnail-ready="true"]');
      await page.waitForTimeout(300);

      const captureTarget = page.locator('#thumbnail-capture');
      await captureTarget.screenshot({
        path: outputPath,
        type: 'png',
        animations: 'disabled',
        caret: 'hide',
        scale: 'device',
      });

      console.log(`Generated ${templateId} thumbnail at public/thumbnails/${templateId}.png`);
    }

    await page.close();
    await browser.close();
  } finally {
    if (server) {
      server.kill();
    }
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
