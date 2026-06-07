#!/usr/bin/env bun

import { isCancel, select } from "@clack/prompts"
import figlet from "figlet"
import { cli } from "./modes/cli"

const main = async () => {
    const banner = figlet.textSync("Lumen", {
        font: "ANSI Shadow",
        horizontalLayout: "default",
        verticalLayout: "default",
    })
    console.log(banner)

    const mode = await select({
        message: "Which mode do you want to use? ",
        options: [
            { value: "CLI", label: "CLI" },
            { value: "Telegram", label: "Telegram" },
            { value: "Exit", label: "Exit" }
        ]
    }) as "CLI" | "Telegram" | "Exit"

    if (isCancel(mode || mode === "Exit")) {
        process.exit(0)
    }

    else if (mode === "CLI") {
        await cli()
    }
}

main()