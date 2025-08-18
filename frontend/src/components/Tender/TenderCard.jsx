export default function TenderCard({ tender }) {
  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md">
      <h3 className="text-lg font-bold">{tender.title}</h3>
      <p className="text-gray-600">{tender.description}</p>
      <p className="text-sm mt-2">
        <strong>Province:</strong> {tender.province}
      </p>
      <p className="text-sm">
        <strong>Deadline:</strong> {tender.deadline}
      </p>
      <p className="text-sm font-semibold text-green-700">
        <strong>Budget:</strong> R{tender.budget}
      </p>
    </div>
  );
}
