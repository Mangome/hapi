import { AcpSdkBackend } from '@/agent/backends/acp';

function filterEnv(env: NodeJS.ProcessEnv): Record<string, string> {
    const result: Record<string, string> = {};
    for (const [key, value] of Object.entries(env)) {
        if (value !== undefined) {
            result[key] = value;
        }
    }
    return result;
}

export function createCodebuddyBackend(opts: {
    model?: string;
    cwd?: string;
    permissionMode?: string;
}): AcpSdkBackend {
    const args = ['--acp'];
    if (opts.model) {
        args.push('--model', opts.model);
    }
    if (opts.permissionMode === 'bypassPermissions') {
        args.push('--dangerously-skip-permissions');
    } else if (opts.permissionMode) {
        args.push('--permission-mode', opts.permissionMode);
    }

    return new AcpSdkBackend({
        command: 'codebuddy',
        args,
        env: filterEnv(process.env)
    });
}
