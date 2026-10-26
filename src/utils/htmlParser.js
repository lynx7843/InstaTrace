export function parseInstagramHtml(htmlString) {
  if (!htmlString || typeof htmlString !== 'string') return [];

  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  
  // Instagram exports wrap users in anchor tags pointing to their profiles
  const userLinks = Array.from(doc.querySelectorAll('a[target="_blank"]'));
  
  const users = [];
  
  for (const link of userLinks) {
    const username = link.textContent.trim();
    const profileUrl = link.href;
    
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

    if (username && profileUrl.includes('instagram.com')) {
      users.push({
        username,
        profileUrl,
        dateStr: dateStr || 'Unknown Date',
        timestamp: isNaN(timestamp) ? 0 : timestamp
      });
    }
  }
  
  return users;
}