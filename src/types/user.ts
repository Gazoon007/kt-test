export interface Name {
  title: string
  first: string
  last: string
}

export interface Street {
  number: number
  name: string
}

export interface Coordinates {
  latitude: string
  longitude: string
}

export interface Timezone {
  offset: string
  description: string
}

export interface Location {
  street: Street
  city: string
  state: string
  country: string
  postcode: string | number
  coordinates: Coordinates
  timezone: Timezone
}

export interface Login {
  uuid: string
  username: string
  password: string
  salt: string
  md5: string
  sha1: string
  sha256: string
}

export interface DateInfo {
  date: string
  age: number
}

export interface ID {
  name: string
  value: string | null
}

export interface Picture {
  large: string
  medium: string
  thumbnail: string
}

export interface User {
  gender: string
  name: Name
  location: Location
  email: string
  login: Login
  dob: DateInfo
  registered: DateInfo
  phone: string
  cell: string
  id: ID
  picture: Picture
  nat: string
}

export interface ApiResponse {
  results: User[]
  info: {
    seed: string
    results: number
    page: number
    version: string
  }
}
