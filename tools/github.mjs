/** Local GitHub publishing helper. Credentials stay in memory and are never logged. */
import { execFileSync } from "node:child_process";
const repo = "a5ura/robotics-portfolio";
const mode = process.argv[2] || "inspect";
let credential;
try {
  const output = execFileSync("git", ["credential", "fill"], {
    input: "protocol=https\nhost=github.com\n\n",
    encoding: "utf8",
    env: { ...process.env, GCM_INTERACTIVE: "never", GIT_TERMINAL_PROMPT: "0" },
    stdio: ["pipe", "pipe", "pipe"],
    timeout: 15000,
    windowsHide: true,
  });
  credential = Object.fromEntries(
    output
      .trim()
      .split("\n")
      .map((line) => {
        const at = line.indexOf("=");
        return [line.slice(0, at), line.slice(at + 1).trim()];
      }),
  );
} catch {
  console.error(
    "No noninteractive GitHub credential is available in local Git Credential Manager.",
  );
  process.exit(2);
}
if (!credential.password) {
  console.error("Git Credential Manager returned no credential.");
  process.exit(2);
}
async function api(path, method = "GET", body) {
  const response = await fetch(`https://api.github.com${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${credential.password}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      ...(body ? { "Content-Type": "application/json" } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  const data = await response.json().catch(() => ({}));
  return { status: response.status, data };
}
const user = await api("/user");
if (user.data.login !== "a5ura") {
  console.error("Credential is not authorized as a5ura; stopping.");
  process.exit(2);
}
console.log("Authenticated local GitHub identity: a5ura");
let target = await api(`/repos/${repo}`);
if (mode === "publish" && target.status === 404) {
  target = await api("/user/repos", "POST", {
    name: "robotics-portfolio",
    description:
      "Gowtham Kanneganti — Robotics & AI Engineer | CMPS 510 portfolio",
    private: false,
    auto_init: false,
  });
  if (target.status !== 201) {
    console.error(
      `Repository creation failed: HTTP ${target.status} ${target.data.message}`,
    );
    process.exit(3);
  }
  console.log("Created public repository: " + target.data.html_url);
}
console.log(
  JSON.stringify({
    repositoryStatus: target.status,
    url: target.data.html_url,
    visibility: target.data.visibility,
    defaultBranch: target.data.default_branch,
    size: target.data.size,
  }),
);
if (mode === "publish") {
  if (target.data.private !== false) {
    console.error("Expected a public repository; stopping.");
    process.exit(3);
  }
  execFileSync("git", ["push", "-u", "origin", "main"], {
    stdio: "inherit",
    env: { ...process.env, GCM_INTERACTIVE: "never", GIT_TERMINAL_PROMPT: "0" },
    windowsHide: true,
  });
  let pages = await api(`/repos/${repo}/pages`);
  if (pages.status === 404)
    pages = await api(`/repos/${repo}/pages`, "POST", {
      build_type: "workflow",
    });
  else if (pages.status === 200 && pages.data.build_type !== "workflow")
    pages = await api(`/repos/${repo}/pages`, "PUT", {
      build_type: "workflow",
    });
  console.log(
    JSON.stringify({
      pagesStatus: pages.status,
      url: pages.data.html_url,
      buildType: pages.data.build_type,
      message: pages.data.message,
    }),
  );
  if (![200, 201, 204].includes(pages.status)) process.exitCode = 4;
}
if (mode === "status") {
  const pages = await api(`/repos/${repo}/pages`);
  const runs = await api(`/repos/${repo}/actions/runs?per_page=3`);
  console.log(
    JSON.stringify(
      {
        pagesStatus: pages.status,
        url: pages.data.html_url,
        runs: runs.data.workflow_runs?.map((r) => ({
          id: r.id,
          sha: r.head_sha,
          status: r.status,
          conclusion: r.conclusion,
          url: r.html_url,
        })),
      },
      null,
      2,
    ),
  );
}
