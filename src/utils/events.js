import { useEffect } from 'react';

function subscribe(eventName, eventHandlerFn) {
  document.addEventListener(eventName, eventHandlerFn);
}

function unsubscribe(eventName, eventHandlerFn) {
  document.removeEventListener(eventName, eventHandlerFn);
}

function publishEvent(eventName) {
  const event = new Event(eventName);
  document.dispatchEvent(event);
}

// used to start and stop listeners
/* startFn wraps all the subscribe listeners, 
stopFn wraps the unsubscribe listeners */
function useListeners(startFn, stopFn) {
  useEffect(() => {
    startFn();
    return stopFn;
  }, []);
}

export default useListeners;
export { subscribe, unsubscribe, publishEvent };
