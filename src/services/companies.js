import { public_instance } from "../network/instance";
const url = '/companies';

export async function getAllCompanies(){
    try{
        const companies =await public_instance.get(url);
        return companies.data;
    }catch(err){
        throw new Error(`can't get all companies , ${err}`)
    }
}

export async function getOneCompany(id){
    try{
        const company = await public_instance.get(`${url}/${id}`)
        return company.data;
    }catch(err){
        throw new Error(`can't get company , ${err}`)
    }
}

export async function addcompany(data){
    try{
        await public_instance.post(url,data)
    }catch(err){
        throw new Error(`can't post company , ${err}`)
    }
}

export async function updatecompany(id,data){
    try{
        await public_instance.put(`${url}/${id}` , data);
    }catch(err){
        throw new Error(`can't update company , ${err}`)
    }

}

export async function removecompany(id){
    try{
        await public_instance.delete(`${url}/${id}`);
    }catch(err){
        throw new Error(`can't remove company , ${err}`)
    }
}