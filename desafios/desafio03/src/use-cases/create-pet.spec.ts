import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { describe, it, expect, beforeEach } from 'vitest'
import { CreatePetUseCase } from './create-pet'

let petsRepository: InMemoryPetsRepository
let sut: CreatePetUseCase

describe('Create Pet Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new CreatePetUseCase(petsRepository)
  })

  it('should be to create a pet', async () => {
    const { pet } = await sut.execute({
      name: 'Pet 1',
      genrer: 'MALE',
      species: 'Dog',
      age: 1,
      portage: 'SMALL',
      city: 'City 1',
      description: '',
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})
