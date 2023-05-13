import React from "react";

const Pagination = ({
  totalPosts, //總資料數
  postsPerPage, //每頁顯示數
  setCurrentPage, //更改頁面變數
  currentPage, //當前頁面
}) => {
  let pages = [];
  //總資料數/每頁顯示數 math.ceil餘數無條件進位
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }

  return (
    <div>
      <nav>
        <ul className="pagination">
          {pages.map((page) => (
            <li
              onClick={() => setCurrentPage(page)}
              key={page}
              className="page-link"
              style={{ backgroundColor: page == currentPage ? "orange" : "" }}
            >
              {page}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
