import React from 'react'
import { useTranslation } from 'react-i18next'
import BreadCrumbs from '../../../profile/components/breadCrumbs/breadCrumbs'
function CheckOutBreadCrumps() {
  const {t} = useTranslation();
  return (
    <BreadCrumbs name={t('Your_reciept')}/>
  )
}

export default CheckOutBreadCrumps