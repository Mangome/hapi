import { logger } from '@/ui/logger';
import { spawnWithTerminalGuard } from '@/utils/spawnWithTerminalGuard';
import type { PermissionMode } from './types';

export async function codebuddyLocal(opts: {
    path: string;
    sessionId: string | null;
    abort: AbortSignal;
    model?: string;
    permissionMode?: PermissionMode;
}): Promise<void> {
    const args: string[] = [];

    if (opts.sessionId) {
        args.push('--resume', opts.sessionId);
    }
    if (opts.model) {
        args.push('--model', opts.model);
    }
    if (opts.permissionMode === 'bypassPermissions') {
        args.push('--dangerously-skip-permissions');
    } else if (opts.permissionMode && opts.permissionMode !== 'default') {
        args.push('--permission-mode', opts.permissionMode);
    }

    logger.debug(`[CodebuddyLocal] Spawning codebuddy with args: ${JSON.stringify(args)}`);

    await spawnWithTerminalGuard({
        command: 'codebuddy',
        args,
        cwd: opts.path,
        env: process.env,
        signal: opts.abort,
        shell: process.platform === 'win32',
        logLabel: 'CodebuddyLocal',
        spawnName: 'codebuddy',
        installHint: 'CodeBuddy Code CLI',
        includeCause: true,
        logExit: true
    });
}
