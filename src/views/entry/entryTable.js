import React from 'react'
import currecyFormater from 'currency-formatter'
import {MdModeEdit} from 'react-icons/md'
import {AiTwotoneDelete} from 'react-icons/ai'

function EntryTable(props){
    const rows = props.list.map(entry =>
        {   
            return(
                <tr key={entry.id} >
                    <td className="table-border"  >{entry.description}</td>
                    <td className="table-border" >{currecyFormater.format(entry.value, {locale: 'pt-BR'})}</td>
                    <td className="table-border" >{entry.year}</td>
                    <td className="table-border" >{entry.mounth}</td>
                    <td className="table-border" >{entry.entryType}</td>
                    <td className="table-border" >{entry.entryStatus}</td>
                    <td className="table-border" >{entry.user.name}</td>
                    <td className="table-border" >
                        <button className="btn btn-primary"><MdModeEdit /></button>
                        <button className="btn btn-danger right-button"><AiTwotoneDelete /></button>
                    </td>
                </tr>
            )
        })
    return(
        <table className="table table-hover">
            <thead>
                <tr className="table-active">
                <th className = "table-border" scope="col">Descrição</th>
                <th className = "table-border" scope="col">Valor</th>
                <th className = "table-border" scope="col">Ano</th>
                <th className = "table-border" scope="col">Mês</th>
                <th className = "table-border" scope="col">Tipo</th>
                <th className = "table-border" scope="col">Situação</th>
                <th className = "table-border" scope="col">Usuário</th>
                <th className = "table-border" scope="col">Ações</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}

export default EntryTable