declare global {
  interface Document {
    mozCancelFullScreen?: () => Promise<void>;
    msExitFullscreen?: () => Promise<void>;
    webkitExitFullscreen?: () => Promise<void>;
    mozFullScreenElement?: Element;
    msFullscreenElement?: Element;
    webkitFullscreenElement?: Element;
    onwebkitfullscreenchange?: any;
    onmsfullscreenchange?: any;
    onmozfullscreenchange?: any;
  }

  interface HTMLElement {
    msRequestFullScreen?: () => Promise<void>;
    mozRequestFullScreen?: () => Promise<void>;
    webkitRequestFullScreen?: () => Promise<void>;
  }
}

export function initFullscreenControl(
  map: google.maps.Map,
  fullScreenControl: HTMLElement,
  fullScreenElement: HTMLElement
) {
  map.controls[google.maps.ControlPosition.RIGHT_TOP].push(fullScreenControl);

  fullScreenControl.onclick = function () {
    if (isFullscreen(fullScreenElement)) {
      exitFullscreen();
    } else {
      requestFullscreen(fullScreenElement);
    }
  };
  document.onfullscreenchange = function () {
    if (isFullscreen(fullScreenElement)) {
      fullScreenControl.classList.add('is-fullscreen');
    } else {
      fullScreenControl.classList.remove('is-fullscreen');
    }
  };
}

function isFullscreen(element: HTMLElement) {
  return (
    (document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement) === element
  );
}

function requestFullscreen(element: HTMLElement) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.webkitRequestFullScreen) {
    element.webkitRequestFullScreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.msRequestFullScreen) {
    element.msRequestFullScreen();
  }
}

function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}
