// GenerateThumbnail.js 파일

export function ExtractVideoId(videoUrl) {
  const videoIdMatch = videoUrl.match(
    /(?:\?v=|\/embed\/|\/v\/|\.be\/)([A-Za-z0-9_-]{11})/
  );
  return videoIdMatch ? videoIdMatch[1] : null;
}

export function GenerateThumbnailUrl(videoUrl) {
  const videoIdMatch = videoUrl.match(/v=([^&]+)/);
  if (videoIdMatch) {
    const videoId = videoIdMatch[1];
    return `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
  }
  return ""; // 적절한 동영상 ID가 없을 경우 빈 문자열 반환
}
