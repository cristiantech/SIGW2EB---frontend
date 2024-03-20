export const PackageSearch = ({packageSearch, setPackageSearch}) => {
  return (
    <input
      className="form-control"
      type="text"
      name="txt_search"
      id="txt_search"
      onChange={(e) => setPackageSearch(e.target.value.toLowerCase())}
      value={packageSearch}
    />
  )
}
