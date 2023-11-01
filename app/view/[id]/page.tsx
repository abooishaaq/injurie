import { Button } from "antd";
import { getReport } from "../../server/view";
import { capsKebabCaseToSentenceCase } from "../../utils";
import Link from "next/link";

const ViewReport = async ({ params }: { params: { id: string } }) => {
  const res = await getReport(params.id);
  const report = JSON.parse(res);

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl mb-8 text-center">View Report</h1>
      <div className="border p-4">
        <h2 className="text-xl mb-4">
          {report.name} - {capsKebabCaseToSentenceCase(report.part)}
        </h2>
        <p>{report.details}</p>
        <p className="text-gray-600 mb-4">
          occured at {new Date(report.dateTime).toLocaleString()}
        </p>
        <p className="text-gray-600 mb-4">
          reported at {new Date(report.createdAt).toLocaleString()}
        </p>
      </div>
      <div className="flex justify-center mt-8">
        <Link href={`/edit/${params.id}`}>
          <Button>Edit</Button>
        </Link>
      </div>
    </div>
  );
};

export default ViewReport;
