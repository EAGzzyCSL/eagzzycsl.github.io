/* eslint-disable max-classes-per-file */

import Logger from '@/utils/logger'

class StorageManager<
  StringKey extends string,
  BooleanKey extends string,
  NumberKey extends string,
> {
  private storage: Storage

  constructor(storage: Storage) {
    this.storage = storage
  }

  getStringItem(key: StringKey): string {
    return this.storage.getItem(key) || ''
  }

  setStringItem(key: StringKey, value: string): void {
    return this.storage.setItem(key, value)
  }

  getBooleanItem(key: BooleanKey): boolean {
    return this.storage.getItem(key) === 'true'
  }

  setBooleanItem(key: BooleanKey, value: true | false): void {
    this.storage.setItem(key, `${value}`)
  }

  getNumberItem(key: NumberKey): number {
    return Number(this.storage.getItem(key))
  }

  setNumberItem(key: NumberKey, value: number): void {
    this.storage.setItem(key, `${value}`)
  }
}

class StubStorage implements Storage {
  private logger: typeof Logger

  private tag: string

  private logCall(...content: unknown[]): void {
    this.logger.storage.log(this.tag, ...content)
  }

  constructor(logger: typeof Logger, tag: string) {
    this.logger = logger
    this.tag = tag
  }

  length = 0

  clear(): void {
    this.logCall('clear')
  }

  getItem(key: string): string | null {
    this.logCall('getItem', key)
    return null
  }

  key(index: number): string | null {
    this.logCall('key', index)
    return null
  }

  removeItem(key: string): void {
    this.logCall('removeItem', key)
  }

  setItem(key: string, value: string): void {
    this.logCall('setItem', key, value)
  }
}

type TLocalStorageStringKey = ''
type TLocalStorageBooleanKey = 'hasShowWelcomeNotification'
type TLocalStorageNumberKey = ''

export const localStorageManager = new StorageManager<
  TLocalStorageStringKey,
  TLocalStorageBooleanKey,
  TLocalStorageNumberKey
>(
  typeof window === 'undefined'
    ? new StubStorage(Logger, 'localStorage')
    : localStorage,
)

type TSessionStorageStringKey = ''
type TSessionStorageBooleanKey = ''
type TSessionStorageNumberKey = ''

export const sessionStorageManager = new StorageManager<
  TSessionStorageStringKey,
  TSessionStorageBooleanKey,
  TSessionStorageNumberKey
>(
  typeof window === 'undefined'
    ? new StubStorage(Logger, 'sessionStorage')
    : localStorage,
)
