'use client'

import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix default marker icons broken by webpack asset hashing
delete (L.Icon.Default.prototype as Record<string, unknown>)._getIconUrl
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

interface DonationBin {
  id: string
  name: string
  building: string
  latitude: number
  longitude: number
  active: boolean
}

// BU campus center
const BU_CENTER: [number, number] = [42.3505, -71.1054]

export default function DonationMap() {
  const [bins, setBins] = useState<DonationBin[]>([])

  useEffect(() => {
    fetch('/api/donations/bins')
      .then((res) => res.json())
      .then((json: { data: DonationBin[] }) => {
        setBins(json.data ?? [])
      })
      .catch(() => {
        // Silently fail — map still renders, just without pins
      })
  }, [])

  return (
    <MapContainer
      center={BU_CENTER}
      zoom={15}
      className="h-full w-full"
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://carto.com/">CartoDB</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />
      {bins
        .filter((bin) => bin.active)
        .map((bin) => (
          <Marker key={bin.id} position={[bin.latitude, bin.longitude]}>
            <Popup>
              <span className="font-bold">{bin.name}</span>
              <br />
              {bin.building}
            </Popup>
          </Marker>
        ))}
    </MapContainer>
  )
}
