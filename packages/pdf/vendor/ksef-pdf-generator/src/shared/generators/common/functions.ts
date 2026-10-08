import { FP as FP2 } from '../../../lib-public/types/fa2.types';
import i18n from 'i18next';

// ksefuj patch: upstream imports its own package.json for the version; we do not vendor that file,
// so the version of the vendored release is a constant (keep in sync with VENDORED.md).
const packageInfo = { version: '1.1.40' };

export function translateMap(value: FP2 | string | undefined, map: Record<string, string>): string {
  let valueToTranslate = typeof value === 'string' ? value : value?._text;

  valueToTranslate = valueToTranslate?.trim();
  if (!valueToTranslate || !map[valueToTranslate]) {
    return '';
  }
  return i18n.t(map[valueToTranslate]);
}

// ksefuj patch: helpers for the time-zone independent date formatting below.
const DATE_ONLY = /^(\d{4})-(\d{2})-(\d{2})$/;
const WARSAW_PARTS = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Europe/Warsaw',
  hourCycle: 'h23',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
});

function warsawParts(date: Date): Record<'year' | 'month' | 'day' | 'hours' | 'minutes' | 'seconds', string> {
  const parts: Record<string, string> = {};

  for (const part of WARSAW_PARTS.formatToParts(date)) {
    parts[part.type] = part.value;
  }
  return {
    year: parts.year,
    month: parts.month,
    day: parts.day,
    hours: parts.hour,
    minutes: parts.minute,
    seconds: parts.second,
  };
}

export function formatDateTime(data?: string, withoutSeconds?: boolean, withoutTime?: boolean): string {
  if (!data) {
    return '';
  }
  // ksefuj patch: date-only values are formatted from their components (new Date() parses them as
  // UTC midnight and the local getters below shifted them a day west of UTC), and date-times are
  // read in Europe/Warsaw like formatDateTimePl, so the output does not depend on the viewer's TZ.
  const dateOnly = DATE_ONLY.exec(data);

  if (dateOnly && withoutTime) {
    return `${dateOnly[3]}.${dateOnly[2]}.${dateOnly[1]}`;
  }

  const dateTime: Date = new Date(data);

  if (isNaN(dateTime.getTime())) {
    return data;
  }

  const { year, month, day, hours, minutes, seconds } = warsawParts(dateTime);

  if (withoutTime) {
    return `${day}.${month}.${year}`;
  } else if (withoutSeconds) {
    return `${day}.${month}.${year} ${hours}:${minutes}`;
  }
  return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
}

export function formatDateTimePl(value: string, withTime?: boolean, withSeconds?: boolean): string {
  const optionsForDate: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
  const optionsForTime: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
  };
  const optionsForSeconds: Intl.DateTimeFormatOptions = { second: '2-digit' };

  if (!value) {
    return '';
  }
  // ksefuj patch: date-only values are formatted from their components (no Date round trip).
  const dateOnly = DATE_ONLY.exec(value);

  if (dateOnly && !withTime) {
    return `${dateOnly[3]}.${dateOnly[2]}.${dateOnly[1]}`;
  }
  const date = new Date(value);

  if (isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat('pl-PL', {
    timeZone: 'Europe/Warsaw',
    ...optionsForDate,
    ...(withTime && optionsForTime),
    ...(withSeconds && optionsForSeconds),
  })
    .format(date)
    .replace(', ', ' ');
}

export function getDateTimeWithoutSeconds(isoDate?: FP2): string {
  if (!isoDate?._text) {
    return '';
  }
  return formatDateTimePl(isoDate._text, true);
}

export function formatTime(data?: string, withoutSeconds?: boolean): string {
  if (!data) {
    return '';
  }
  const dateTime: Date = new Date(data);

  if (isNaN(dateTime.getTime())) {
    return data;
  }

  // ksefuj patch: Europe/Warsaw instead of the local time zone (see formatDateTime).
  const { hours, minutes, seconds } = warsawParts(dateTime);

  if (withoutSeconds) {
    return `${hours}:${minutes}`;
  }
  return `${hours}:${minutes}:${seconds}`;
}

export function createVersionLabel(application?: string): string {
  return `${application || i18n.t('invoice.footer.appName')} (ksef-pdf-generator - ${i18n.t('invoice.footer.version')} ${packageInfo.version})`;
}

export function unwrapText(value: any): any {
  if (value == null) {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map(unwrapText);
  }

  if (typeof value === 'object') {
    if ('_text' in value) {
      return unwrapText(value._text);
    }

    const result: any = {};

    for (const key in value) {
      if (key === '_attributes' || key === '_comment') {
        continue;
      }
      result[key] = unwrapText(value[key]);
    }

    return result;
  }

  return value;
}

export function pick<T extends Record<string, any>, K extends keyof T>(obj: T, keys: readonly K[]): any {
  const result: any = {};

  for (const key of keys) {
    result[key] = unwrapText(obj[key]);
  }

  return result;
}

export function hasAnyValue(value: unknown): boolean {
  if (value === null || value === undefined) {
    return false;
  }

  if (typeof value === 'string') {
    return value.trim() !== '';
  }

  if (typeof value === 'boolean' || typeof value === 'number') {
    return true;
  }

  if (Array.isArray(value)) {
    return value.some(hasAnyValue);
  }

  if (typeof value === 'object') {
    return Object.values(value).some(hasAnyValue);
  }

  return true;
}
