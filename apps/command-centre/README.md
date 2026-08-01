# Command Centre

An internal dashboard for the Product Owner and Engineering Lead to track the Aarshiya
Science Learning System project — sprint status, roadmap, release history, the
question bank, and engineering health. This is a separate, self-contained Next.js app
from the learning app at the repo root; it does not share code or a build with it.

## Running it

From the repo root:

```
npm install
```

Then, from inside `apps/command-centre`:

```
npm run dev
```

Opens on [http://localhost:3001](http://localhost:3001) (the root app runs on port 3000,
so the two can run side by side).
