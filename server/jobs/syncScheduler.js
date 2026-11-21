const cron = require('node-cron');
const { syncAllActiveConfigs, syncSingleConfig } = require('../services/apiSyncService');

let scheduledTask = null;

/**
 * Initializes and starts the background sync cron job
 * @param {string} schedule - Cron expression (defaults to every 60 minutes)
 */
function startScheduler(schedule = '0 */1 * * *') {
  if (scheduledTask) {
    scheduledTask.stop();
  }

  console.log(`[Cron Scheduler] Initializing agricultural price sync cron with expression: "${schedule}"`);

  scheduledTask = cron.schedule(schedule, async () => {
    console.log(`[Cron Scheduler] Triggering automatic periodic market price sync at ${new Date().toISOString()}`);
    try {
      await syncAllActiveConfigs();
    } catch (err) {
      console.error('[Cron Scheduler Error]', err.message);
    }
  });

  return scheduledTask;
}

/**
 * Stop the background scheduler
 */
function stopScheduler() {
  if (scheduledTask) {
    scheduledTask.stop();
    scheduledTask = null;
    console.log('[Cron Scheduler] Sync scheduler stopped.');
  }
}

/**
 * Manually trigger synchronization (e.g. from Admin "Sync Now" button)
 * @param {string} [configId] - Optional specific config ID
 */
async function triggerManualSync(configId = null) {
  console.log(`[Manual Sync Triggered] configId: ${configId || 'ALL'}`);
  if (configId) {
    return await syncSingleConfig(configId);
  }
  return await syncAllActiveConfigs();
}

module.exports = {
  startScheduler,
  stopScheduler,
  triggerManualSync
};
