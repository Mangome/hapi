import { AgentRegistry } from '@/agent/AgentRegistry';
import { AcpSdkBackend } from '@/agent/backends/acp';

function buildEnv(): Record<string, string> {
    return Object.keys(process.env).reduce((acc, key) => {
        const value = process.env[key];
        if (typeof value === 'string') {
            acc[key] = value;
        }
        return acc;
    }, {} as Record<string, string>);
}

export function registerCodebuddyAgent(yolo: boolean): void {
    const args = ['--acp'];
    if (yolo) args.push('--dangerously-skip-permissions');

    AgentRegistry.register('codebuddy', () => new AcpSdkBackend({
        command: 'codebuddy',
        args,
        env: buildEnv()
    }));
}
