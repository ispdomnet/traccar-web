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
  formatLlcFuelTotal,
  formatTachoMinutes,
  formatIo10538,
  formatAsciiHex,
  formatTachoPerformance,
  formatDiagnosticsSupported,
  formatCruiseControl,
  formatSleepMode,
  formatDriverWorkState,
  formatDriverCardPresence,
  formatDriverTimeState,
  formatDataMode,
  formatTachoDataSource,
  formatOutOfScope,
  formatKlinePrivacy,
  formatTachoOverSpeed,
  formatDriveRecognize,
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
	try {
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
      //case 'wheelBasedSpeed': //швидкість тз на основі коліс
        return value != null ? formatSpeed(value, speedUnit, t) : '';
      case 'obdSpeed':
      //case 'tahoSpeed': //перевірити
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
      case 'accelerationPedalPosition': //педаль акслератора
      case 'adBL': //рівень адблю
	  case 'engineLoad':
        return value != null ? formatPercentage(value) : '';
      case 'llcFuelTotal':
        return formatLlcFuelTotal(
        position.attributes.llc1FuelLevel,
        position.attributes.llc2FuelLevel,
        volumeUnit, t);
      case 'volume':
      case 'fuelUsed': //топливо використане
        return value != null ? formatVolume(value, volumeUnit, t) : '';
      case 'fuelConsumption':
        return value != null ? formatConsumption(value, t) : '';
      case 'coolantTemp':
      case 'ambientTemp':
      case 'engineCT':
	  case 'lls1Temp':
	  case 'lls2Temp':
        return value != null ? formatTemperature(value) : '';
      case 'alarm':
        return formatAlarm(value, t);
      case 'odometer':
      case 'tripDistance':
		return value != null ? `${(value / 1000).toFixed(1)} km` : '';
      case 'distance':
      case 'totalDistance':
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
      case 'llc2FuelLevel': //датчик топлива 415Л
        return formatLlc2Fuel(value, volumeUnit, t);
      case 'grossCombVWeight': //вага тз
        return formatWeight(value, t);
	  case 'driverUniqueId':
	  case 'driverUniqueId2':
      case 'vin':
      case 'vehicleRnp':
        return formatAsciiHex(value);
	  case 'd1CDT':
  	  case 'd2CDT':
  	  case 'd1CBT':
	  case 'd2CBT':
	  case 'd1SAD':
	  case 'd2SAD':
	  case 'd1CmDT':
	  case 'd1DDT':
	  case 'd1WDT':
	  case 'd1TLDRP':
	  case 'd1TLWRP':
	  case 'd1MinDR':
	  case 'd1MinWR':
	  case 'd1DoNBR':
	  case 'd1RTUNBR':
	  case 'd1RCDT':
	  case 'd1RDTS':
	  case 'd1RDTW':
	  case 'd1OC1W':
	  case 'd1OC2W':
	  case 'd1OC3W':
	  case 'd1RTCBR':
	  case 'd1TLNDP':
	  case 'd1DoNDP':
	  case 'driversHoursPrewarnDelay':
	    return formatTachoMinutes(value);
      case 'd1Ainfo':
        return formatIo10538(value, t);
	  case 'adBLstat':
	    return formatAdBLstat(value, t);
	  case 'tachoPerformance':
		return formatTachoPerformance(value, t);
	  case 'diagnosticsSupported':
		return formatDiagnosticsSupported(value, t);
	  case 'cruiseControl':
		return formatCruiseControl(value, t);
	  case 'sleepMode':
		return formatSleepMode(value, t);
	  case 'dataMode':
		return formatDataMode(value, t);
	  case 'gsmSignal':
		return value != null ? `${value}/5` : '';
	  case 'tachoDataSource':
		return formatTachoDataSource(value, t);
	  case 'klinePrivacy':
		return formatKlinePrivacy(value, t);
	  case 'outOfScope':
		return formatOutOfScope(value, t);
	  case 'card1Issuer':
		return value != null ? String(value) : '';
	  case 'driver1TimeState':
	  case 'driver2TimeState':
		return formatDriverTimeState(value, t);
	  case 'driver1CardPresence':
	  case 'driver2CardPresence':
		return formatDriverCardPresence(value, t);
	  case 'driver1WorkState':
	  case 'driver2WorkState':
		return formatDriverWorkState(value, t);
	  case 'tachoOverSpeed':
		return formatTachoOverSpeed(value, t);
	  case 'driveRecognize':
		return formatDriveRecognize(value, t);



      default:
        if (typeof value === 'number') {
          return formatNumber(value);
        } if (typeof value === 'boolean') {
          return formatBoolean(value, t);
        }
        return value || '';
    }
	} catch (e) {
		console.error('PositionValue error', key, value, e);
		return '';
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
    default:
      return formatValue(value);
  }
};

export default PositionValue;
