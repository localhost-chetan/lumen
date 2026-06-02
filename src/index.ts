#!/usr/bin/env bun

import { select, text } from "@clack/prompts"

const main = async () => {
    const userName = await text({
        message: "What is your name? ",
        placeholder: "Enter your name",
        validate(value) {
            if (!value || value.trim().length === 0) {
                return "Must enter a name"
            }
            if (value.length < 2) {
                return "Name must be at least 2 characters long"
            }
            if (value.length > 20) {
                return "Name must be less than 20 characters long"
            }
            if (!/^[a-zA-Z]+(?: [a-zA-Z]+)*$/.test(value)) {
                return "Name must only contain letters and single spaces"
            }
        }
    }) as string

    const framework = await select({
        message: "Which framework do you want to use? ",
        options: [
            { value: "react", label: "React" },
            { value: "vue", label: "Vue" },
            { value: "svelte", label: "Svelte" },
            { value: "angular", label: "Angular" }
        ]
    }) as string

    console.log(`Hello ${userName}! You have selected ${framework} as your framework.`)
}

main()