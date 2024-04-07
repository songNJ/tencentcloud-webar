export async function checkLocalMP3FileExists(src: string) {
  if (!src) return false;
  try {
    const response = await new Promise<XMLHttpRequest>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('HEAD', src, true);
      xhr.onload = () => resolve(xhr);
      xhr.onerror = () => reject(xhr);
      xhr.send();
    });
    return response.status === 200 && response.getResponseHeader('Content-Type') === 'audio/mpeg';
  } catch (error) {
    console.warn(error);
    return false;
  }
}
