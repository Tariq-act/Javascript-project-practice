const videoElement = document.getElementById('video');
const button = document.getElementById('button');

// Prompt to select media stream,pass to video element, then play
async function selectMediaStream() {
  try {
    const mediaStream = await navigator.mediaDevices.getDisplayMedia();
    videoElement.srcObject = mediaStream;
    videoElement.onloadedmetadata = () => {
      videoElement.onplay();
    };
  } catch (error) {
    // Catch error
    console.error('Woops, error here:', error);
  }
}

button.addEventListener('click', async () => {
  // Disable button
  button.disabled = true;
  // Start picture in Picture
  await videoElement.requestPictureInPicture();
  // Reset button
  button.disabled = false;
});

selectMediaStream();
