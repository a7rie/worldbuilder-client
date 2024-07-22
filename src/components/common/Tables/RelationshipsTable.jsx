import Table from "react-bootstrap/Table"

export default function RelationshipsTable({ relationships }) {
  return (
    <Table striped bordered hover className="table-sm">
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {relationships.map((relationship, index) => (
          <tr key={index}>
            <td>{relationship.char_name}</td>
            <td>{relationship.relationship_type}</td>
            <td>{relationship.relationship_description}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}