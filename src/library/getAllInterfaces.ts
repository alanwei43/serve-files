import { networkInterfaces } from "node:os";

export function getAllInterfaces() {
  const interfaces = networkInterfaces();
  const ips: Array<{
    name: string
    ip: string
  }> = [];
  for (const name in interfaces) {
    const list = interfaces[name] || [];
    for (const int of list) {
      if (int.internal) {
        continue;
      }
      ips.push({
        name: name,
        ip: int.address,
      });
    }
  }
  return ips;
}