import { logger } from '@/ui/logger';
import { MessageQueue2 } from '@/utils/MessageQueue2';
import { runLocalRemoteSession } from '@/agent/loopBase';
import { CodebuddySession } from './session';
import { codebuddyLocalLauncher } from './codebuddyLocalLauncher';
import { codebuddyRemoteLauncher } from './codebuddyRemoteLauncher';
import { ApiClient, ApiSessionClient } from '@/lib';
import type { CodebuddyMode, PermissionMode } from './types';

interface CodebuddyLoopOptions {
    path: string;
    startingMode?: 'local' | 'remote';
    startedBy?: 'runner' | 'terminal';
    onModeChange: (mode: 'local' | 'remote') => void;
    messageQueue: MessageQueue2<CodebuddyMode>;
    session: ApiSessionClient;
    api: ApiClient;
    permissionMode?: PermissionMode;
    model?: string;
    resumeSessionId?: string;
    onSessionReady?: (session: CodebuddySession) => void;
}

export async function codebuddyLoop(opts: CodebuddyLoopOptions): Promise<void> {
    const logPath = logger.getLogPath();
    const startedBy = opts.startedBy ?? 'terminal';
    const startingMode = opts.startingMode ?? 'local';

    const session = new CodebuddySession({
        api: opts.api,
        client: opts.session,
        path: opts.path,
        sessionId: opts.resumeSessionId ?? null,
        logPath,
        messageQueue: opts.messageQueue,
        onModeChange: opts.onModeChange,
        mode: startingMode,
        startedBy,
        startingMode,
        permissionMode: opts.permissionMode ?? 'default'
    });

    if (opts.resumeSessionId) {
        session.onSessionFound(opts.resumeSessionId);
    }

    const getCurrentModel = (): string | undefined => {
        const sessionModel = session.getModel();
        return sessionModel != null ? sessionModel : opts.model;
    };

    await runLocalRemoteSession({
        session,
        startingMode: opts.startingMode,
        logTag: 'codebuddy-loop',
        runLocal: (instance) => codebuddyLocalLauncher(instance, {
            model: getCurrentModel()
        }),
        runRemote: (instance) => codebuddyRemoteLauncher(instance, {
            model: getCurrentModel()
        }),
        onSessionReady: opts.onSessionReady
    });
}
