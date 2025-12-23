import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from 'dayjs/plugin/localizedFormat';

import {
  altitudeFromMeters,
  altitudeUnitString,
  distanceFromMeters,
  distanceUnitString,
  speedFromKnots,
  speedUnitString,
  volumeFromLiters,
  volumeUnitString,
  convertLlc1Fuel,
  convertLlc2Fuel,
  hexFixedAscii,
} from './converter';
import { prefixString } from './stringUtils';

dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

export const formatBoolean = (value, t) => (value ? t('sharedYes') : t('sharedNo'));

export const formatNumber = (value, precision = 1) => Number(value.toFixed(precision));

export const formatPercentage = (value) => `${value}%`;

export const formatTemperature = (value) => `${value.toFixed(1)}°C`;

export const formatVoltage = (value, t) => `${value.toFixed(2)} ${t('sharedVoltAbbreviation')}`;

export const formatConsumption = (value, t) => `${value.toFixed(2)} ${t('sharedLiterPerHourAbbreviation')}`;

export const formatTime = (value, format) => {
  if (value) {
    const d = dayjs(value).toDate();
    const dateConfig = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const minuteConfig = { hour: '2-digit', minute: '2-digit' };
    const secondConfig = { ...minuteConfig, second: '2-digit' };
    switch (format) {
      case 'date':
        return d.toLocaleDateString(undefined, dateConfig);
      case 'time':
        return d.toLocaleTimeString(undefined, secondConfig);
      case 'minutes':
        return d.toLocaleString(undefined, { ...dateConfig, ...minuteConfig });
      default:
        return d.toLocaleString(undefined, { ...dateConfig, ...secondConfig });
    }
  }
  return '';
};
export function formatTachoMinutes(value) {
  if (value === null || value === undefined) return '';
  const v = parseInt(value, 10);
  if (v === 65535) return '';
  if (isNaN(v)) return '';

  const hours = Math.floor(v / 60);
  const mins = v % 60;
  return `${hours}:${mins.toString().padStart(2, '0')}`;
}

export function formatIo10538(value, t) {
  if (value === 65535 || value === 0xffff) {
    return t('io10538Unavailable');
  }

  const r10h = value & 0b00000111;
  const rrdr = (value >> 3) & 0b00000111;
  const unknown = (value >> 6) & 0b00000011;
  const card = (value >> 8) & 0b00000011;
  const weeklyCalc = (value >> 10) & 0b00000011;
  const multi = (value >> 12) & 0b00000011;
  const overlap = (value >> 14) & 0b00000011;

  return `
${t('io10538R10h')}: ${r10h}
• ${t('io10538Rrdr')}: ${rrdr}
• ${t('io10538Unknown')}: ${
      unknown === 0 ? t('io10538No') : t('io10538Yes')
    }
• ${t('io10538Card')}: ${
      card === 0 ? t('io10538Ok') : t('io10538NotEnough')
    }
• ${t('io10538WeeklyCalc')}: ${
      weeklyCalc === 0 ? t('io10538Disabled') : t('io10538Enabled')
    }
• ${t('io10538Multi')}: ${
      multi === 0 ? t('io10538SingleDriver') : t('io10538MultiDriver')
    }
• ${t('io10538Overlap')}: ${
      overlap === 0 ? t('io10538No') : t('io10538Yes')
    }
  `.trim();
}

export const formatStatus = (value, t) => t(prefixString('deviceStatus', value));

export const formatAlarm = (value, t) => {
  if (value) {
    return value.split(',')
      .map((alarm) => t(prefixString('alarm', alarm)))
      .join(', ');
  }
  return '';
};

export const formatCourse = (value) => {
  const courseValues = ['\u2191', '\u2197', '\u2192', '\u2198', '\u2193', '\u2199', '\u2190', '\u2196'];
  let normalizedValue = (value + 45 / 2) % 360;
  if (normalizedValue < 0) {
    normalizedValue += 360;
  }
  return courseValues[Math.floor(normalizedValue / 45)];
};

