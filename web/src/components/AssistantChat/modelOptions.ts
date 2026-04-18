import { MODEL_OPTIONS } from '@/components/NewSession/types'
import { getClaudeComposerModelOptions, getNextClaudeComposerModel } from './claudeModelOptions'
import type { ClaudeComposerModelOption } from './claudeModelOptions'

export type ModelOption = ClaudeComposerModelOption

function getGeminiModelOptions(currentModel?: string | null): ModelOption[] {
    const options = MODEL_OPTIONS.gemini.map((m) => ({
        value: m.value === 'auto' ? null : m.value,
        label: m.label
    }))
    const normalized = currentModel?.trim() || null
    if (normalized && !options.some((o) => o.value === normalized)) {
        options.splice(1, 0, { value: normalized, label: normalized })
    }
    return options
}

function getNextGeminiModel(currentModel?: string | null): string | null {
    const options = getGeminiModelOptions(currentModel)
    const currentIndex = options.findIndex((o) => o.value === (currentModel ?? null))
    if (currentIndex === -1) {
        return options[0]?.value ?? null
    }
    return options[(currentIndex + 1) % options.length]?.value ?? null
}

function getCodebuddyModelOptions(currentModel?: string | null): ModelOption[] {
    const options = MODEL_OPTIONS.codebuddy.map((m) => ({
        value: m.value === 'auto' ? null : m.value,
        label: m.label
    }))
    const normalized = currentModel?.trim() || null
    if (normalized && !options.some((o) => o.value === normalized)) {
        options.splice(1, 0, { value: normalized, label: normalized })
    }
    return options
}

function getNextCodebuddyModel(currentModel?: string | null): string | null {
    const options = getCodebuddyModelOptions(currentModel)
    const currentIndex = options.findIndex((o) => o.value === (currentModel ?? null))
    if (currentIndex === -1) {
        return options[0]?.value ?? null
    }
    return options[(currentIndex + 1) % options.length]?.value ?? null
}

export function getModelOptionsForFlavor(flavor: string | undefined | null, currentModel?: string | null): ModelOption[] {
    if (flavor === 'gemini') {
        return getGeminiModelOptions(currentModel)
    }
    if (flavor === 'codebuddy') {
        return getCodebuddyModelOptions(currentModel)
    }
    return getClaudeComposerModelOptions(currentModel)
}

export function getNextModelForFlavor(flavor: string | undefined | null, currentModel?: string | null): string | null {
    if (flavor === 'gemini') {
        return getNextGeminiModel(currentModel)
    }
    if (flavor === 'codebuddy') {
        return getNextCodebuddyModel(currentModel)
    }
    return getNextClaudeComposerModel(currentModel)
}
