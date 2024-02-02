import { CustomError, CustomErrorType } from '../../../../utils'
import { CPFVO } from './CPF'

describe('CPF', () => {
  let CPF

  afterEach(() => {
    CPF = null
  })

  it('deveCriarCPF', () => {
    CPF = new CPFVO('08389960001')
    expect(CPF.valor).toBe('08389960001')
  })

  it('deveFalharCriarCPF_vazio', () => {
    expect(() => {
      CPF = new CPFVO('')
    }).toThrow(new CustomError(CustomErrorType.InvalidInput, 'CPF inválido'))
  })

  it('deveFalharCriarCPF_10Digitos', () => {
    expect(() => {
      CPF = new CPFVO('0838996000')
    }).toThrow(new CustomError(CustomErrorType.InvalidInput, 'CPF inválido'))
  })

  it('deveFalharCriarCPF_12Digitos', () => {
    expect(() => {
      CPF = new CPFVO('083899600010')
    }).toThrow(new CustomError(CustomErrorType.InvalidInput, 'CPF inválido'))
  })

  it('deveFalharCriarCPF_CPFInvalidoResto', () => {
    expect(() => {
      CPF = new CPFVO('12345678900')
    }).toThrow(new CustomError(CustomErrorType.InvalidInput, 'CPF inválido'))
  })

  it('deveFalharCriarCPF_CPFInvalidoDigitoVerificador', () => {
    expect(() => {
      CPF = new CPFVO('12345678910')
    }).toThrow(new CustomError(CustomErrorType.InvalidInput, 'CPF inválido'))
  })
})
