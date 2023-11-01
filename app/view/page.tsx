"use client";

import { useEffect, useState } from "react";
import { getReports } from "../server/view";
import { capsKebabCaseToSentenceCase } from "../utils";
import Link from "next/link";
import { Button, Dropdown, Spin, Input } from "antd";

const sortByKeys = [0, 1, 2, 3, 4];
const sortByValues = [
  "",
  "name asc",
  "name desc",
  "dateTime asc",
  "dateTime desc",
];

const ViewReports = () => {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [sortBy, setSortBy] = useState<number>(0);
  const [search, setSearch] = useState<string>("");

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

  const setSortByClosure = (sortBy: number) => () => {
    setSortBy(sortBy);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl mb-8 text-center">View Reports</h1>
      {loading && (
        <div className="flex justify-center items-center h-64">
          <Spin />
        </div>
      )}
      {!loading && (
        <div className="mb-8 md:grid md:grid-cols-7 md:gap-1">
          <div className="mb-4 md:col-span-2">
            {/* filter */}
            sort by:{" "}
            <Dropdown
              menu={{
                items: sortByKeys.slice(1).map((item) => ({
                  key: item,
                  label: (
                    <a onClick={setSortByClosure(item)}>{sortByValues[item]}</a>
                  ),
                })),
              }}
            >
              <Button>{sortBy ? sortByValues[sortBy] : "    "}</Button>
            </Dropdown>
          </div>
          <div className="mb-4 md:col-span-5">
            <Input
              placeholder="Search by name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      )}
      <div className="md:grid md:grid-cols-2 md:gap-4 mb-8">
        {reports
          .sort((a, b) => {
            if (sortBy === 0) {
              return a?.name?.localeCompare(b?.name);
            } else if (sortBy === 1) {
              return b?.name?.localeCompare(a?.name);
            } else {
              const aDate = new Date(a.dateTime).getTime();
              const bDate = new Date(b.dateTime).getTime();
              if (sortBy === 3) {
                return aDate - bDate;
              } else {
                return bDate - aDate;
              }
            }
          })
          .filter((report) => {
            if (search === "") {
              return true;
            }
            const name = report.name?.toLowerCase();
            const searchLower = search.toLowerCase();
            return name ? name.includes(searchLower) : false;
          })
          .map((report: any) => (
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
