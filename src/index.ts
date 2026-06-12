#!/usr/bin/env bun

import { isCancel, select } from "@clack/prompts"
import figlet from "figlet"
import { cli } from "@modes/cli"
import chalk from "chalk"
import { wait } from "@utils/utils"

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

    if ((isCancel(mode) || mode === "Exit")) {
        console.log(chalk.dim("Exiting..."))
        process.exit(0)
    }

    else if (mode === "CLI") {
        console.log(chalk.green("Starting CLI mode..."))
        await wait(500)
        await cli()
    }

    else if (mode === "Telegram") {
        console.log(chalk.red("Telegram mode is not implemented yet."))
    }
}

main()