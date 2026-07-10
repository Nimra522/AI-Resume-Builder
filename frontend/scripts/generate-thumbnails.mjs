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
  'academic',
  'compact',
  'startup',
  'modern-timeline',
  'warm-professional',
  'executive-blue',
  'monochrome-frame',
  'retro-contour',
  'fresh-graduate-modern',
  'fluid-capsule',
  'brown-elegant',
  'minimalist-full-width',
  'minimalist-magazine',
  'forest-green',
  'vertical-elegant',
  'royal-executive',
  'navy-horizon',
  'modern-blue-geometric',
  'maison-elite',
  'lorna',
  'legacy-ceo',
  'heritage-corporate',
  'graphic-designer-portfolio',
  'executive-vogue',
  'executive-prestige',
  'executive-horizon',
  'empire-executive',
  'editorial-luxe',
  'anaisha',
  'dark-red-executive',
  'modern-purple',
  'creative-professional',
  'luxury-executive',
  'elegant-monochrome',
  'modern-professional',
  'executive-minimal',
  'isabel',
  'corporate-band',
  'elegant',
  'platinum-board',
  'chairman-signature',
  'boardroom-elite',
  'tech',
  'executive-blue-2',
  'royal-executive-2',
  'template-1',
  'template-2',
  'single-column-professional',
  'editorial-executive',
  'minimal-grid',
  'modern-minimal-timeline',
  'modern-corporate-photo',
  'modern-professional-timeline-photo',
  'luxury-editorial',
  'premium-executive-minimal',
  'modern-editorial-timeline',
  'modernist-editorial',
  'premium-sidebar-timeline',
  'classic-bw',
  'overlapping-portfolio',
  'decorative-circles',
  'single-column-navy-corporate',
  'rounded-portfolio',
  'black-header-minimal',
  'editorial-thin',
  'student-profile-banner',
  'serif-executive',
  'sidebar-gray-profile',
  'brown-accent-decorative',
  'dark-sidebar-portfolio',
  'dark-sidebar-timeline',
  'pill-rotated-timeline',
  'dark-header-pills',
  'warm-cream-sectional',
  'lavender-accent-repeating',
  'blue-header-three-column',
  'grey-boxed-headings',
  'light-sidebar-sections',
  'blue-framed-timeline',
  'navy-profile-timeline',
  'navy-sidebar-rounded-photo',
  'blue-sidebar-dot-indicators',
  'corporate-clean',
  'corporate-timeline',
  'halftone-timeline',
  'royal-blue-timeline',
  'engineer-portfolio',
  'executive-blue-banner',
  'minimal-black-photo',
  'single-column-black-panel',
  'orange-accent-timeline',
  'green-hero-executive',
  'green-geo-corporate',
  'teal-block-header',
  'graphic-designer-split-header',
  'minimal-corporate-blue-banner',
  'yellow-header-minimal',
  'three-panel-black-timeline',
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

    const browser = await chromium.launch({
      channel: 'chrome',
    });
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
