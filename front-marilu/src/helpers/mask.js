
import { _REGEX_VALID_EMAIL, _REGEX_VALID_FULLNAME, _REGEX_VALID_NUMBERS } from "./constants"

export const maskEmail = (text) => {
    return text.replace(new RegExp('.{' + (text.split('@')[0].length - 2) + '}@', 'g'), '***@')
}

export const formatCpf = (cpf) => {
    return cpf
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
}

export const formatCep = (cpf) => {
    return cpf
        .replace(/\D/g, '')
        .replace(/[^0-9]/g, "")
        .replace(/(\d{5})(\d{3})/, '$1-$2')
}

export const formatPercentage = (percentage) => {
    return percentage
        .replace(/\D/g, "")
        .replace(/(\d+)(\d{2})/, "$1,$2 %")
}

export const cleanNumberMask = (value) => {
    if (value !== undefined)
        return value.replace(_REGEX_VALID_NUMBERS, "")
    else return ''
}

export const formatPhone = (phoneNumber) => {
    return phoneNumber
        .replace(/\D/g, '')
        .replace(/^(\d{2})\B/, '($1) ')
        .replace(/(\d{1})?(\d{4})(\d{4})/, '$1$2-$3')
}

export const formatDate = (birthday) => {
    return birthday
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3')
}

export const formatHour = (hour) => {
    return hour.replace(/(\d{2})(\d{2})/, '$1:$2')
}

export const formatUsername = (value) => {
    if (value !== undefined)
        return value.replace(/[^0-9a-z]/g, "")
    else return ''
}

export const cleanNumberMaks = (value) => {
    return value.replace(/[^0-9]/g, "")
}

export const formatCrm = (value) => {
    return value.replace(/(\d{6})(\d{2})/, '$1/$2')
}

export const onlyNumbers = (value) => {
    return value.replace(/[^0-9]/g, "")
}

export const onlyLetters = (value) => {
    return value.replace(/[^a-zA-Zà-úÀ-Ú\s]/g, "")
}

export const isEmailValid = (value) => {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(value);
}

export const isDateValid = (value) => {
    const regex = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;
    return regex.test(value);
}

export const isPhoneValid = (value) => {
    const regex = /^(?:\(?([1-9][0-8])\)?\s?)(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/
    return regex.test(value);
}