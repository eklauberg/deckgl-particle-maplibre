import { MapboxOverlay } from '@deck.gl/mapbox/typed';
import { Map } from 'maplibre-gl';
import { useEffect, useRef } from 'react';
import ParticleLayer from './layer/ParticleLayer';
import { style } from './style';
import 'maplibre-gl/dist/maplibre-gl.css'

function App() {
  const mapRef = useRef<Map>();

  useEffect(() => {
    if (mapRef.current) return; // initialize map only once

    const map = new Map({
      container: 'map',
      style: style
    })
    
    map.on('load', () => {

      const imageUnscale = [-127, 127];
      const bounds = [-180, -90, 180, 90];
      const image = 'https://weatherlayers.github.io/deck.gl-particle/wind_data.png'

      const particleLayer = new ParticleLayer({
        id: 'particle',
        image,
        imageUnscale,
        numParticles: 9000,
        maxAge: 10,
        speedFactor: 3,   
        bounds
      })

      const overlayer = new MapboxOverlay({
        layers: [particleLayer]
      })

      //@ts-ignore
      map.addControl(overlayer)
    })

    mapRef.current = map
  }, [])

  return <div style={{ width: '100vw', height: '100vh' }} id="map" />
}

export default App