import React from 'react'
import currecyFormater from 'currency-formatter'

function EntryTable(props){
    const rows = props.list.map(entry =>
        {   
            return(
                <tr key={entry.id}>
                    <td>{entry.description}</td>
                    <td>{currecyFormater.format(entry.value, {locale: 'pt-BR'})}</td>
                    <td>{entry.year}</td>
                    <td>{entry.mounth}</td>
                    <td>{entry.entryType}</td>
                    <td>{entry.entryStatus}</td>
                    <td>{entry.user.name}</td>
                    <td></td>
                </tr>
            )
        })
    return(
        <table className="table table-hover">
            <thead>
                <tr className="table-active">
                <th scope="col">Descrição</th>
                <th scope="col">Valor</th>
                <th scope="col">Ano</th>
                <th scope="col">Mês</th>
                <th scope="col">Tipo</th>
                <th scope="col">Situação</th>
                <th scope="col">Usuário</th>
                <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}

export default EntryTable