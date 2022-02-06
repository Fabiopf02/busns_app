export function getStatus(time1: string | Date, time2: string | Date) {
  const now = new Date();
  const opening = new Date(time1);
  const closing = new Date(time2);

  if (closing.getHours() === 0) {
    closing.setHours(24);
  }

  if (
    now.getHours() === opening.getHours() &&
    now.getMinutes() < opening.getMinutes()
  ) {
    return 'closed';
  }
  if (
    now.getHours() === closing.getHours() &&
    now.getMinutes() >= closing.getMinutes()
  ) {
    return 'closed';
  }

  if (
    now.getHours() >= opening.getHours() &&
    now.getHours() <= closing.getHours()
  ) {
    return 'opened';
  } else {
    return 'closed';
  }
}
