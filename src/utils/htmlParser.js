export function parseInstagramHtml(htmlString) {
  if (!htmlString || typeof htmlString !== 'string') return [];

  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  
  // Instagram exports can omit target="_blank" on pending-request profile links.
  const userLinks = Array.from(doc.querySelectorAll('a[href]'));
  
  const users = [];
  
  for (const link of userLinks) {
    const href = link.getAttribute('href');
    let profile;

    try {
      profile = new URL(href, 'https://www.instagram.com');
    } catch {
      continue;
    }

    if (
      profile.hostname !== 'instagram.com' &&
      !profile.hostname.endsWith('.instagram.com')
    ) {
      continue;
    }

    let pathSegments = profile.pathname.split('/').filter(Boolean);
    if (pathSegments[0] === '_u') pathSegments = pathSegments.slice(1);
    if (pathSegments.length !== 1) continue;

    let username;
    try {
      username = decodeURIComponent(pathSegments[0]);
    } catch {
      continue;
    }

    // Instagram's current HTML structure places the date in the next sibling div
    // Structure: <div> <div><a href="...">username</a></div> <div>Oct 24, 2026 ...</div> </div>
    let dateStr = '';
    let timestamp = 0;
    
    try {
      const dateDiv = link.parentElement?.nextElementSibling;
      if (dateDiv) {
        dateStr = dateDiv.textContent.trim();
        timestamp = new Date(dateStr).getTime();
      }
    } catch (e) {
      console.warn(`Could not parse date for user ${username}`);
    }

    if (username) {
      users.push({
        username,
        profileUrl: profile.href,
        dateStr: dateStr || 'Unknown Date',
        timestamp: isNaN(timestamp) ? 0 : timestamp
      });
    }
  }
  
  return users;
}

export function parsePendingRequestsHtml(htmlString) {
  if (!htmlString || typeof htmlString !== 'string') return [];

  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  const records = Array.from(doc.querySelectorAll('main > div._a6-g'));

  return records.flatMap((record) => {
    const cells = Array.from(record.querySelectorAll('td'));
    let username = '';

    for (let index = 0; index < cells.length - 1; index += 1) {
      if (cells[index].textContent.trim().toLowerCase() === 'username') {
        username = cells[index + 1].textContent.trim();
        break;
      }
    }

    if (!username) return [];

    const dateStr = record.querySelector('._3-94._a6-o')?.textContent.trim() || 'Unknown Date';
    const timestamp = new Date(dateStr).getTime();

    return [{
      username,
      profileUrl: `https://www.instagram.com/${encodeURIComponent(username)}/`,
      dateStr,
      timestamp: Number.isNaN(timestamp) ? 0 : timestamp,
    }];
  });
}