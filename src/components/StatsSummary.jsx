export default function StatsSummary({ counts }) {
  const statItems = [
    { label: 'Followers', value: counts.followers },
    { label: 'Following', value: counts.following },
    { label: 'Not Following Back', value: counts.notFollowingBack },
    { label: 'Mutuals', value: counts.mutuals },
    { label: 'Fans', value: counts.fans },
    { label: 'Pending', value: counts.pending },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {statItems.map((stat) => (
        <div key={stat.label} className="border border-white p-4 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold">{stat.value}</span>
          <span className="text-xs uppercase tracking-wider text-center mt-2">{stat.label}</span>
        </div>
      ))}
    </div>
  );
}