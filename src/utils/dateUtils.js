/**
 * Pure date calculation utility for LDR days, remaining days, and progress bar.
 *
 * IMPORTANT:
 * - TIDAK BOLEH menggunakan localStorage!
 * - Selalu dihitung murni berdasarkan START_DATE dan END_DATE dari loveConfig.
 * - Memastikan hasil identik di semua device, browser, dan refresh.
 */

export function calculateLdrStatus(
  startDateStr,
  endDateStr,
  overrideDay = null,
  competitionEndDateStr = '2026-10-14'
) {
  const [sYear, sMonth, sDay] = startDateStr.split('-').map(Number);
  const [cYear, cMonth, cDay] = (competitionEndDateStr || '2026-10-14').split('-').map(Number);
  const targetEnd = new Date(cYear, cMonth - 1, cDay, 23, 59, 59, 999);

  // If simulation/preview day is active in dev mode, use it
  if (overrideDay !== null && overrideDay !== undefined) {
    const day = Math.min(10, Math.max(1, parseInt(overrideDay, 10)));
    const remaining = Math.max(0, 10 - day);
    const progressPercent = Math.min(100, Math.round((day / 10) * 100));
    const filledBlocks = Math.round((progressPercent / 100) * 10);
    const emptyBlocks = 10 - filledBlocks;
    const progressBar = '█'.repeat(filledBlocks) + '░'.repeat(emptyBlocks);

    const simDate = new Date(sYear, sMonth - 1, sDay + (day - 1), 12, 0, 0);
    const isAfterDate14 = simDate.getTime() > targetEnd.getTime();

    return {
      currentDay: day,
      totalDays: 10,
      daysRemaining: remaining,
      progressPercent,
      progressBar,
      isFinished: day >= 10,
      isDay10: day === 10,
      isAfterDate14,
      isAfterCompetition: isAfterDate14
    };
  }

  // Parse YYYY-MM-DD components explicitly to guarantee local midnight
  const startMidnight = new Date(sYear, sMonth - 1, sDay, 0, 0, 0, 0);

  const now = new Date();
  const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);

  const msPerDay = 1000 * 60 * 60 * 24;
  const diffDays = Math.round((todayMidnight.getTime() - startMidnight.getTime()) / msPerDay);

  // Day 1 on start date, Day 2 on next day, etc.
  let currentDay = diffDays + 1;

  if (currentDay < 1) currentDay = 1;
  if (currentDay > 10) currentDay = 10;

  const daysRemaining = Math.max(0, 10 - currentDay);
  const progressPercent = Math.min(100, Math.max(10, Math.round((currentDay / 10) * 100)));
  const filledBlocks = Math.round((progressPercent / 100) * 10);
  const emptyBlocks = 10 - filledBlocks;
  const progressBar = '█'.repeat(filledBlocks) + '░'.repeat(emptyBlocks);

  const isAfterDate14 = now.getTime() > targetEnd.getTime();

  return {
    currentDay,
    totalDays: 10,
    daysRemaining,
    progressPercent,
    progressBar,
    isFinished: currentDay >= 10,
    isDay10: currentDay === 10,
    isAfterDate14,
    isAfterCompetition: isAfterDate14
  };
}
