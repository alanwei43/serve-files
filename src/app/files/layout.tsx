import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Files Service",
  description: "File managment system",
}


export default function Layout({ children, }: { children: React.ReactNode }) {
  return (
    <div className="container-xxl" style={{ position: "relative" }}>
      {children}
    </div>
  )
}