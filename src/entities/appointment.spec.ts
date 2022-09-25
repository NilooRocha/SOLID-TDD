import { expect, test } from 'vitest'
import { Appointment } from './appointment'

import { getFutureDate } from '../tests/utils/get-future-date'

test('create an appointment', () => {

    const startAt = getFutureDate('2022-08-10')
    const endsAt = getFutureDate('2022-08-11')

    const appointment = new Appointment({
        patient: 'John Doe',
        endsAt,
        startAt
    })

    expect(appointment).toBeInstanceOf(Appointment)
    expect(appointment.patient).toEqual('John Doe')
})


test('cannot create an appointment with end date before start date', () => {

    const startAt = getFutureDate('2022-08-10')
    const endsAt = getFutureDate('2022-08-09')


    expect(() => new Appointment({
        patient: 'John Doe',
        endsAt,
        startAt
    })).toThrow()

})


test('can not create an appointment with start date before now', () => {

    const startAt = new Date()
    const endsAt = new Date()

    startAt.setDate(startAt.getDate() - 1)
    endsAt.setDate(endsAt.getDate() + 3)


    expect(() => new Appointment({
        patient: 'John Doe',
        endsAt,
        startAt
    })).toThrow()

})