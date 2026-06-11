const get_env = (key: string) => {
    const value = process.env[key];
    if (!value) {
        throw new Error(`${key} is not set`);
    }
    return value;
}

export const get_openrouter_api_key = () => {
    return get_env("OPENROUTER_API_KEY");
}

export const get_openrouter_default_model = () => {
    return get_env("OPENROUTER_DEFAULT_MODEL");
}