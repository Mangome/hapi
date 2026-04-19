import React, { useEffect, useState } from 'react';
import { Box, Text, useStdout } from 'ink';
import { MessageBuffer, type BufferedMessage } from './messageBuffer';
import { useSwitchControls } from './useSwitchControls';
import { getMessageColor, formatMessage, extractTag, filterVisibleMessages } from './messageFormatting';

export interface AgentDisplayConfig {
    agentName: string;
    showModelPermission: boolean;
}

export const AGENT_CONFIGS = {
    claude:     { agentName: 'Claude',     showModelPermission: false },
    codex:      { agentName: 'Codex',      showModelPermission: false },
    gemini:     { agentName: 'Gemini',     showModelPermission: true  },
    codebuddy:  { agentName: 'CodeBuddy',  showModelPermission: true  },
    opencode:   { agentName: 'OpenCode',   showModelPermission: true  },
    cursor:     { agentName: 'Cursor',     showModelPermission: true  },
} as const satisfies Record<string, AgentDisplayConfig>;

interface AgentDisplayProps {
    config: AgentDisplayConfig;
    messageBuffer: MessageBuffer;
    logPath?: string;
    onExit?: () => void;
    onSwitchToLocal?: () => void;
}

export const AgentDisplay: React.FC<AgentDisplayProps> = ({
    config,
    messageBuffer,
    logPath,
    onExit,
    onSwitchToLocal
}) => {
    const [messages, setMessages] = useState<BufferedMessage[]>([]);
    const [model, setModel] = useState<string | null>(null);
    const [permissionMode, setPermissionMode] = useState<string | null>(null);
    const { confirmationMode, actionInProgress } = useSwitchControls({
        onExit,
        onSwitch: onSwitchToLocal
    });
    const { stdout } = useStdout();
    const terminalWidth = stdout.columns || 80;
    const terminalHeight = stdout.rows || 24;

    useEffect(() => {
        setMessages(messageBuffer.getMessages());

        const unsubscribe = messageBuffer.onUpdate((newMessages) => {
            setMessages(newMessages);
            if (config.showModelPermission) {
                const nextModel = extractTag(newMessages, 'MODEL');
                if (nextModel) {
                    setModel(nextModel);
                }
                const nextMode = extractTag(newMessages, 'MODE');
                if (nextMode) {
                    setPermissionMode(nextMode);
                }
            }
        });

        return () => {
            unsubscribe();
        };
    }, [messageBuffer, config.showModelPermission]);

    const visibleMessages = config.showModelPermission
        ? filterVisibleMessages(messages)
        : messages;

    return (
        <Box flexDirection="column" width={terminalWidth} height={terminalHeight}>
            <Box
                flexDirection="column"
                width={terminalWidth}
                height={terminalHeight - 4}
                borderStyle="round"
                borderColor="gray"
                paddingX={1}
                overflow="hidden"
            >
                <Box flexDirection="column" marginBottom={1}>
                    <Text color="gray" bold>{config.agentName} Agent Messages</Text>
                    <Text color="gray" dimColor>{'─'.repeat(Math.min(terminalWidth - 4, 60))}</Text>
                </Box>

                <Box flexDirection="column" height={terminalHeight - 10} overflow="hidden">
                    {visibleMessages.length === 0 ? (
                        <Text color="gray" dimColor>Waiting for messages...</Text>
                    ) : (
                        visibleMessages
                            .slice(-Math.max(1, terminalHeight - 10))
                            .map((msg) => (
                                <Box key={msg.id} flexDirection="column" marginBottom={1}>
                                    <Text color={getMessageColor(msg.type)} dimColor>
                                        {formatMessage(msg.content, terminalWidth - 10)}
                                    </Text>
                                </Box>
                            ))
                    )}
                </Box>
            </Box>

            <Box
                width={terminalWidth}
                borderStyle="round"
                borderColor={
                    actionInProgress ? 'gray' :
                    confirmationMode === 'exit' ? 'red' :
                    confirmationMode === 'switch' ? 'yellow' :
                    'green'
                }
                paddingX={2}
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
            >
                <Box flexDirection="column" alignItems="center">
                    {actionInProgress === 'exiting' ? (
                        <Text color="gray" bold>
                            Exiting agent...
                        </Text>
                    ) : actionInProgress === 'switching' ? (
                        <Text color="gray" bold>
                            Switching to local mode...
                        </Text>
                    ) : confirmationMode === 'exit' ? (
                        <Text color="red" bold>
                            Press Ctrl-C again to exit the agent
                        </Text>
                    ) : confirmationMode === 'switch' ? (
                        <Text color="yellow" bold>
                            Press Space again to switch to local mode
                        </Text>
                    ) : (
                        <Text color="green" bold>
                            {config.agentName} running {onSwitchToLocal ? '(Space → local, Ctrl-C → exit)' : '(Ctrl-C to exit)'}
                        </Text>
                    )}
                    {config.showModelPermission && (model || permissionMode) && (
                        <Text color="gray" dimColor>
                            {model ? `Model: ${model}` : 'Model: default'}
                            {permissionMode ? ` | Permission: ${permissionMode}` : ''}
                        </Text>
                    )}
                    {process.env.DEBUG && logPath && (
                        <Text color="gray" dimColor>
                            Debug logs: {logPath}
                        </Text>
                    )}
                </Box>
            </Box>
        </Box>
    );
};
