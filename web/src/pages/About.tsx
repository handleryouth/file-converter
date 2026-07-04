import { Accordion, Typography } from "@heroui/react";

import React from "react";

const categories = [
  {
    title: "General",
    items: [
      {
        title: "What is this converter for?",
        content:
          "This tool helps you convert your images and videos into different formats quickly and easily. Think of it like a smart machine that transforms your media files into exactly what you need without any confusing steps.",
      },
      {
        title: "Why is this tool different?",
        content:
          "Usually, converting a file means uploading it to a website on the internet, which means a stranger gets to hold onto your private photos or videos. This tool is built like a helper that lives entirely inside your own computer—your files never leave your device, keeping them 100% safe and private.",
      },
    ],
  },
  {
    title: "How It Works (Pros & Cons)",
    items: [
      {
        title: "What are the benefits of local conversion?",
        content:
          "Because everything runs right in your browser, you get absolute privacy with zero risk of data leaks. There are no server wait times, no premium paywalls, and no file size limits because you aren't paying for cloud storage.",
      },
      {
        title: "Are there any downsides?",
        content:
          "Since the heavy lifting happens entirely on your machine using your local hardware power, large video conversions might run slowly on older phones or laptops, and it can consume more battery than outsourcing the work to a cloud server.",
      },
    ],
  },
];

export default function About() {
  return (
    <div className="w-full flex flex-col gap-8">
      {categories.map((category) => (
        <div key={category.title}>
          <Typography.Heading
            level={3}
            className="text-md mb-2 font-medium text-muted"
          >
            {category.title}
          </Typography.Heading>
          <Accordion
            allowsMultipleExpanded
            className="w-full"
            variant="surface"
          >
            {category.items.map((item, index) => (
              <Accordion.Item key={index}>
                <Accordion.Heading>
                  <Accordion.Trigger>
                    <Typography.Paragraph>{item.title}</Typography.Paragraph>
                  </Accordion.Trigger>
                </Accordion.Heading>
                <Accordion.Panel>
                  <Accordion.Body>
                    <Typography.Paragraph className="text-sm text-muted">
                      {item.content}
                    </Typography.Paragraph>
                  </Accordion.Body>
                </Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>
        </div>
      ))}
    </div>
  );
}
