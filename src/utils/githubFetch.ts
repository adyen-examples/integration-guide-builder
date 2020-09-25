const BASE_URL = "raw.githubusercontent.com";
const DEFAULT_REPO = "adyen-examples/integration-guides";
const DEFAULT_BRANCH = "master";
const PROTOCOL = "https";

export async function fetchFromGitHub(path: string): Promise<Response> {
  const URL = `${PROTOCOL}://${BASE_URL}/${DEFAULT_REPO}/${DEFAULT_BRANCH}/${path}`;
  try {
    const res = await fetch(URL);
    if (res.status !== 200) {
      throw new Error(`${res.status}: ${res.statusText}`);
    }
    return res;
  } catch (e) {
    throw e;
  }
}
