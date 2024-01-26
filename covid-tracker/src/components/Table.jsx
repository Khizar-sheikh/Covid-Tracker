import "./Table.css";


/*eslint-disable */
function Table({ countries }) {
    return (
        <div>
            <div className="table">
                {countries.map((country, index) => (
                    <tr key={index}>
                        <td key={country.country}>{country.country}</td>
                        <td key={country.cases}>
                            <strong>{country.cases}</strong>
                        </td>
                    </tr>
                ))}
            </div>
        </div>
    )
}

export default Table
