import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { describe, it, expect, beforeEach } from 'vitest'
import { FetchPetsAvailableUseCase } from './fetch-pets-available'

let petsRepository: InMemoryPetsRepository
let sut: FetchPetsAvailableUseCase

describe('Fetch Pets Available Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new FetchPetsAvailableUseCase(petsRepository)
  })

  it('should be to fetch available pets in city', async () => {
    petsRepository.create({
      name: 'Pet 1',
      genrer: 'MALE',
      species: 'Dog',
      age: 1,
      portage: 'SMALL',
      city: 'City 1',
    })
    petsRepository.create({
      name: 'Pet 2',
      genrer: 'MALE',
      species: 'Dog',
      age: 1,
      portage: 'SMALL',
      city: 'City 1',
    })
    petsRepository.create({
      name: 'Pet 2',
      genrer: 'MALE',
      species: 'Dog',
      age: 1,
      portage: 'SMALL',
      city: 'City 2',
    })

    const { pets } = await sut.execute({
      city: 'City 1',
    })

    expect(pets).toHaveLength(2)
    expect(pets[0].name).toEqual('Pet 1')
    expect(pets[1].name).toEqual('Pet 2')
  })
})
