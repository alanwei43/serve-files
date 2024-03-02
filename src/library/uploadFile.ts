export async function uploadFile(folder: string, file: File, onProgress: (data: OnProgressValue) => void) {
  const blocks = splitFile(file);
  for (const block of blocks) {
    const base64 = await readAsBase64(block.buffer);

    const request = await fetch("/api/files", {
      method: "PUT",
      body: JSON.stringify({
        ...block,
        fileName: file.name,
        base64: base64,
        folder: folder
      })
    });
    const json: { success: boolean, length: number } = await request.json();
    onProgress({
      ...json,
      blocks: {
        total: blocks.length,
        current: blocks.indexOf(block) + 1,
        percent: (blocks.indexOf(block) + 1) / blocks.length
      },
    });
  }
}

function splitFile(file: File) {
  const BLOCK_SIZE = 5 * 1024 * 1024;
  const blocksCount = Math.ceil(file.size / BLOCK_SIZE); // 分块数量
  const blocks: Array<{ offset: number, buffer: Blob, index: number }> = []; // 每块数据
  for (let index = 0; index < blocksCount; index++) {
    const offset = index * BLOCK_SIZE;
    blocks.push({
      offset: offset,
      buffer: file.slice(offset, offset + BLOCK_SIZE),
      index: index
    });
  }
  return blocks;
}

function readAsBase64(data: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(data);
    reader.onload = () => resolve((reader.result as string).split(";base64,")[1]);
    reader.onerror = err => reject(err);
  });
}

export type OnProgressValue = {
  success: boolean
  length: number
  blocks: {
    total: number
    current: number
    percent: number
  }
}