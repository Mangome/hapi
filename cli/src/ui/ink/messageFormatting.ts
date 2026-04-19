import type { BufferedMessage } from './messageBuffer';

export function getMessageColor(type: BufferedMessage['type']): string {
    switch (type) {
        case 'user': return 'magenta';
        case 'assistant': return 'cyan';
        case 'system': return 'blue';
        case 'tool': return 'yellow';
        case 'result': return 'green';
        case 'status': return 'gray';
        default: return 'white';
    }
}

export function formatMessage(content: string, maxWidth: number): string {
    const maxLineLength = Math.max(1, maxWidth);
    const lines = content.split('\n');
    return lines.map(line => {
        if (line.length <= maxLineLength) return line;
        const chunks: string[] = [];
        for (let i = 0; i < line.length; i += maxLineLength) {
            chunks.push(line.slice(i, i + maxLineLength));
        }
        return chunks.join('\n');
    }).join('\n');
}

export function extractTag(messages: BufferedMessage[], tag: 'MODEL' | 'MODE'): string | null {
    const prefix = `[${tag}:`;
    for (let index = messages.length - 1; index >= 0; index -= 1) {
        const message = messages[index];
        if (message.type !== 'system') {
            continue;
        }
        if (!message.content.startsWith(prefix)) {
            continue;
        }
        const match = message.content.match(/\[\w+:(.+?)\]/);
        if (match && match[1]) {
            return match[1];
        }
    }
    return null;
}

export function filterVisibleMessages(messages: BufferedMessage[]): BufferedMessage[] {
    return messages.filter(msg => {
        if (msg.type === 'system' && msg.content.startsWith('[MODEL:')) {
            return false;
        }
        if (msg.type === 'system' && msg.content.startsWith('[MODE:')) {
            return false;
        }
        return true;
    });
}
