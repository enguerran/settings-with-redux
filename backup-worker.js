let cronBackup = null;

function cron(callback, frequency) {
  return setInterval(callback, frequency);
}

function backup() {
  console.log(`[${new Date().toLocaleString()}] backup`);
}

function startBackup() {
  if (cronBackup) {
    return null;
  }
  cronBackup = cron(backup, 1500);
}

function stopBackup() {
  if (cronBackup) {
    clearInterval(cronBackup);
    cronBackup = null;
  }
}

onmessage = function(e) {
  const data = e.data;
  switch (data.cmd) {
    case "start":
      startBackup();
      break;
    case "stop":
      stopBackup();
      break;
    default:
      console.warn("unhandled command", data.cmd);
  }
};
