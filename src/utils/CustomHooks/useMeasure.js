import { useRef } from 'react';

function useMeasure(optionalRef) {
  if (optionalRef) return measureDOMElement(optionalRef.current);

  const ref = useRef();
  const measures = measureDOMElement(ref.current);
  return [ref, measures];
}

function measureDOMElement(element) {
  if (!(element instanceof HTMLElement)) return null;

  const browserMeasures = element.getBoundingClientRect();

  const { top, left, height, width } = browserMeasures;
  const middle = { x: left + width / 2, y: top + height / 2 };
  return { top, left, height, width, middle };
}

export default useMeasure;
