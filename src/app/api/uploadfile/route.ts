import { POST as mainUploadPOST } from "../upload/route";

export async function POST(request: Request) {
  return mainUploadPOST(request);
}

