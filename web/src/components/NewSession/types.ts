import { GEMINI_MODEL_PRESETS, GEMINI_MODEL_LABELS } from '@hapi/protocol'

export type AgentType = 'claude' | 'codex' | 'cursor' | 'gemini' | 'opencode' | 'codebuddy'
export type SessionType = 'simple' | 'worktree'
export type CodexReasoningEffort = 'default' | 'low' | 'medium' | 'high' | 'xhigh'
export type ClaudeEffort = 'auto' | 'medium' | 'high' | 'max'

export const MODEL_OPTIONS: Record<AgentType, { value: string; label: string }[]> = {
    claude: [
        { value: 'auto', label: 'Auto' },
        { value: 'opus', label: 'Opus' },
        { value: 'opus[1m]', label: 'Opus 1M' },
        { value: 'sonnet', label: 'Sonnet' },
        { value: 'sonnet[1m]', label: 'Sonnet 1M' },
    ],
    codex: [
        { value: 'auto', label: 'Auto' },
        { value: 'gpt-5.4', label: 'GPT-5.4' },
        { value: 'gpt-5.4-mini', label: 'GPT-5.4 Mini' },
        { value: 'gpt-5.3-codex', label: 'GPT-5.3 Codex' },
        { value: 'gpt-5.2-codex', label: 'GPT-5.2 Codex' },
        { value: 'gpt-5.2', label: 'GPT-5.2' },
        { value: 'gpt-5.1-codex-max', label: 'GPT-5.1 Codex Max' },
        { value: 'gpt-5.1-codex-mini', label: 'GPT-5.1 Codex Mini' },
    ],
    cursor: [],
    gemini: [
        { value: 'auto', label: 'Default' },
        ...GEMINI_MODEL_PRESETS.map(m => ({ value: m, label: GEMINI_MODEL_LABELS[m] })),
    ],
    opencode: [],
    codebuddy: [
        { value: 'auto', label: 'Default' },
        { value: 'claude-sonnet-4.6', label: 'Claude Sonnet 4.6' },
        { value: 'claude-sonnet-4.6-1m', label: 'Claude Sonnet 4.6 1M' },
        { value: 'claude-4.5', label: 'Claude 4.5' },
        { value: 'claude-opus-4.7', label: 'Claude Opus 4.7' },
        { value: 'claude-opus-4.7-1m', label: 'Claude Opus 4.7 1M' },
        { value: 'claude-opus-4.6', label: 'Claude Opus 4.6' },
        { value: 'claude-opus-4.6-1m', label: 'Claude Opus 4.6 1M' },
        { value: 'claude-opus-4.5', label: 'Claude Opus 4.5' },
        { value: 'claude-haiku-4.5', label: 'Claude Haiku 4.5' },
        { value: 'gemini-3.1-pro', label: 'Gemini 3.1 Pro' },
        { value: 'gemini-3.0-flash', label: 'Gemini 3.0 Flash' },
        { value: 'gemini-2.5-pro', label: 'Gemini 2.5 Pro' },
        { value: 'gemini-3.1-flash-lite', label: 'Gemini 3.1 Flash Lite' },
        { value: 'gpt-5.4', label: 'GPT-5.4' },
        { value: 'gpt-5.2', label: 'GPT-5.2' },
        { value: 'gpt-5.3-codex', label: 'GPT-5.3 Codex' },
        { value: 'gpt-5.2-codex', label: 'GPT-5.2 Codex' },
        { value: 'gpt-5.1', label: 'GPT-5.1' },
        { value: 'gpt-5.1-codex', label: 'GPT-5.1 Codex' },
        { value: 'gpt-5.1-codex-max', label: 'GPT-5.1 Codex Max' },
        { value: 'gpt-5.1-codex-mini', label: 'GPT-5.1 Codex Mini' },
        { value: 'glm-5.1-ioa', label: 'GLM 5.1' },
        { value: 'glm-5.0-turbo-ioa', label: 'GLM 5.0 Turbo' },
        { value: 'glm-5v-turbo-ioa', label: 'GLM 5V Turbo' },
        { value: 'glm-5.0-ioa', label: 'GLM 5.0' },
        { value: 'glm-4.7-ioa', label: 'GLM 4.7' },
        { value: 'minimax-m2.7-ioa', label: 'MiniMax M2.7' },
        { value: 'minimax-m2.5-ioa', label: 'MiniMax M2.5' },
        { value: 'kimi-k2.5-ioa', label: 'Kimi K2.5' },
        { value: 'deepseek-v3-2-volc-ioa', label: 'DeepSeek V3.2' },
        { value: 'hunyuan-2.0-thinking-ioa', label: 'Hunyuan 2.0 Thinking' },
    ],
}

export const CODEX_REASONING_EFFORT_OPTIONS: { value: CodexReasoningEffort; label: string }[] = [
    { value: 'default', label: 'Default' },
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'xhigh', label: 'XHigh' },
]

export const CLAUDE_EFFORT_OPTIONS: { value: ClaudeEffort; label: string }[] = [
    { value: 'auto', label: 'Auto' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'max', label: 'Max' },
]
