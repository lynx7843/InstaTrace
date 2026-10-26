import { ExternalLink, Calendar } from 'lucide-react';

export default function UserList({ users }) {
  if (users.length === 0) {
    return (
      <div className="border border-white p-12 flex items-center justify-center text-center">
        <p className="uppercase tracking-widest font-bold">No users found for this category or search.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {users.map((user) => (
        <a
          key={user.username}
          href={user.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="border border-white p-4 group hover:bg-white hover:text-black transition-colors block"
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold truncate" title={user.username}>@{user.username}</h3>
            <ExternalLink size={16} className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
          </div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider">
            <Calendar size={12} />
            <span>{user.dateStr}</span>
          </div>
        </a>
      ))}
    </div>
  );
}