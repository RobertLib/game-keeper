import "./Map.css";
import { useEffect, useRef } from "react";
import cn from "../../utils/cn";

/**
 * @typedef Position
 * @property {number} lat
 * @property {number} lng
 */

/**
 * @typedef Marker
 * @property {Position} position
 * @property {string} title
 */

/**
 * @typedef Props
 * @property {Position} [center]
 * @property {string} [className]
 * @property {Marker[]} [markers]
 * @property {React.CSSProperties} [style]
 * @param {Props} props
 */
export default function Map({ center, className, markers, style }) {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!window.google) {
      return;
    }

    const map = new window.google.maps.Map(mapRef.current, {
      center,
      zoom: 10,
    });

    markers?.forEach((marker) => {
      new window.google.maps.Marker({
        map,
        position: marker.position,
        title: marker.title,
      });
    });
  }, [center, markers]);

  return <div className={cn("Map", className)} ref={mapRef} style={style} />;
}
