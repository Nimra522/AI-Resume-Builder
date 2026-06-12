
import React from 'react';
import { MapPin } from 'lucide-react';

export const MapBox: React.FC = () => {
  return (
    <div className="w-full h-[300px] bg-gray-200 rounded-xl overflow-hidden relative shadow-inner group border border-gray-200">
      {/* Placeholder for actual map visuals */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-text-muted bg-gray-100">
        <MapPin size={48} className="mb-2 text-primary opacity-50" />
        <p className="font-medium">San Francisco, CA</p>
        <p className="text-sm">Headquarters</p>
      </div>
      
      {/* Simulation of a map overlay/iframe */}
      <iframe 
        title="Office Location"
        width="100%" 
        height="100%" 
        frameBorder="0" 
        scrolling="no" 
        marginHeight={0} 
        marginWidth={0} 
        style={{ filter: 'grayscale(100%) opacity(0.6)' }}
        src="https://maps.google.com/maps?q=San%20Francisco&t=&z=13&ie=UTF8&iwloc=&output=embed"
        className="absolute inset-0 opacity-60 hover:opacity-100 transition-opacity duration-500"
      ></iframe>
    </div>
  );
};
