import { describe, expect, it } from "vitest";
import { Appointment } from "../entities/appointment";
import { CreateAppointment } from "./create-appointment";

import { getFutureDate } from '../tests/utils/get-future-date'
import { InMemoryAppointmentsRepository } from "../repositories/in-memory/in-memory-repositories";


describe('Create Appointment', () => {

    it('should be able to create an appointment', () => {

        const startAt = getFutureDate('2022-08-10')
        const endsAt = getFutureDate('2022-08-11')

        const appointmentsRepository = new InMemoryAppointmentsRepository()

        const createAppointment = new CreateAppointment(appointmentsRepository)

        expect(createAppointment.execute({
            patient: 'Jhon doe',
            startAt,
            endsAt
        })).resolves.toBeInstanceOf(Appointment)

    })


    it('should not be able to create an appointment', async () => {

        const startAt = getFutureDate('2022-08-10')
        const endsAt = getFutureDate('2022-08-15')

        const appointmentsRepository = new InMemoryAppointmentsRepository()

        const createAppointment = new CreateAppointment(appointmentsRepository)

        await createAppointment.execute({
            patient: 'Jhon doe',
            startAt,
            endsAt
        })

        expect(createAppointment.execute({
            patient: 'Jhon doe',
            startAt: getFutureDate('2022-08-14'),
            endsAt: getFutureDate('2022-08-18'),

        })).rejects.toBeInstanceOf(Error)

        expect(createAppointment.execute({
            patient: 'Jhon doe',
            startAt: getFutureDate('2022-08-08'),
            endsAt: getFutureDate('2022-08-12'),

        })).rejects.toBeInstanceOf(Error)

        expect(createAppointment.execute({
            patient: 'Jhon doe',
            startAt: getFutureDate('2022-08-08'),
            endsAt: getFutureDate('2022-08-17'),

        })).rejects.toBeInstanceOf(Error)

        expect(createAppointment.execute({
            patient: 'Jhon doe',
            startAt: getFutureDate('2022-08-11'),
            endsAt: getFutureDate('2022-08-12'),

        })).rejects.toBeInstanceOf(Error)



    })



})