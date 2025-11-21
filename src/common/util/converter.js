const speedConverter = (unit) => {
  switch (unit) {
    case 'kmh':
      return 1.852;
    case 'mph':
      return 1.15078;
    case 'kn':
    default:
      return 1;
  }
};

export const convertLlc1Fuel = (raw) => {
  if (raw == null) return null;

  return (((((( -4.62559077e-20 * raw
      + 3.09843417e-16) * raw
      - 5.74615318e-13) * raw
      - 1.10108860e-09) * raw
      + 7.18574165e-06) * raw
      + 1.94144873e-01) * raw
      + 3.78487085);
};

export const convertLlc2Fuel = (raw) => {
  if (raw == null) return null;

  return (((((( -5.33307303e-19 * raw
      + 6.66892059e-15) * raw
      - 3.21819335e-11) * raw
      + 7.39347508e-08) * raw
      - 7.94421818e-05) * raw
      + 1.35923062e-01) * raw
      + 2.95947480);
};
export const hexLongToAscii = (value) => {
  if (value == null) return '';

  try {
    let hex = Number(value).toString(16);
    if (hex.length % 2 !== 0) {
      hex = '0' + hex;
    }
    let ascii = '';
    for (let i = 0; i < hex.length; i += 2) {
      const byte = parseInt(hex.slice(i, i + 2), 16);
      ascii += String.fromCharCode(byte);
    }
    return ascii.trim();
  } catch (e) {
    return String(value);
  }
};
export const speedUnitString = (unit, t) => {
  switch (unit) {
    case 'kmh':
      return t('sharedKmh');
    case 'mph':
      return t('sharedMph');
    case 'kn':
    default:
      return t('sharedKn');
  }
};

export const speedFromKnots = (value, unit) => value * speedConverter(unit);

export const speedToKnots = (value, unit) => value / speedConverter(unit);

const distanceConverter = (unit) => {
  switch (unit) {
    case 'mi':
      return 0.000621371;
    case 'nmi':
      return 0.000539957;
    case 'km':
    default:
      return 0.001;
  }
};

export const distanceUnitString = (unit, t) => {
  switch (unit) {
    case 'mi':
      return t('sharedMi');
    case 'nmi':
      return t('sharedNmi');
    case 'km':
    default:
      return t('sharedKm');
  }
};

export const distanceFromMeters = (value, unit) => value * distanceConverter(unit);

export const distanceToMeters = (value, unit) => value / distanceConverter(unit);

const altitudeConverter = (unit) => {
  switch (unit) {
    case 'ft':
      return 3.28084;
    case 'm':
    default:
      return 1;
  }
};

export const altitudeUnitString = (unit, t) => {
  switch (unit) {
    case 'ft':
      return t('sharedFeet');
    case 'm':
    default:
      return t('sharedMeters');
  }
};

export const altitudeFromMeters = (value, unit) => value * altitudeConverter(unit);

export const altitudeToMeters = (value, unit) => value / altitudeConverter(unit);

const volumeConverter = (unit) => {
  switch (unit) {
    case 'impGal':
      return 4.546;
    case 'usGal':
      return 3.785;
    case 'ltr':
    default:
      return 1;
  }
};

export const volumeUnitString = (unit, t) => {
  switch (unit) {
    case 'impGal':
      return t('sharedGallonAbbreviation');
    case 'usGal':
      return t('sharedGallonAbbreviation');
    case 'ltr':
    default:
      return t('sharedLiterAbbreviation');
  }
};

export const volumeFromLiters = (value, unit) => value / volumeConverter(unit);

export const volumeToLiters = (value, unit) => value * volumeConverter(unit);
