export function exportUserList(users, category, format = 'csv') {
  if (!users || users.length === 0) return;

  const dateStr = new Date().toISOString().split('T')[0];
  const filename = `instatrace_${category}_${dateStr}.${format}`;
  
  let fileContent = '';
  let mimeType = '';

  if (format === 'csv') {
    mimeType = 'text/csv;charset=utf-8;';
    fileContent = 'Username,Profile URL,Date\n';
    
    users.forEach(user => {
      // Escape commas in date strings to prevent CSV layout breaks
      const safeDate = `"${user.dateStr}"`;
      fileContent += `${user.username},${user.profileUrl},${safeDate}\n`;
    });
  } else if (format === 'txt') {
    mimeType = 'text/plain;charset=utf-8;';
    fileContent = `InstaTrace Export: ${category.toUpperCase()}\n`;
    fileContent += `Generated: ${dateStr}\n`;
    fileContent += `Total Accounts: ${users.length}\n\n`;
    fileContent += `----------------------------------------\n\n`;
    
    users.forEach(user => {
      fileContent += `@${user.username}\n`;
      fileContent += `${user.profileUrl}\n`;
      fileContent += `Date: ${user.dateStr}\n\n`;
    });
  } else {
    console.error('Unsupported export format');
    return;
  }

  const blob = new Blob([fileContent], { type: mimeType });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}