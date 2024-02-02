import { CustomError } from '../../../../../utils'
import { CPF } from './../CPF'

describe('Testa o objeto de valor CPF', () => {
  let cpf

  afterEach(() => {
    cpf = null
  })

  it('O CPF 00000000000 deve retornar 000.000.000-00', () => {
    cpf = new CPF('00000000000')
    expect(cpf.formataCPF()).toBe('000.000.000-00')
  })

  it('O CPF nulo deve retornar erro', () => {
    try {
      // @ts-expect-error
      cpf = new CPF()
    } catch (err) {
      expect(err).toBeInstanceOf(CustomError)
    }
  })

  it('O CPF de tamanho 0 (inválido) deve retornar erro', () => {
    try {
      cpf = new CPF('')
    } catch (err) {
      expect(err).toBeInstanceOf(CustomError)
    }
  })

  it('O CPF de tamanho 10 (inválido) deve retornar erro', () => {
    try {
      cpf = new CPF('0000000000')
    } catch (err) {
      expect(err).toBeInstanceOf(CustomError)
    }
  })

  it('O CPF de tamanho 12 (inválido) deve retornar erro', () => {
    try {
      cpf = new CPF('000000000000')
    } catch (err) {
      expect(err).toBeInstanceOf(CustomError)
    }
  })
})
