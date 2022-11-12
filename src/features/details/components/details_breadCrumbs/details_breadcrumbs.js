import React from 'react'
import { useTranslation } from 'react-i18next'
import BreadCrumbs from '../../../profile/components/breadCrumbs/breadCrumbs'

function BreadCrumbsDetails() {
  const {t} = useTranslation();
  return (
    <BreadCrumbs name={t('details')}/>
  )
}

export default BreadCrumbsDetails