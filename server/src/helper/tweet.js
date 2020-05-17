export function parseTweet(event) {
  const result = {
    id: event.id_str,
    name: event.user.name,
    handle: event.user.screen_name,
    avatar: event.user.profile_image_url,
    url: `https://twitter.com/${event.user.screen_name}`,
    tweet: {
      text: event.text,
      reply: event.reply_count,
      retweet: event.retweet_count,
      like: event.favorite_count,
      url: `https://twitter.com/${event.user.screen_name}/${event.id_str}`
    }
  };
  return result;
}
