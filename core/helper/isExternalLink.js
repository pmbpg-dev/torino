export const isExternalLink = (url) => {
  try {
    const currentUrl = new URL(window.location.href);
    const urlObj = new URL(url, currentUrl.origin);

    if (currentUrl.hostname !== urlObj.hostname) {
      return true;
    }

    if (url === window.location.href) {
      return true;
    }

    return currentUrl.origin !== urlObj.origin;
  } catch (err) {
    return true;
  }
};
