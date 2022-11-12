import React from 'react'
import { useTranslation } from 'react-i18next'
import BreadCrumbs from '../../../profile/components/breadCrumbs/breadCrumbs'

function OrderBreadCrumbs() {
  const {t} = useTranslation();
  return (
    <BreadCrumbs name={t('Orders')} />
  )
}

export default OrderBreadCrumbs