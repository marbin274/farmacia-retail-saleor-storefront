export function initFullscreenControl(
  map: google.maps.Map,
  fullScreenControl: HTMLElement,
  fullScreenElement: HTMLElement
) {
  map.controls[google.maps.ControlPosition.RIGHT_TOP].push(fullScreenControl);

  fullScreenControl.onclick = function () {
    if (isFullscreen(fullScreenElement)) {
      document.exitFullscreen();
    } else {
      fullScreenElement.requestFullscreen();
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
  return document.fullscreenElement === element;
}
