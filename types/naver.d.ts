declare namespace naver.maps {
  class Map {
    constructor(element: HTMLElement, options: MapOptions);
    setCenter(latlng: LatLng): void;
    getCenter(): LatLng;
    setZoom(level: number, animate?: boolean): void;
    getZoom(): number;
    fitBounds(bounds: LatLngBounds, margin?: number | Padding): void;
    getBounds(): LatLngBounds;
    panTo(latlng: LatLng, transitionOptions?: TransitionOptions): void;
    destroy(): void;
  }

  class LatLng {
    constructor(lat: number, lng: number);
    lat(): number;
    lng(): number;
  }

  class LatLngBounds {
    constructor(sw?: LatLng, ne?: LatLng);
    extend(latlng: LatLng): LatLngBounds;
    getSW(): LatLng;
    getNE(): LatLng;
  }

  class Marker {
    constructor(options: MarkerOptions);
    setMap(map: Map | null): void;
    getPosition(): LatLng;
    setPosition(latlng: LatLng): void;
    setIcon(icon: ImageIcon | SymbolIcon | HtmlIcon): void;
  }

  class InfoWindow {
    constructor(options: InfoWindowOptions);
    open(map: Map, anchor?: Marker | LatLng): void;
    close(): void;
    setContent(content: string | HTMLElement): void;
  }

  interface MapOptions {
    center: LatLng;
    zoom?: number;
    minZoom?: number;
    maxZoom?: number;
    zoomControl?: boolean;
    zoomControlOptions?: ZoomControlOptions;
    mapTypeControl?: boolean;
    scaleControl?: boolean;
  }

  interface MarkerOptions {
    position: LatLng;
    map?: Map;
    icon?: ImageIcon | SymbolIcon | HtmlIcon;
    title?: string;
    clickable?: boolean;
    draggable?: boolean;
    zIndex?: number;
  }

  interface InfoWindowOptions {
    content: string | HTMLElement;
    position?: LatLng;
    maxWidth?: number;
    backgroundColor?: string;
    borderColor?: string;
    borderWidth?: number;
    anchorSize?: Size;
    anchorSkew?: boolean;
    pixelOffset?: Point;
  }

  interface ImageIcon {
    url?: string;
    content?: string | HTMLElement;
    size?: Size;
    scaledSize?: Size;
    origin?: Point;
    anchor?: Point;
  }

  interface SymbolIcon {
    path: SymbolPath | string;
    style?: string;
    radius?: number;
    fillColor?: string;
    fillOpacity?: number;
    strokeColor?: string;
    strokeWeight?: number;
    strokeOpacity?: number;
    anchor?: Point;
  }

  interface HtmlIcon {
    content: string | HTMLElement;
    size?: Size;
    anchor?: Point;
  }

  class Size {
    constructor(width: number, height: number);
    width: number;
    height: number;
  }

  class Point {
    constructor(x: number, y: number);
    x: number;
    y: number;
  }

  interface ZoomControlOptions {
    position?: Position;
    style?: ZoomControlStyle;
  }

  interface TransitionOptions {
    duration?: number;
    easing?: string;
  }

  interface Padding {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  }

  enum Position {
    TOP_LEFT,
    TOP_CENTER,
    TOP_RIGHT,
    LEFT_CENTER,
    LEFT_TOP,
    LEFT_BOTTOM,
    RIGHT_TOP,
    RIGHT_CENTER,
    RIGHT_BOTTOM,
    BOTTOM_LEFT,
    BOTTOM_CENTER,
    BOTTOM_RIGHT,
  }

  enum ZoomControlStyle {
    LARGE,
    SMALL,
  }

  enum SymbolPath {
    CIRCLE,
    FORWARD_CLOSED_ARROW,
    FORWARD_OPEN_ARROW,
    BACKWARD_CLOSED_ARROW,
    BACKWARD_OPEN_ARROW,
  }

  namespace Event {
    function addListener(
      target: Map | Marker | InfoWindow,
      type: string,
      listener: (...args: unknown[]) => void
    ): void;
    function removeListener(
      target: Map | Marker | InfoWindow,
      type: string,
      listener: (...args: unknown[]) => void
    ): void;
  }
}

interface Window {
  naver: typeof naver;
}
