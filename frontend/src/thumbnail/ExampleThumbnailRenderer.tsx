import React, { useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import { LivePreview } from '../components/resume/LivePreview';
import { EXAMPLES } from '../data/examples';
import { TEMPLATES } from '../data/templates';

const THUMBNAIL_WIDTH = 800;
const THUMBNAIL_HEIGHT = 1000;

const ExampleThumbnailRenderer: React.FC = () => {
  const params = new URLSearchParams(window.location.search);
  const exampleId = params.get('example') || 'software-engineer';

  const example = useMemo(
    () => EXAMPLES.find((e) => e.id === exampleId),
    [exampleId]
  );

  const resolvedData = example?.data ?? null;
  const resolvedTemplateId = example?.layoutType ?? 'modern';
  const templateExists = TEMPLATES.some((t) => t.id === resolvedTemplateId);
  const finalTemplateId = templateExists ? resolvedTemplateId : 'modern';

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
  }, []);

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
        {resolvedData ? (
          <LivePreview data={resolvedData as any} templateId={finalTemplateId} />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            Example not found
          </div>
        )}
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
    <ExampleThumbnailRenderer />
  </React.StrictMode>
);
