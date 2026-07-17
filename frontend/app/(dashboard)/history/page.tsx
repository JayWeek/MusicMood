import HistoryHeader from "@/components/history/HistoryHeader";
import TrackTable from "@/components/track/TrackTable";
import EmptyState from "@/components/track/EmptyState";

import { mockHistory } from "@/lib/mockHistory";

export default function HistoryPage() {
  return (
    <div className="mx-auto max-w-7xl">
      <HistoryHeader />

      {mockHistory.length > 0 ? (
        <TrackTable tracks={mockHistory} />
      ) : (
        <EmptyState
          title="No Listening History"
          description="Songs you've played will appear here."
        />
      )}
    </div>
  );
}