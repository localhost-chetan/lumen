#!/usr/bin/env bun

import { isCancel, select } from "@clack/prompts"
import figlet from "figlet"
import { cli } from "@modes/cli"
import chalk from "chalk"

const printBannerWithShadow = (text: string) => {
    const BANNER_FONT = "ANSI Shadow"

    const banner = figlet.textSync(text, {
        font: BANNER_FONT,
        horizontalLayout: "default",
        verticalLayout: "default",
    })
    console.log(chalk.yellowBright(banner))
}

const main = async () => {
    printBannerWithShadow("Lumen")

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

    else {
        console.log(chalk.red("Telegram mode is not implemented yet."))
    }
}

main()