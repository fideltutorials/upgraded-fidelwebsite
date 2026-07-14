import Layout from "@/layouts/Layout";
import ResourcesClient from "./ResourcesClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Learning Resources — Fidel Tutorial",
  description: "Download free past papers, mock exam templates, and explore study tips for grade 6, grade 8, and grade 12 national exams.",
};

export default function Resources() {
  return (
    <Layout>
      <ResourcesClient />
    </Layout>
  );
}
