import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Note Service",
  description: "Note management system",
}


export default function Layout({ children, }: { children: React.ReactNode }) {
  return (
    <div className="container-xxl" style={{ position: "relative" }}>
      {children}
    </div>
  )
}