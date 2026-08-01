import { ProgressCard } from "../components/ProgressCard";
import { SampleDataNotice } from "../components/SampleDataNotice";
import { conceptQuestionBreakdown, questionBankSummary } from "../lib/sample-data";

export default function QuestionBankPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">Question Bank</h1>
      <p className="mt-2 max-w-2xl text-base text-slate-600">
        Question Bank — a browsable view of every assessment question in the
        curriculum, by concept and question type.
      </p>
      <SampleDataNotice />

      <section className="mt-8">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Summary
        </h2>
        <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <ProgressCard label="Total Questions" value={questionBankSummary.totalQuestions} status="good" />
          <ProgressCard
            label="Multiple Choice"
            value={questionBankSummary.multipleChoice}
            status="neutral"
          />
          <ProgressCard label="Short Answer" value={questionBankSummary.shortAnswer} status="neutral" />
          <ProgressCard
            label="Concepts Covered"
            value={questionBankSummary.conceptsCovered}
            status="good"
          />
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Breakdown by Concept
        </h2>
        <div className="mt-3 overflow-hidden rounded-lg bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-2 font-medium">Concept</th>
                <th className="px-4 py-2 font-medium">Total</th>
                <th className="px-4 py-2 font-medium">Multiple Choice</th>
                <th className="px-4 py-2 font-medium">Short Answer</th>
              </tr>
            </thead>
            <tbody>
              {conceptQuestionBreakdown.map((row) => (
                <tr key={row.concept} className="border-t border-slate-100">
                  <td className="px-4 py-2 font-medium text-slate-900">{row.concept}</td>
                  <td className="px-4 py-2 text-slate-700">{row.total}</td>
                  <td className="px-4 py-2 text-slate-700">{row.multipleChoice}</td>
                  <td className="px-4 py-2 text-slate-700">{row.shortAnswer}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
