"use client";
import dynamic from "next/dynamic";
const DynamicPage = dynamic(() => import("./DynamicPage"), { ssr: false });
export default function Home() {
  return <DynamicPage />;
}
