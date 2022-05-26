import React from 'react';
import {
  Branch16 as GitIcon,
  Misuse16 as FailedIcon,
  PendingFilled16 as PendingIcon,
  InProgress16 as RunningIcon,
  CheckmarkFilled16 as SuccessIcon,
  CheckmarkFilledWarning16 as SuccessWarningIcon,
  Timer16 as TimerIcon,
  Flash16 as TriggerIcon,
  User16 as UserIcon,
  WarningAltFilled16 as WarningIcon,
  Webhook16 as WebhookIcon
} from '@carbon/icons-react';

// TODO: need 'skipped' status (e.g. when expressions)
const statusIcons = {
  dummy: () => <></>,
  failed: FailedIcon,
  git: GitIcon,
  manual: UserIcon,
  pending: PendingIcon,
  running: RunningIcon,
  success: SuccessIcon,
  'success-warning': SuccessWarningIcon,
  timer: TimerIcon,
  trigger: TriggerIcon,
  warning: WarningIcon,
  webhook: WebhookIcon
};

export default function StatusIcon({ status, title }) {
  const Icon = statusIcons[status] || PendingIcon;
  return (
    <Icon className={`status-icon status-icon-${status}`}>
      {title ? <title>{title}</title> : null}
    </Icon>
  );
}
