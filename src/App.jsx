import { useState, useMemo } from 'react';
import appLogo from './InstaTrace.png';

// UI Components (to be created next)
import Header from './components/Header';
import DataInputSection from './components/DataInputSection';
import StatsSummary from './components/StatsSummary';
import RelationshipTabs from './components/RelationshipTabs';
import FilterBar from './components/FilterBar';
import UserList from './components/UserList';

// Utility Functions (to be created next)
import { parseInstagramHtml, parsePendingRequestsHtml } from './utils/htmlParser';
import { compareRelationships } from './utils/compareLists';
import { exportUserList } from './utils/exportData';

export default function App() {
  // Raw HTML string state: followers is an array to support followers_1.html, followers_2.html, etc.
  const [rawHtmlData, setRawHtmlData] = useState({
    followers: [],
    following: '',
    pending: '',
  });

  // Dashboard & Filter UI State
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [activeTab, setActiveTab] = useState('notFollowingBack'); // 'notFollowingBack' | 'pending' | 'mutuals' | 'fans'
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date-desc'); // 'date-desc' | 'date-asc' | 'alpha-asc' | 'alpha-desc'
  const [error, setError] = useState('');

  // Parse HTML strings and compute relationship sets in memory
  const analysisResults = useMemo(() => {
    if (!isAnalyzed) return null;

    try {
      // Combine multiple follower HTML strings if the user uploaded/pasted more than one
      const followersList = rawHtmlData.followers.flatMap((html) =>
        parseInstagramHtml(html)
      );
      const followingList = parseInstagramHtml(rawHtmlData.following);
      const pendingList = rawHtmlData.pending
        ? parsePendingRequestsHtml(rawHtmlData.pending)
        : [];

      return compareRelationships(followersList, followingList, pendingList);
    } catch (err) {
      console.error('Error parsing HTML:', err);
      setError('Failed to parse the provided HTML data. Please ensure you uploaded valid Instagram export files.');
      return null;
    }
  }, [isAnalyzed, rawHtmlData]);

  // Trigger analysis after validating required inputs
  const handleAnalyze = () => {
    setError('');
    const hasFollowers =
      rawHtmlData.followers.length > 0 &&
      rawHtmlData.followers.some((html) => html.trim() !== '');
    const hasFollowing = rawHtmlData.following.trim() !== '';

    if (!hasFollowers || !hasFollowing) {
      setError('Both Followers and Following HTML data are required to analyze relationships.');
      return;
    }

    setIsAnalyzed(true);
  };

  // Reset application state to start fresh
  const handleReset = () => {
    setRawHtmlData({ followers: [], following: '', pending: '' });
    setIsAnalyzed(false);
    setActiveTab('notFollowingBack');
    setSearchQuery('');
    setSortBy('date-desc');
    setError('');
  };

  // Filter and sort the currently active tab's user list
  const displayedUsers = useMemo(() => {
    if (!analysisResults) return [];

    const currentList = analysisResults[activeTab] || [];

    // 1. Filter by search query
    const filtered = currentList.filter((user) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase().trim())
    );

    // 2. Sort results
    return [...filtered].sort((a, b) => {
      if (sortBy === 'alpha-asc') return a.username.localeCompare(b.username);
      if (sortBy === 'alpha-desc') return b.username.localeCompare(a.username);
      if (sortBy === 'date-asc') return (a.timestamp || 0) - (b.timestamp || 0);
      // Default: 'date-desc' (Newest first)
      return (b.timestamp || 0) - (a.timestamp || 0);
    });
  }, [analysisResults, activeTab, searchQuery, sortBy]);

  // Handle exporting the currently displayed list as .csv or .txt
  const handleExport = (format) => {
    if (!displayedUsers.length) return;
    exportUserList(displayedUsers, activeTab, format);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Header
        logo={appLogo}
        isAnalyzed={isAnalyzed}
        onReset={handleReset}
      />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8">
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm flex items-center justify-between">
            <span>{error}</span>
            <button
              onClick={() => setError('')}
              className="text-red-400 hover:text-red-200 font-semibold ml-4 cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}

        {!isAnalyzed || !analysisResults ? (
          <DataInputSection
            rawHtmlData={rawHtmlData}
            setRawHtmlData={setRawHtmlData}
            onAnalyze={handleAnalyze}
          />
        ) : (
          <div className="space-y-6">
            <StatsSummary
              counts={{
                followers: analysisResults.totalFollowers,
                following: analysisResults.totalFollowing,
                notFollowingBack: analysisResults.notFollowingBack.length,
                mutuals: analysisResults.mutuals.length,
                fans: analysisResults.fans.length,
                pending: analysisResults.pending.length,
              }}
            />

            <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl backdrop-blur-sm space-y-6">
              <RelationshipTabs
                activeTab={activeTab}
                onTabChange={setActiveTab}
                counts={{
                  notFollowingBack: analysisResults.notFollowingBack.length,
                  pending: analysisResults.pending.length,
                  mutuals: analysisResults.mutuals.length,
                  fans: analysisResults.fans.length,
                }}
              />

              <FilterBar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                sortBy={sortBy}
                onSortChange={setSortBy}
                onExport={handleExport}
                totalShown={displayedUsers.length}
              />

              <UserList
                users={displayedUsers}
                activeTab={activeTab}
                searchQuery={searchQuery}
              />
            </div>
          </div>
        )}
      </main>

      <footer className="py-6 text-center text-xs text-slate-500 border-t border-slate-900">
        <p>
          InstaTrace • 100% Client-Side Privacy • Zero data leaves your browser
        </p>
      </footer>
    </div>
  );
}