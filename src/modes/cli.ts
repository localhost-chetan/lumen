import { isCancel, select, text } from "@clack/prompts"
import chalk from "chalk";

export const cli = async () => {
    while (true) {
        const mode = await select({
            message: "Choose CLI sub-mode: ",
            options: [
                { value: "agent", label: "Agent" },
                { value: "planner", label: "Planner" },
                { value: "ask", label: "Ask" },
                { value: "back", label: "↩ Back to main menu" }
            ]
        }) as "agent" | "planner" | "ask" | "back"

        if (isCancel(mode) || mode === "back") return;

        else if (mode === "agent") { console.log(chalk.greenBright("Agent mode selected. (Not implemented yet)")) }

        else if (mode === "planner") { console.log(chalk.greenBright("Planner mode selected. (Not implemented yet)")) }

        else if (mode === "ask") {
            const question = await text({
                message: "What is your question? ",
                placeholder: "Enter your question"
            }) as string

            console.log(chalk.blueBright(`Question: ${question}`))
        }

        else {
            console.log(chalk.red("Invalid mode selected."))
        }
    }
}