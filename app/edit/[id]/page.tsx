"use client";

import { Alert, Button, Form, Input, Spin, TimePicker } from "antd";
import { DatePicker } from "antd";
import { useEffect, useState } from "react";
import updateReport from "../../server/update";
import { formItemLayout } from "../../utils";
import TextArea from "antd/es/input/TextArea";
import { getReport } from "@/app/server/view";
import day from "dayjs";


const EditReport = ({ params }: { params: { id: string } }) => {
  const [form] = Form.useForm();
  const [success, setSuccess] = useState(false);
  const [report, setReport] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getReport(params.id).then((report) => {
      console.log(report);
      setReport(JSON.parse(report));
      setLoading(false);
    });
  }, [params.id]);

  const onFinish = async (values: any) => {
    values.part = report.part;
    updateReport(params.id, JSON.stringify(values)).then((res) => {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 1000);
    });
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl mb-8 text-center">Update Previous Report</h1>
      {loading && (
        <div className="flex justify-center items-center h-64">
          <Spin />
        </div>
      )}
      {report && report.part && (
        <Form
          {...formItemLayout}
          form={form}
          onFinish={onFinish}
          className="flex flex-col gap-4"
          name="createReport"
          initialValues={{
            date: day(report.dateTime),
            time: day(report.dateTime),
            part: report.part,
            details: report.details,
            name: report.name,
          }}
        >
          <div>
            <Form.Item label="Name" name={"name"}>
              <Input placeholder="Name" required />
            </Form.Item>
            <Form.Item label="Date" name={"date"} required>
              <DatePicker aria-required />
            </Form.Item>
            <Form.Item label="Time" name={"time"} required>
              <TimePicker />
            </Form.Item>
            <h2 className="text-xl mb-8">Body Parts</h2>
            <Form.Item label="injury details" name="details">
              <TextArea placeholder="injury details" />
            </Form.Item>
          </div>
          <div className="col-span-2 flex justify-center">
            <Button htmlType="submit">Submit</Button>
          </div>
          <div className="col-span-2 flex justify-center">
            {success && <Alert message="Report updated" type="success" />}
          </div>
        </Form>
      )}
    </div>
  );
};

export default EditReport;
