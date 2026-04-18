import type { CodebuddyPermissionMode } from '@hapi/protocol/types'

export type PermissionMode = CodebuddyPermissionMode

export interface CodebuddyMode {
    permissionMode: PermissionMode
    model?: string
}
