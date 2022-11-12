import React , {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import StatisticCard from '../../../../components/statistic_card/statistic_card'
import { getOrdersOneUser } from '../../../../services/orders';

function DashboardProfile({numOfOrders}) {
  return (
    <div className='row justify-content-between'>
        <div className='col-md-5 col-12'>
            <StatisticCard flag={'ordered_items'} header={'ordered items'} info={numOfOrders}/>
        </div>
        <div className='col-md-5 col-12'>
            <StatisticCard flag={'most_ordered_item'} header={'most ordered'} info={'none'}/>
        </div>
    </div>
  )
}

export default DashboardProfile