import TenderCard from "./TenderCard";

export default function Results({ tenders }) {
  if (!tenders || tenders.length === 0) {
    return <p className="text-gray-400">No tenders found.</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {tenders.map((tender, idx) => (
        <TenderCard key={idx} tender={tender} />
      ))}
    </div>
  );
}
