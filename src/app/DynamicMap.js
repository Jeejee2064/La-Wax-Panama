'use client';

import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const DynamicMap = ({ shops }) => {
  useEffect(() => {
    // Initialize the map only on client side
    const map = L.map('map').setView([8.538, -80.782], 7); // Centered on Panama with zoom level 7

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Custom icon
    const surfIcon = L.icon({
      iconUrl: 'https://cdn-icons-png.flaticon.com/512/888/888879.png',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
    });

    // Add markers for each shop
    shops.forEach(shop => {
      const marker = L.marker(shop.position, { icon: surfIcon }).addTo(map);
      marker.bindPopup(`
        <div class="p-2">
          <h3 class="font-bold">${shop.name}</h3>
          <p class="text-sm">${shop.address}</p>
        </div>
      `);
    });

    return () => {
      map.remove();
    };
  }, [shops]);

  return <div id="map" className="h-full w-full" />;
};

export default DynamicMap;