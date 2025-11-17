import { useSelector } from 'react-redux';
import { Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import {
  formatAlarm,
  formatAltitude,
  formatBoolean,
  formatCoordinate,
  formatCourse,
  formatDistance,
  formatNumber,
  formatNumericHours,
  formatPercentage,
  formatSpeed,
  formatTime,
  formatTemperature,
  formatVoltage,
  formatVolume,
  formatConsumption,
  formatWeight,
  formatEpoch,
  formatLlc1Fuel,
  formatLlc2Fuel,
} from '../util/formatter';
import { speedToKnots } from '../util/converter';
import { useAttributePreference, usePreference } from '../util/preferences';
import { useTranslation } from './LocalizationProvider';
import { useDeviceReadonly } from '../util/permissions';
import AddressValue from './AddressValue';
import GeofencesValue from './GeofencesValue';
import DriverValue from './DriverValue';

const PositionValue = ({ position, property, attribute }) => {
  const t = useTranslation();

  const deviceReadonly = useDeviceReadonly();

  const device = useSelector((state) => state.devices.items[position.deviceId]);

  const key = property || attribute;
  const value = property ? position[property] : position.attributes[attribute];

  const distanceUnit = useAttributePreference('distanceUnit');
  const altitudeUnit = useAttributePreference('altitudeUnit');
  const speedUnit = useAttributePreference('speedUnit');
  const volumeUnit = useAttributePreference('volumeUnit');
  const coordinateFormat = usePreference('coordinateFormat');

  const formatValue = () => {
    switch (key) {
      case 'fixTime':
      case 'deviceTime':
      case 'serverTime':
        return formatTime(value, 'seconds');
      case 'latitude':
        return formatCoordinate('latitude', value, coordinateFormat);
      case 'longitude':
        return formatCoordinate('longitude', value, coordinateFormat);
      case 'speed':
        return value != null ? formatSpeed(value, speedUnit, t) : '';
      case 'obdSpeed':
        return value != null ? formatSpeed(speedToKnots(value, 'kmh'), speedUnit, t) : '';
      case 'course':
        return formatCourse(value);
      case 'altitude':
        return formatAltitude(value, altitudeUnit, t);
      case 'power':
      case 'battery':
        return value != null ? formatVoltage(value, t) : '';
      case 'batteryLevel':
      case 'fuelLevel': //рівень топлива
        return value != null ? formatPercentage(value) : '';
      case 'volume':
      case 'fuelUsed': //топливо використане
        return value != null ? formatVolume(value, volumeUnit, t) : '';
      case 'fuelConsumption':
        return value != null ? formatConsumption(value, t) : '';
      case 'coolantTemp':
      case 'ambientTemp':
        return value != null ? formatTemperature(value) : '';
      case 'alarm':
        return formatAlarm(value, t);
      case 'serviceOdometer': //відстань до сервісу
        return value != null ? formatDistance(value, 'km', t) : '';
      case 'odometer':
      case 'tripOdometer':
      case 'obdOdometer':
      case 'distance':
      case 'totalDistance':
      case 'totalOdometer_io': //перевірити дубль внизу
        return value != null ? formatDistance(value, distanceUnit, t) : '';
      case 'hours':
        return value != null ? formatNumericHours(value, t) : '';
      case 'd1EndFSlWp':
      case 'd1EndLWrp':
      case 'd1EndLDrr':
      case 'nextCalD':
      case 'timestamp':
        return formatEpoch(value);
      case 'llc1FuelLevel': //датчик топлива 818л
	    return formatLlc1Fuel(value, volumeUnit, t);
      case 'llc1FuelLeve2': //датчик топлива 415Л
	    return formatLlc2Fuel(value, volumeUnit, t);
      default:
        if (attribute === 'grossCombVWeight') { //вага тз
          return formatWeight(value, t);
        }
        if (attribute === 'accelerationPedalPosition') { //положення газу, %
          return formatPercentage(value, t);
        }
        if (attribute === 'wheelBasedSpeed') { //швидкість тз на основі коліс
          return formatSpeed(value, "kmh", t);
        }
        //if (attribute === 'totalOdometer_io') { //один одометр (іо)
        //  return formatDistance(value, "m", t);
        //}
        if (typeof value === 'number') {
          return formatNumber(value);
        } if (typeof value === 'boolean') {
          return formatBoolean(value, t);
        }
        return value || '';
    }
  };

  if (key === 'address') {
    return <AddressValue latitude={position.latitude} longitude={position.longitude} originalAddress={value} />;
  }

  if (value === undefined || value === null) {
    return '';
  }

  switch (key) {
    case 'image':
    case 'video':
    case 'audio':
      return <Link href={`/api/media/${device.uniqueId}/${value}`} target="_blank">{value}</Link>;
    case 'totalDistance':
    case 'hours':
      return (
        <>
          {formatValue(value)}
          &nbsp;&nbsp;
          {!deviceReadonly && <Link component={RouterLink} underline="none" to={`/settings/accumulators/${position.deviceId}`}>&#9881;</Link>}
        </>
      );
    case 'network':
      return <Link component={RouterLink} underline="none" to={`/network/${position.id}`}>{t('sharedInfoTitle')}</Link>;
    case 'geofenceIds':
      return <GeofencesValue geofenceIds={value} />;
    case 'driverUniqueId':
      return <DriverValue driverUniqueId={value} />;
    default:
      return formatValue(value);
  }
};

export default PositionValue;
