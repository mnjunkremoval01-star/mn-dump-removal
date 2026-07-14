export interface ServiceArea {
  city: string;
  state: "MN";
}

/**
 * Initial service area list — confirmed as a starting set. Expand this
 * array as coverage is confirmed; nothing else in the app needs to change.
 */
export const serviceAreas: ServiceArea[] = [
  { city: "Burnsville", state: "MN" },
  { city: "Apple Valley", state: "MN" },
  { city: "Eagan", state: "MN" },
  { city: "Lakeville", state: "MN" },
  { city: "Savage", state: "MN" },
  { city: "Prior Lake", state: "MN" },
  { city: "Bloomington", state: "MN" },
  { city: "Rosemount", state: "MN" },
];

export const serviceAreaCityNames = serviceAreas.map((area) => area.city);
