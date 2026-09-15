// Converts "09:00" to minutes since midnight
const toMinutes = (hhmm) => {
  const [h, m] = String(hhmm).split(':').map(Number);
  return h * 60 + (m || 0);
};

const toLabel = (minutes) => {
  const h = String(Math.floor(minutes / 60)).padStart(2, '0');
  const m = String(minutes % 60).padStart(2, '0');
  return `${h}:${m}`;
};

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Normalizes any date input to midnight UTC so equality checks are reliable
const normalizeDate = (input) => {
  const d = new Date(input);
  if (isNaN(d.getTime())) return null;
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
};

const SLOT_MINUTES = 30;

// Builds every slot a doctor works on a given date
const generateSlots = (doctor, date) => {
  const day = DAY_NAMES[date.getUTCDay()];
  const days = doctor.availability?.days;

  if (Array.isArray(days) && days.length && !days.includes(day)) {
    return [];
  }

  const start = toMinutes(doctor.availability?.startTime || '09:00');
  const end = toMinutes(doctor.availability?.endTime || '17:00');
  if (end <= start) return [];

  const slots = [];
  for (let t = start; t + SLOT_MINUTES <= end; t += SLOT_MINUTES) {
    slots.push(toLabel(t));
  }
  return slots;
};

module.exports = { generateSlots, normalizeDate, toMinutes, SLOT_MINUTES, DAY_NAMES };