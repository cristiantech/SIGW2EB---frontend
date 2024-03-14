export const Usersearch = ({usersSearch, setUsersSearch}) => {
  return (
    <input
      className="form-control"
      type="text"
      name="txt_search"
      id="txt_search"
      onChange={(e) => setUsersSearch(e.target.value.toLowerCase())}
      value={usersSearch}
    />
  )
}
