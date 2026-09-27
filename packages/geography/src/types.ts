export type GeographyContinent = 'Europe' | 'Asia' | 'Africa' | 'North America' | 'South America' | 'Oceania'

export type GeographyRecognition = 'un-member' | 'un-observer' | 'partial'

export interface GeographyCountry {
  /** ISO 3166-1 alpha-2 where available. Kosovo uses XK as a practical app code. */
  code: string
  slug: string
  name: string
  capital: string
  capitalAliases?: readonly string[]
  aliases?: readonly string[]
  continent: GeographyContinent
  region: string
  flagCode: string
  recognition: GeographyRecognition
  transcontinental?: boolean
  note?: string
}
