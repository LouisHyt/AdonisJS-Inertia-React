import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, beforeCreate, column, computed } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { randomUUID } from 'node:crypto'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['username'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @beforeCreate()
  static assignUuid(user: User) {
    user.uuid = randomUUID()
  }

  @column({ isPrimary: true })
  declare uuid: string

  @column()
  declare username: string

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @computed()
  public get avatarUrl() {
    const eyesVariant = 'variant2W10,variant3W10,variant4W10,variant5W14,variant9W10'
    const mouthVariant = 'variant1,variant2,variant3'
    const shapeColors = '0a5b83,1c799f,69d2e7'
    const backgroundColors = 'b6e3f4,c0aede,d1d4f9,ffd5dc'
    return `https://api.dicebear.com/9.x/thumbs/svg?seed=${this.uuid}&scale=100&size=80&backgroundColor=${backgroundColors}&eyes=${eyesVariant}&mouth=${mouthVariant}&shapeColor=${shapeColors}`
  }
}
