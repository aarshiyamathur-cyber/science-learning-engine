/**
 * Shown on any page still backed by app/lib/sample-data.ts, so nobody
 * mistakes illustrative numbers for a real, live status report before the
 * repository-reading data layer (a later task) replaces them.
 */
export function SampleDataNotice() {
  return (
    <div className="mt-4 inline-block rounded-md bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-800">
      ⚠ Sample data — not yet connected to live project data
    </div>
  );
}
