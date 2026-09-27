export const GEOGRAPHY_CATEGORY = 'geography' as const

export type {
  GeographyContinent,
  GeographyCountry,
  GeographyRecognition,
} from './types'

export {
  EUROPE_COUNTRY_COUNT,
  europeCountries,
  type EuropeCountry,
} from './europe'
