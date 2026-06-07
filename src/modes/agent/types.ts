export type ActionType = "file_create" | "file_modify" | "file_delete" | "folder_create" | "code_analysis" | "tool_execute"

export type ActionStatus = "pending" | "executed" | "approved" | "rejected"

export type ActionLog = {
    id: string;
    timestamp: Date;
    type: ActionType;
    path: string;
    status: ActionStatus;
    userApproval: boolean | null; // null = pending, true = approved, false = rejected
    details: {
        before?: string;
        after?: string;
        toolName?: string;
        toolResult?: string;
        error?: string;
        command?: string;
    }
}

export type AgentConfig = {
    codebasePath: string;
    maxFileSizeToRead: number; // in bytes
    excludePatterns: string[]; // glob patterns to exclude from analysis
    tools: {
        allowShellExecution: boolean;
        allowFileModification: boolean;
        allowFileCreation: boolean;
        allowFolderCreation: boolean;
    }
}

export const defaultAgentConfig = (): AgentConfig => ({
    codebasePath: process.cwd(),
    maxFileSizeToRead: 1024 * 1024, // 1 MB
    excludePatterns: ["node_modules/**", ".git/**", "dist/**", ".next/**", "out/**", ".env*", "*.log", "coverage/**", "build/**"],
    tools: {
        allowShellExecution: true,
        allowFileModification: true,
        allowFileCreation: true,
        allowFolderCreation: true,
    }
})

export const isMutationType = (type: ActionType): boolean => {
    return ["file_modify", "file_create", "file_delete", "folder_create", "tool_execute", "code_analysis"].includes(type);
}