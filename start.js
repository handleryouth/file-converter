import { rawlist } from "@inquirer/prompts";
import concurrently from "concurrently";

const questions = {
  message: "🚀 What would you like to launch today?",
  choices: [
    { name: "💻 Everything (Frontend + API + Job)", value: "both" },
    { name: "🎨 + ⚙️  Frontend and API Only", value: "frontendWithApi" },
    { name: "🎨 Frontend Only", value: "frontend" },
    { name: "⚙️  Backend Only (API)", value: "backendApi" },
    { name: "🤖 Backend Only (Job Converter)", value: "backendJob" },
  ],
};

rawlist(questions).then((answers) => {
  const commands = [];

  if (
    answers === "both" ||
    answers === "frontendWithApi" ||
    answers === "frontend"
  ) {
    commands.push({
      command: "npm run dev",
      cwd: "./web",
      name: "Frontend",
      prefixColor: "cyan",
    });
  }

  if (
    answers === "both" ||
    answers === "frontendWithApi" ||
    answers === "backendApi"
  ) {
    commands.push({
      command: "./gradlew bootRun",
      cwd: "./backend",
      name: "BackendApi",
      prefixColor: "green",
    });
  }

  if (answers === "both" || answers === "backendJob") {
    commands.push({
      command: "./gradlew bootRun",
      cwd: "./converterJob",
      name: "BackendJob",
      prefixColor: "blue",
    });
  }
  concurrently(commands, {
    killOthers: ["failure", "success"],
  });
});
