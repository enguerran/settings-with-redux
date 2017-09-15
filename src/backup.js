let cronBackup = null;

function cron(callback, frequency) {
  return setInterval(callback, frequency);
}

function backup() {
  console.log(`[${new Date().toLocaleString()}] backup`);
}

export function startBackup() {
  if (cronBackup) {
    return null;
  }
  cronBackup = cron(backup, 1500);
  console.log("start backup: " + cronBackup);
}

export function stopBackup() {
  if (cronBackup) {
    clearInterval(cronBackup);
    cronBackup = null;
  }
}
