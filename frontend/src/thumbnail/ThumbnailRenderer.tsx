import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { LivePreview } from '../components/resume/LivePreview';
import { TEMPLATES } from '../data/templates';
import { SAMPLE_RESUME_DATA } from '../data/sampleResume';

const THUMBNAIL_WIDTH = 800;
const THUMBNAIL_HEIGHT = 1000;

const ThumbnailRenderer: React.FC = () => {
  const params = new URLSearchParams(window.location.search);
  const templateId = params.get('template') || 'modern';
  const templateExists = TEMPLATES.some((template) => template.id === templateId);
  const resolvedTemplateId = templateExists ? templateId : 'modern';

  useEffect(() => {
    const markReady = async () => {
      if (document.fonts) {
        await document.fonts.ready;
      }

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          document.body.setAttribute('data-thumbnail-ready', 'true');
        });
      });
    };

    markReady();
  }, [resolvedTemplateId]);

  return (
    <main className="min-h-screen bg-gray-200 flex items-center justify-center p-10">
      <div
        id="thumbnail-capture"
        className="bg-white overflow-hidden shadow-2xl"
        style={{
          width: `${THUMBNAIL_WIDTH}px`,
          height: `${THUMBNAIL_HEIGHT}px`,
        }}
      >
        <LivePreview data={SAMPLE_RESUME_DATA} templateId={resolvedTemplateId} />
      </div>
    </main>
  );
};

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Could not find root element to mount thumbnail renderer');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ThumbnailRenderer />
  </React.StrictMode>
);
