"use client";

import { Alert, Button, Form, Input, TimePicker } from "antd";
import { BodyComponent } from "reactjs-human-body";
import { DatePicker } from "antd";
import { useState } from "react";
import createReport from "../server/create";
import { camelCaseToSentenceCase } from "../utils";
import TextArea from "antd/es/input/TextArea";

const bodyPartsAll = [
  "head",
  "leftShoulder",
  "rightShoulder",
  "leftArm",
  "rightArm",
  "chest",
  "stomach",
  "leftLeg",
  "rightLeg",
  "rightHand",
  "leftHand",
  "leftFoot",
  "rightFoot",
];

const formItemLayout = { labelCol: { span: 8 }, wrapperCol: { span: 14 } };

export default function CreateReport() {
  const [form] = Form.useForm();
  const [bodyParts, setBodyParts] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);

  const onFinish = async (values: any) => {
    if (bodyParts.length === 0) {
      alert("Please select a body part");
      return;
    }
    createReport(JSON.stringify(values));
    form.resetFields();
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 1000);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl mb-8 text-center">Got Injured?</h1>
      <Form
        {...formItemLayout}
        form={form}
        onFinish={onFinish}
        className="grid grid-cols-2 gap-4"
        name="createReport"
      >
        <div>
          <Form.Item label="Name" name={"name"}>
            <Input placeholder="Name" required />
          </Form.Item>
          <Form.Item label="Age" name={"age"}>
            <Input type="number" placeholder="Age" required />
          </Form.Item>
          <Form.Item label="Date" name={"date"} required>
            <DatePicker aria-required />
          </Form.Item>
          <Form.Item label="Time" name={"time"} required>
            <TimePicker />
          </Form.Item>
          <h2 className="text-xl mb-8">Body Parts</h2>
          {bodyPartsAll.map((bp, index) => {
            return (
              <Form.Item
                label={camelCaseToSentenceCase(bp)}
                key={index}
                name={bp}
                hidden={!bodyParts.includes(bp)}
              >
                <TextArea
                  placeholder="injury details"
                  required={bodyParts.includes(bp)}
                />
              </Form.Item>
            );
          })}
        </div>
        <div>
          <BodyComponent
            onChange={(s: any) => {
              setBodyParts(Object.keys(s).filter((k) => s[k].selected));
            }}
          />
        </div>
        <div className="col-span-2 flex justify-center">
          <Button htmlType="submit">Submit</Button>
        </div>
      </Form>
      {success && <Alert message="added report" type="success" />}
    </div>
  );
}