export const formatDistance = (value, unit, t) => `${distanceFromMeters(value, unit).toFixed(2)} ${distanceUnitString(unit, t)}`;

export const formatAltitude = (value, unit, t) => `${altitudeFromMeters(value, unit).toFixed(2)} ${altitudeUnitString(unit, t)}`;

export const formatSpeed = (value, unit, t) => `${speedFromKnots(value, unit).toFixed(2)} ${speedUnitString(unit, t)}`;

export const formatVolume = (value, unit, t) => `${volumeFromLiters(value, unit).toFixed(2)} ${volumeUnitString(unit, t)}`;

export const formatWeight = (value, t) => {
  if (value == null) return '';
  if (value >= 1000) {
    return `${(value / 1000).toFixed(2)} ${t('sharedTonneAbbreviation')}`;
  }
  return `${value.toFixed(2)} ${t('sharedKilogramAbbreviation')}`;
};

export const formatEpoch = (timestamp) => {
  if (!timestamp) return '';
  return new Date(timestamp * 1000).toLocaleString();
};
export const formatLlc1Fuel = (raw, volumeUnit, t) => {
  const liters = convertLlc1Fuel(raw);
  return liters != null ? formatVolume(liters, volumeUnit, t) : '';
};
export const formatLlc2Fuel = (raw, volumeUnit, t) => {
  const liters = convertLlc2Fuel(raw);
  return liters != null ? formatVolume(liters, volumeUnit, t) : '';
};
export const formatLlcFuelTotal = (raw1, raw2, volumeUnit, t) => {
  const v1 = Number(raw1);
  const v2 = Number(raw2);
  if (isNaN(v1) || isNaN(v2)) return '';

  const total = convertLlc1Fuel(v1) + convertLlc2Fuel(v2);
  return formatVolume(total, volumeUnit, t);
};
export const formatAsciiHex = (value) => hexFixedAscii(value);

export const formatNumericHours = (value, t) => {
  const hours = Math.floor(value / 3600000);
  const minutes = Math.floor((value % 3600000) / 60000);
  return `${hours} ${t('sharedHourAbbreviation')} ${minutes} ${t('sharedMinuteAbbreviation')}`;
};

export const formatTachoPerformance = (value, t) => {
  switch (value) {
    case 0: return t('tachoPerformanceNormal');
    case 1: return t('tachoPerformanceAnalysis');
    case 2: return t('tachoPerformanceError');
    case 3: return t('tachoPerformanceNotAvailable');
    default:
      return '';
  }
};
export const formatDiagnosticsSupported = (value, t) => {
  switch (value) {
    case 0: return t('diagnosticsNotSupported');
    case 1: return t('diagnosticsSupported');
    case 2: return t('diagnosticsReserved');
    case 3: return t('diagnosticsDoNotCare');
    default:
      return '';
  }
};
export function formatCruiseControl(value, t) {
  switch (value) {
    case 0: return t('cruiseControlOff');
    case 1: return t('cruiseControlOn');
    default: return '';
  }
}

