export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-col items-center gap-4 px-16 py-32 text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">
          Aarshiya Science Learning System
        </h1>
        <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          Engineering foundation in progress. See{" "}
          <code className="font-mono text-sm">/docs/architecture</code> for the project
          vision and current status.
        </p>
      </main>
    </div>
  );
}
