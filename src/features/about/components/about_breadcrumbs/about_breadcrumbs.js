import React from 'react'
import { useTranslation } from 'react-i18next'
import BreadCrumbs from '../../../profile/components/breadCrumbs/breadCrumbs'

function AboutBreadCrumbs() {
  const {t} = useTranslation()
  return (
    <BreadCrumbs name={t('about')}/>
  )
}

export default AboutBreadCrumbs