export const formatSleepMode = (value, t) => {
  switch (value) {
    case 0: return t('noSleep');
    case 1: return t('deepSleep');
    case 2: return t('GPSSleep');
    case 3: return t('onlineDeepSleep');
    default: return '';
  }
};
export function formatDriverWorkState(value, t) {
  switch (value) {
    case 0: return t('driverWorkRest');
    case 1: return t('driverWorkAvailable');
    case 2: return t('driverWorkWork');
    case 3: return t('driverWorkDrive');
    case 6: return t('driverWorkError');
    case 7: return t('driverWorkNotAvailable');
    default: return '';
  }
}
export function formatDriverCardPresence(value, t) {
  switch (value) {
    case 0: return t('driverCardNotPresent');
    case 1: return t('driverCardPresent');
    case 2: return t('driverCardError');
    case 3: return t('driverCardNotAvailable');
    default: return '';
  }
}
export function formatDriverTimeState(value, t) {
  switch (value) {
    case 0: return t('driverTimeNormal');
    case 1: return t('driverTime15Before45');
    case 2: return t('driverTime45Reached');
    case 3: return t('driverTime15Before9');
    case 4: return t('driverTime9Reached');
    case 5: return t('driverTime15Before16');
    case 6: return t('driverTime16Reached');
    case 7: return t('driverTimeWeeklyPrewarn');
    case 8: return t('driverTimeWeeklyWarn');
    case 9: return t('driverTime2WeeksPrewarn');
    case 10: return t('driverTime2WeeksWarn');
    case 11: return t('driverTimeCardExpiry');
    case 12: return t('driverTimeNextDownload');
    case 13: return t('driverTimeOther');
    case 14: return t('driverTimeError');
    case 15: return t('driverTimeNotAvailable');
    default: return '';
  }
}
export function formatDataMode(value, t) {
  switch (value) {
    case 0: return t('dataModeHomeStop');
    case 1: return t('dataModeHomeMove');
    case 2: return t('dataModeRoamingStop');
    case 3: return t('dataModeRoamingMove');
    case 4: return t('dataModeUnknownStop');
    case 5: return t('dataModeUnknownMove');
    default: return '';
  }
}
export function formatTachoDataSource(value, t) {
  switch (value) {
    case 0: return t('tachoSourceUnknown');
    case 1: return t('tachoSourceKline');
    case 2: return t('tachoSourceAllCan');
    case 3: return t('tachoSourceTachoCan');
    case 4: return t('tachoSourceFms');
    default: return '';
  }
}
export function formatGnssStatus(value, t) {
  switch (value) {
    case 0: return t('gnssOff');
    case 1: return t('gnssOnNoAntenna');
    case 2: return t('gnssOnNoFix');
    case 3: return t('gnssOnWithFix');
    case 4: return t('gnssSleep');
    case 5: return t('gnssOvercurrent');
    default: return '';
  }
}


export const formatCoordinate = (key, value, unit) => {
  let hemisphere;
  let degrees;
  let minutes;
  let seconds;

  if (key === 'latitude') {
    hemisphere = value >= 0 ? 'N' : 'S';
  } else {
    hemisphere = value >= 0 ? 'E' : 'W';
  }

  switch (unit) {
    case 'ddm':
      value = Math.abs(value);
      degrees = Math.floor(value);
      minutes = (value - degrees) * 60;
      return `${degrees}° ${minutes.toFixed(6)}' ${hemisphere}`;
    case 'dms':
      value = Math.abs(value);
      degrees = Math.floor(value);
      minutes = Math.floor((value - degrees) * 60);
      seconds = Math.round((value - degrees - minutes / 60) * 3600);
      return `${degrees}° ${minutes}' ${seconds}" ${hemisphere}`;
    default:
      return `${value.toFixed(6)}°`;
  }
};

export const getStatusColor = (status) => {
  switch (status) {
    case 'online':
      return 'success';
    case 'offline':
      return 'error';
    case 'unknown':
    default:
      return 'neutral';
  }
};

export const getBatteryStatus = (batteryLevel) => {
  if (batteryLevel >= 70) {
    return 'success';
  }
  if (batteryLevel > 30) {
    return 'warning';
  }
  return 'error';
};

export const formatNotificationTitle = (t, notification, includeId) => {
  if (notification.description) {
    return notification.description;
  }
  let title = t(prefixString('event', notification.type));
  if (notification.type === 'alarm') {
    const alarmString = notification.attributes.alarms;
    if (alarmString) {
      const alarms = alarmString.split(',');
      if (alarms.length > 1) {
        title += ` (${alarms.length})`;
      } else {
        title += ` ${formatAlarm(alarms[0], t)}`;
      }
    }
  }
  if (includeId) {
    title += ` [${notification.id}]`;
  }
  return title;
};
