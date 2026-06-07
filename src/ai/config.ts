import { get_openrouter_api_key, get_openrouter_default_model } from "@utils/service-urls";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";

export const getAgentModel = () => {
    const provider = createOpenRouter({
        apiKey: get_openrouter_api_key(),
    })
    const modelId = get_openrouter_default_model();

    return provider(modelId);
}