export default function RelationshipTabs({ activeTab, onTabChange, counts }) {
  const tabs = [
    { id: 'notFollowingBack', label: 'Not Following Back', count: counts.notFollowingBack },
    { id: 'pending', label: 'Pending Requests', count: counts.pending },
    { id: 'mutuals', label: 'Mutuals', count: counts.mutuals },
    { id: 'fans', label: 'Fans', count: counts.fans },
  ];

  return (
    <div className="flex flex-wrap border-b border-white">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex-1 py-3 px-4 font-bold text-sm uppercase tracking-wider border-t border-l border-r border-transparent ${
            activeTab === tab.id 
              ? 'bg-white text-black border-white' 
              : 'hover:border-white text-white'
          }`}
        >
          {tab.label} [{tab.count}]
        </button>
      ))}
    </div>
  );
}