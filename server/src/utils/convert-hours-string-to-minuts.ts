/**
 * 
 * @param hourString Horas em String to minuts
 *  18:00 -> ["18", "00"] -> [18, 00]
 * 
 */

export function convertHoursStringToMinuts(hourString: string) {
  const [hours, minutes] = hourString.split(':').map(Number)

  const minutesAmount = (hours * 60) + minutes;

  return minutesAmount;
}