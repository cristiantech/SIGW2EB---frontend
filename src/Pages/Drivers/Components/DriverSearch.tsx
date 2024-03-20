export const DriverSearch = ({driverSearch, setDriverSearch}) => {
  return (
    <input
      className="form-control"
      type="text"
      name="txt_search"
      id="txt_search"
      onChange={(e) => setDriverSearch(e.target.value.toLowerCase())}
      value={driverSearch}
    />
  )
}
