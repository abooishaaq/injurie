"use client";

import { useEffect, useState } from "react";
import { getReports } from "../server/view";
import { capsKebabCaseToSentenceCase } from "../utils";
import Link from "next/link";
import { Spin } from "antd";

const ViewReports = () => {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getReports().then((reports) => {
      const re = JSON.parse(reports);
      if (re.error) {
        alert(re.error);
        return;
      }
      setReports(re);
      setLoading(false);
    });
  }, []);

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl mb-8 text-center">View Reports</h1>
      {loading && (
        <div className="flex justify-center items-center h-64">
          {" "}
          <Spin />
        </div>
      )}
      <div className="grid grid-cols-2 gap-4">
        {reports.map((report: any) => (
          <div key={report.id} className="border p-4">
            <h2 className="text-xl mb-4">
              <Link href={`/view/${report.id}`}>
                {report.name} - {capsKebabCaseToSentenceCase(report.part)}
              </Link>
            </h2>
            <p className="mb-4">{report.details}</p>
            <p className="text-gray-600">
              occured at {new Date(report.dateTime).toLocaleString()}
            </p>
            <p className="text-gray-600 mb-4">
              reported at {new Date(report.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewReports;
