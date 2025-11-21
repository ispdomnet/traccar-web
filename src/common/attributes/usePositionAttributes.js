import { useMemo } from 'react';

export default (t) => useMemo(() => ({
  id: {
    name: t('deviceIdentifier'),
    type: 'number',
    property: true,
  },
  latitude: {
    name: t('positionLatitude'),
    type: 'number',
    property: true,
  },
  longitude: {
    name: t('positionLongitude'),
    type: 'number',
    property: true,
  },
  speed: {
    name: t('positionSpeed'),
    type: 'number',
    dataType: 'speed',
    property: true,
  },
  course: {
    name: t('positionCourse'),
    type: 'number',
    property: true,
  },
  altitude: {
    name: t('positionAltitude'),
    type: 'number',
    property: true,
  },
  accuracy: {
    name: t('positionAccuracy'),
    type: 'number',
    dataType: 'distance',
    property: true,
  },
  valid: {
    name: t('positionValid'),
    type: 'boolean',
    property: true,
  },
  protocol: {
    name: t('positionProtocol'),
    type: 'string',
    property: true,
  },
  address: {
    name: t('positionAddress'),
    type: 'string',
    property: true,
  },
  deviceTime: {
    name: t('positionDeviceTime'),
    type: 'string',
    property: true,
  },
  fixTime: {
    name: t('positionFixTime'),
    type: 'string',
    property: true,
  },
  serverTime: {
    name: t('positionServerTime'),
    type: 'string',
    property: true,
  },
  geofenceIds: {
    name: t('sharedGeofences'),
    property: true,
  },
  raw: {
    name: t('positionRaw'),
    type: 'string',
  },
  index: {
    name: t('positionIndex'),
    type: 'number',
  },
  hdop: {
    name: t('positionHdop'),
    type: 'number',
  },
  vdop: {
    name: t('positionVdop'),
    type: 'number',
  },
  pdop: {
    name: t('positionPdop'),
    type: 'number',
  },
  sat: {
    name: t('positionSat'),
    type: 'number',
  },
  satVisible: {
    name: t('positionSatVisible'),
    type: 'number',
  },
  rssi: {
    name: t('positionRssi'),
    type: 'number',
  },
  coolantTemp: {
    name: t('positionCoolantTemp'),
    type: 'number',
  },
  engineTemp: {
    name: t('positionEngineTemp'),
    type: 'number',
  },
  gps: {
    name: t('positionGps'),
    type: 'number',
  },
  roaming: {
    name: t('positionRoaming'),
    type: 'boolean',
  },
  event: {
    name: t('positionEvent'),
    type: 'string',
  },
  alarm: {
    name: t('positionAlarm'),
    type: 'string',
  },
  status: {
    name: t('positionStatus'),
    type: 'string',
  },
  odometer: {
    name: t('positionOdometer'),
    type: 'number',
    dataType: 'distance',
  },
  serviceOdometer: {
    name: t('positionServiceOdometer'),
    type: 'number',
    dataType: 'distance',
  },
  tripOdometer: {
    name: t('positionTripOdometer'),
    type: 'number',
    dataType: 'distance',
  },
  hours: {
    name: t('positionHours'),
    type: 'number',
    dataType: 'hours',
  },
  steps: {
    name: t('positionSteps'),
    type: 'number',
  },
  heartRate: {
    name: t('positionHeartRate'),
    type: 'number',
  },
  input: {
    name: t('positionInput'),
    type: 'number',
  },
  in1: {
    name: `${t('positionInput')} 1`,
    type: 'boolean',
  },
  in2: {
    name: `${t('positionInput')} 2`,
    type: 'boolean',
  },
  in3: {
    name: `${t('positionInput')} 3`,
    type: 'boolean',
  },
  in4: {
    name: `${t('positionInput')} 4`,
    type: 'boolean',
  },
  output: {
    name: t('positionOutput'),
    type: 'number',
  },
  out1: {
    name: `${t('positionOutput')} 1`,
    type: 'boolean',
  },
  out2: {
    name: `${t('positionOutput')} 2`,
    type: 'boolean',
  },
  out3: {
    name: `${t('positionOutput')} 3`,
    type: 'boolean',
  },
  out4: {
    name: `${t('positionOutput')} 4`,
    type: 'boolean',
  },
  power: {
    name: t('positionPower'),
    type: 'number',
    dataType: 'voltage',
  },
  battery: {
    name: t('positionBattery'),
    type: 'number',
    dataType: 'voltage',
  },
  batteryLevel: {
    name: t('positionBatteryLevel'),
    type: 'number',
    dataType: 'percentage',
  },
  fuel: {
    name: t('positionFuel'),
    type: 'number',
    dataType: 'percentage',
  },
  fuelUsed: {
    name: t('positionFuelUsed'),
    type: 'number',
  },
  fuelConsumption: {
    name: t('positionFuelConsumption'),
    type: 'number',
  },
  versionFw: {
    name: t('positionVersionFw'),
    type: 'string',
  },
  versionHw: {
    name: t('positionVersionHw'),
    type: 'string',
  },
  type: {
    name: t('sharedType'),
    type: 'string',
  },
  ignition: {
    name: t('positionIgnition'),
    type: 'boolean',
  },
  flags: {
    name: t('positionFlags'),
    type: 'string',
  },
  charge: {
    name: t('positionCharge'),
    type: 'boolean',
  },
  ip: {
    name: t('positionIp'),
    type: 'string',
  },
  archive: {
    name: t('positionArchive'),
    type: 'boolean',
  },
  distance: {
    name: t('positionDistance'),
    type: 'number',
    dataType: 'distance',
  },
  totalDistance: {
    name: t('deviceTotalDistance'),
    type: 'number',
    dataType: 'distance',
  },
  rpm: {
    name: t('positionRpm'),
    type: 'number',
  },
  vin: {
    name: t('positionVin'),
    type: 'string',
  },
  approximate: {
    name: t('positionApproximate'),
    type: 'boolean',
  },
  throttle: {
    name: t('positionThrottle'),
    type: 'number',
  },
  motion: {
    name: t('positionMotion'),
    type: 'boolean',
  },
  armed: {
    name: t('positionArmed'),
    type: 'boolean',
  },
  geofence: {
    name: t('sharedGeofence'),
    type: 'string',
  },
  acceleration: {
    name: t('positionAcceleration'),
    type: 'number',
  },
  humidity: {
    name: t('positionHumidity'),
    type: 'number',
  },
  deviceTemp: {
    name: t('positionDeviceTemp'),
    type: 'number',
  },
  temp1: {
    name: `${t('positionTemp')} 1`,
    type: 'number',
  },
  temp2: {
    name: `${t('positionTemp')} 2`,
    type: 'number',
  },
  temp3: {
    name: `${t('positionTemp')} 3`,
    type: 'number',
  },
  temp4: {
    name: `${t('positionTemp')} 4`,
    type: 'number',
  },
  operator: {
    name: t('positionOperator'),
    type: 'string',
  },
  command: {
    name: t('deviceCommand'),
    type: 'string',
  },
  blocked: {
    name: t('positionBlocked'),
    type: 'boolean',
  },
  lock: {
    name: t('alarmLock'),
    type: 'boolean',
  },
  dtcs: {
    name: t('positionDtcs'),
    type: 'string',
  },
  obdSpeed: {
    name: t('positionObdSpeed'),
    type: 'number',
    dataType: 'speed',
  },
  obdOdometer: {
    name: t('positionObdOdometer'),
    type: 'number',
    dataType: 'distance',
  },
  result: {
    name: t('eventCommandResult'),
    type: 'string',
  },
  driverUniqueId: {
    name: t('sharedDriver'),
    type: 'string',
  },
  card: {
    name: t('positionCard'),
    type: 'string',
  },
  drivingTime: {
    name: t('positionDrivingTime'),
    type: 'number',
    dataType: 'hours',
  },
  color: {
    name: t('attributeColor'),
    type: 'string',
  },
  image: {
    name: t('positionImage'),
    type: 'string',
  },
  video: {
    name: t('positionVideo'),
    type: 'string',
  },
  audio: {
    name: t('positionAudio'),
    type: 'string',
  },
  
  d1CDT: {
    name: t('ctD1CDT'),
    type: 'string',
  },
  d2CDT: {
    name: t('ctD2CDT'),
    type: 'string',
  },
  d1CBT: {
    name: t('ctD1CBT'),
    type: 'string',
  },
  d2CBT: {
    name: t('ctD2CBT'),
    type: 'string',
  },
  d1SAD: {
    name: t('ctD1SAD'),
    type: 'string',
  },
  d2SAD: {
    name: t('ctD2SAD'),
    type: 'string',
  },
  d1CumDT: {
    name: t('ctD1CumDT'),
    type: 'string',
  },
  d1DDT: {
    name: t('ctD1DDT'),
    type: 'string',
  },
  d1WDT: {
    name: t('ctD1WDT'),
    type: 'string',
  },
  d1TLDRP: {
    name: t('ctD1TLDRP'),
    type: 'string',
  },
  d1TLWRP: {
    name: t('ctD1TLWRP'),
    type: 'string',
  },
  d1MinDR: {
    name: t('ctD1MinDR'),
    type: 'string',
  },
  d1MinWR: {
    name: t('ctD1MinWR'),
    type: 'string',
  },
  d1DoNBR: {
    name: t('ctD1DoNBR'),
    type: 'string',
  },
  d1RTUNBR: {
    name: t('ctD1RTUNBR'),
    type: 'string',
  },
  d1RCDT: {
    name: t('ctD1RCDT'),
    type: 'string',
  },
  d1RDTS: {
    name: t('ctD1RDTS'),
    type: 'string',
  },
  d1RDTW: {
    name: t('ctD1RDTW'),
    type: 'string',
  },
  d1OC1W: {
    name: t('ctD1OC1W'),
    type: 'string',
  },
  d1OC2W: {
    name: t('ctD1OC2W'),
    type: 'string',
  },
  d1OC3W: {
    name: t('ctD1OC3W'),
    type: 'string',
  },
  d1RTCBR: {
    name: t('ctD1RTCBR'),
    type: 'string',
  },
  d1TLNDP: {
    name: t('ctD1TLNDP'),
    type: 'string',
  },
  d1DoNDP: {
    name: t('ctD1DoNDP'),
    type: 'string',
  },
  llcFuelTotal: {
    name: t('ctLlcFuelTotal'),
    type: 'string',
  },
  llc1FuelLevel: {
    name: t('ctLlc1FuelLevel'),
    type: 'string',
  },
  llc2FuelLevel: {
    name: t('ctLlc2FuelLevel'),
    type: 'string',
  },
  ambientTemp: {
    name: t('ctAmbientTemp'),
    type: 'string',
  },
  timestamp: {
    name: t('ctTimestamp'),
    type: 'string',
  },
  nextCalD: {
    name: t('ctNextCalD'),
    type: 'string',
  },
  d1EndLDrr: {
    name: t('ctD1EndLDrr'),
    type: 'string',
  },
  d1EndLWrp: {
    name: t('ctD1EndLWrp'),
    type: 'string',
  },
  d1EndFSlWp: {
    name: t('ctD1EndFSlWp'),
    type: 'string',
  },
  operatorName: {
    name: t('ctOperatorName'),
    type: 'string',
  },
  totalOdometer_io: {
    name: t('ctTotalOdometer_io'),
    type: 'number',
  },
  wheelBasedSpeed: {
    name: t('ctWheelBasedSpeed'),
    type: 'number',
  },
  fuelLevel: {
    name: t('ctFuelLevel'),
    type: 'number',
  },
  accelerationPedalPosition: {
    name: t('ctAccelerationPedalPosition'),
    type: 'number',
  },
  grossCombVWeight: {
    name: t('ctGrossCombinationVehicleWeight'),
    type: 'number',
  },
  vehicleRnp: {
    name: t('ctVehicleRnp'),
    type: 'string',
  },
  io10518: {
    name: t('ctDriver1Name'),
    type: 'string',
  },
  io10519: {
    name: t('ctDriver1SurName'),
    type: 'string',
  },
  io10520: {
    name: t('ctDriver2Name'),
    type: 'string',
  },
  io10521: {
    name: t('ctDriver2SurName'),
    type: 'string',
  },
}), [t]);
