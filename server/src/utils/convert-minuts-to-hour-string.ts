/**
 * 
 * @param hourString Horas em String to minuts
 *  1080 -> 18:00
 * 
 */

export function convertMinutsToHourString(minutesAmount: number){
  const hours = Math.floor(minutesAmount/60);
  const minutes = minutesAmount % 60;

  return `${String(hours).padStart(2, '0')}:${String(minutes).padEnd(2, '0')}`;
}