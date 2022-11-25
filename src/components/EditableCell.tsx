interface EditableCellProps {
  data: string | number;
}

function EditableCell ({data}: EditableCellProps) {
  return (
    <input type="text" value={data} />
  )
}

export default EditableCell;