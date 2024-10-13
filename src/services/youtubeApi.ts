import axios from 'axios';

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

export const searchVideos = async (query: string, channels: string, maxResults = 3) => {
  try {
    const channelIds = await getChannelIds(channels);
    const requests = channelIds.map(channelId =>
      axios.get(`${BASE_URL}/search`, {
        params: {
          part: 'snippet',
          q: query,
          type: 'video',
          maxResults,
          channelId,
          key: API_KEY,
        },
      })
    );

    const responses = await Promise.all(requests);
    const videos = responses.flatMap(response =>
      response.data.items.map((item: any) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.medium.url,
        channelTitle: item.snippet.channelTitle,
        publishedAt: item.snippet.publishedAt,
      }))
    );

    return videos;
  } catch (error) {
    console.error('Error fetching videos:', error);
    throw error;
  }
};

const getChannelIds = async (channels: string): Promise<string[]> => {
  const channelNames = channels.split(',');
  const requests = channelNames.map(channelName =>
    axios.get(`${BASE_URL}/search`, {
      params: {
        part: 'snippet',
        q: channelName,
        type: 'channel',
        maxResults: 1,
        key: API_KEY,
      },
    })
  );

  const responses = await Promise.all(requests);
  return responses.map(response => response.data.items[0].id.channelId);
};