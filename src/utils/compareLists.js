export function compareRelationships(followers, following, pending = []) {
  // Create Sets of usernames for O(1) lookup speed
  const followerUsernames = new Set(followers.map(user => user.username));
  const followingUsernames = new Set(following.map(user => user.username));
  
  const notFollowingBack = [];
  const mutuals = [];
  const fans = [];

  // 1. Find who isn't following you back & mutuals
  for (const user of following) {
    if (!followerUsernames.has(user.username)) {
      notFollowingBack.push(user);
    } else {
      mutuals.push(user);
    }
  }

  // 2. Find fans (people you don't follow back)
  for (const user of followers) {
    if (!followingUsernames.has(user.username)) {
      fans.push(user);
    }
  }

  // Deduplicate pending list just in case
  const uniquePending = pending.filter(
    (user, index, self) => index === self.findIndex((t) => t.username === user.username)
  );

  return {
    totalFollowers: followers.length,
    totalFollowing: following.length,
    notFollowingBack,
    mutuals,
    fans,
    pending: uniquePending,
  };
}