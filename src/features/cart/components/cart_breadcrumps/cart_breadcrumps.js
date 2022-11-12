import React from 'react'
import { useTranslation } from 'react-i18next'
import BreadCrumbs from '../../../profile/components/breadCrumbs/breadCrumbs'

function CartBreadCrumps() {
  const {t} = useTranslation();
  return (
    <BreadCrumbs name={t('cart')}/>
  )
}

export default CartBreadCrumps