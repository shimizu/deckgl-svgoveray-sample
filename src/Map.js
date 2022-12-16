import React, {useState,  useEffect } from 'react';
import DeckGL, { WebMercatorViewport  } from 'deck.gl';

import SVGoverLayer from './SVGoverLayer';

import { renderLayers } from "./RenderLayers";

// 初期ビューポートの設定
const INITIAL_VIEW_STATE = {
    width: 800,
    height: 400,
    latitude: 35.73202612464274,
    longitude: 137.53268402693763,
    bearing: 0,
    pitch: 0,
    zoom: 4
};


function Map() {
    const [viwState, setViewState] = useState(
        new WebMercatorViewport(INITIAL_VIEW_STATE)
      );

    useEffect(() => {
        const handleResize = () => {
            setViewState(v => {
            return {
              ...v,
              width: window.innerWidth,
              height: window.innerHeight
            };
          });
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
      }, []);
    
    
    return (
        <div className="map-wrapper">
            <DeckGL
                viewState={viwState}
                controller={true}
                layers={renderLayers({})}
                onViewStateChange={v => {
                    setViewState(new WebMercatorViewport(v.viewState))
                } }
            >
            </DeckGL>
            <div className="attribution">
                <a
                    href="http://www.openstreetmap.org/about/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    © OpenStreetMap
                </a>
            </div>
            <SVGoverLayer viwState={viwState}></SVGoverLayer>
        </div>
    );
}

export default Map;