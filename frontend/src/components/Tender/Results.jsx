import { Card, CardContent } from "@/components/ui/card";

export default function Results({ tenders }) {
  if (!tenders.length) {
    return <p className="text-center text-gray-500 mt-4">No results found</p>;
  }

  return (
    <div className="grid gap-4 p-4">
      {tenders.map((tender, index) => (
        <Card key={index} className="rounded-2xl shadow-md">
          <CardContent className="p-4">
            <h2 className="font-bold text-lg">{tender.title}</h2>
            <p>Buyer: {tender.buyer}</p>
            <p>Deadline: {tender.deadline}</p>
            <p>Budget: R{tender.budget.toLocaleString()}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
