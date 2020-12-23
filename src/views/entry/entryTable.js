import React from 'react'

function EntryTable(props){
    const rows = props.list.map(entry =>
        {   
            return(
                <tr key={entry.id}>
                    <td>{entry.description}</td>
                    <td>{entry.value}</td>
                    <td>{entry.entryType}</td>
                    <td>{entry.entryStatus}</td>
                    <td></td>
                </tr>
            )
        })
    return(
        <table className="table table-hover">
            <thead>
                <tr>
                <th scope="col">Descrição</th>
                <th scope="col">Valor</th>
                <th scope="col">Tipo</th>
                <th scope="col">Mês</th>
                <th scope="col">Situação</th>
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