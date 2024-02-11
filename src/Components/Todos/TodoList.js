import { useEffect, useState } from "react";
import TodoServices from "../../Services/TodoServices";
import EditTodo from "./EditTodo";
import { RxHamburgerMenu } from "react-icons/rx";
import "../../Styles/Todo.css";
import Pagination from "../Pagination/Pagination";

export const TodoList = ({ name }) => {
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalEntries] = useState(5);
  const [totalData, setTotalData] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [editNote, setEditNote] = useState(null);
  const [editText, setEditText] = useState("");

  let startIndex = Math.min((currentPage - 1) * totalEntries + 1);
  let endIndex = Math.min(currentPage * totalEntries, totalData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await TodoServices.getAllNotes(
          currentPage,
          name,
          totalEntries,
          searchText
        );
        setTasks(response.data);
        setTotalPages(response.data.totalPages);
        setTotalData(response.data.totalCount);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currentPage, name, searchText]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const filteredTasks = tasks?.data?.filter((task) =>
    task.user.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleUpdate = async (id, data) => {
    try {
      const response = await TodoServices.IsEditNotes(id, data);
      setEditNote(null);
      setEditText("");
      window.location.reload();
    } catch (error) {
      console.error("Update Request Error:", error);
    }
  };

  return (
    <div className="">
      <div className="">
        <input
          type="text"
          placeholder="Search Your Note"
          value={searchText}
          onChange={handleSearchChange}
        />
      </div>
      <div className="">
        <table>
          <tbody>
            {filteredTasks?.map((task) => (
              <tr key={task._id} className="">
                {/* <td>
                  <RxHamburgerMenu />
                </td> */}

                <td>
                  <div className="todoListText">
                    {editNote === task._id ? (
                      <div className="searching-inputbox">
                        <input
                          type="text"
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          style={{
                            width: "250px",
                            height: "40px",
                            border: "3px solid red",
                          }}
                        />
                        <EditTodo task={task} handleUpdate={handleUpdate} />
                      </div>
                    ) : (
                      <div className="icons">
                        <p>{task.user}</p>
                        <div className="editTodo-lists">
                          <EditTodo task={task} handleUpdate={handleUpdate} />
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
        startIndex={startIndex}
        endIndex={endIndex}
        totalData={totalData}
      />
    </div>
  );
};
