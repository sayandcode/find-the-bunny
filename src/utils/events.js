import { useEffect } from 'react';

const pubsub = document.createElement('div');

function subscribe(eventName, eventHandlerFn) {
  pubsub.addEventListener(eventName, eventHandlerFn);
}

function unsubscribe(eventName, eventHandlerFn) {
  pubsub.removeEventListener(eventName, eventHandlerFn);
}

function publishEvent(eventName, payload) {
  const event = new CustomEvent(eventName, { detail: payload });
  pubsub.dispatchEvent(event);
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
