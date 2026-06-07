import { isCancel, text } from "@clack/prompts"
import chalk from "chalk"
import { defaultAgentConfig } from "@modes/agent/types"

export const runAgentMode = async () => {
    console.log(chalk.bold("Running Agent Mode..."))

    const goal = await text({
        message: "What would you like the agent to do? ",
        placeholder: "Concretely describe the task you want the agent to accomplish."
    }) as string

    console.log(chalk.blueBright(`Goal: ${goal}`))

    if (isCancel(goal || !goal.trim())) {
        console.log(chalk.red("Agent mode cancelled. Returning to CLI menu."))
        return;
    }
}