import React, { useEffect, useState } from 'react'
import EntitiesTable from '../../../../components/entities_table/entities_table';
import { getAllCompanies } from '../../../../services/companies';
import styles from './show_companies.module.css'
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Toast from '../../../../components/toast/toast';

function ShowCompanies() {
    const {t} = useTranslation();
    const [cols, setCols] = useState([]);
    const [removed , setRemoved] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [companies, setCompanies] = useState([]);
    const [flag, setFlag] = useState('companies');
    const changeCols = () => {
        if (windowWidth >= 720) {
            setCols([
                {
                    name: 'id',
                    col_md: 1,
                    col_sm: 1,
                    col_xs: 1,

                },
                {
                    name: 'name_en',
                    col_md: 2,
                    col_sm: 2,
                    col_xs: 2,

                },
                {
                    name: 'name_ar',
                    col_md: 2,
                    col_sm: 2,
                    col_xs: 2,

                },
                {
                    name: 'img',
                    col_md: 1,
                    col_sm: 1,
                    col_xs: 1,

                },
                {
                    name: 'logo',
                    col_md: 1,
                    col_sm: 1,
                    col_xs: 1,

                },
                {
                    name: 'address',
                    col_md: 3,
                    col_sm: 3,
                    col_xs: 3,

                },
                {
                    name: 'edit',
                    col_md: 1,
                    col_sm: 1,
                    col_xs: 1,

                },
                {
                    name: 'delete',
                    col_md: 1,
                    col_sm: 1,
                    col_xs: 1,

                }
            ]);
        }
        else {
            setCols([
                {
                    name: 'id',
                    col_md: 1,
                    col_sm: 2,
                    col_xs: 2,

                },
                {
                    name: 'name_en',
                    col_md: 2,
                    col_sm: 3,
                    col_xs: 3,

                },
                {
                    name: 'logo',
                    col_md: 1,
                    col_sm: 3,
                    col_xs: 3,

                },
                {
                    name: 'edit',
                    col_md: 1,
                    col_sm: 2,
                    col_xs: 2,

                },
                {
                    name: 'delete',
                    col_md: 1,
                    col_sm: 2,
                    col_xs: 2,

                }
            ])
        }
    }
    const getData = async () => {
        try {
            const _companies = await getAllCompanies();
            setCompanies(_companies)
        } catch (err) {
            console.log(err);
        }
    }
    const changeWindowWidth = () => {
        setWindowWidth(window.innerWidth);
    }
    useEffect(() => {
        getData();
        window.addEventListener('resize', changeWindowWidth);
        return () => window.removeEventListener('resize', changeWindowWidth);
    }, [])
    const removedCompany = (isRemoved)=>{
        if(isRemoved) setRemoved(isRemoved);
        setTimeout(()=>{
            setRemoved(false);
        },3000)
    }
    useEffect(() => {
        changeCols();
    }, [windowWidth])
    return (
        <section className={`container-fluid ${styles.company_page}`}>
            <div className='row justify-content-center'>
                <div className={`${styles.pageSec}`}>
                    <EntitiesTable columns={cols} obs={companies} flag={flag} deletedOrNot = {removedCompany}/>
                </div>
                <div className='my-4 col-md-6 text-center'>
                    <Link className='add_entity_btn' to={'add'}>
                        <i className="bi bi-plus"></i>
                        <span>{t("add_a_company")}</span>
                    </Link>
                </div>
            </div>
            {removed ?<div className={styles.toast_wrap}>
                <Toast messege={'deleted successfully'}/>
            </div> : null}
        </section>
    )
}

export default ShowCompanies