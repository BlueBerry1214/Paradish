import styles from "../styles/Table-styles.module.css";
import Image from "next/image";
import { ChangeEvent, FC, useState } from "react";
import StatusButton from "./StatusButton";
import { useRouter } from "next/router";

interface TableProps {
  tableHeadings?: string[];
  tableData?: string[][];
  routes?: string[];
}

const Table: FC<TableProps> = ({ tableHeadings, tableData, routes }) => {
  const router = useRouter();

  const [searchText, setSearchText] = useState("");

  const changeSearchText = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value.trim());
  };

  const handleClear = () => {
    setSearchText("");
  };

  return (
    <div className={styles.tableContainer}>
      <div className={styles.searchContainer}>
        <div className={styles.searchImg}>
          <Image src="/assets/search.png" alt="search" layout="fill" />
        </div>
        <input
          className={styles.search}
          placeholder="Search"
          type="text"
          value={searchText}
          onChange={changeSearchText}
        />
        {searchText && (
          <div className={styles.btnContainer}>
            <Image src="/assets/close.png" alt="close" layout="fill" />
          </div>
        )}
      </div>
      <div className={styles.major}>
        <table className={styles.table}>
          <thead>
            {tableHeadings?.map((heading, ind) => (
              <th key={heading + ind} className={styles.th}>
                {heading}
              </th>
            ))}
          </thead>
          <tbody>
            {tableData?.map(
              (row, ind) =>
                (searchText === "" ||
                  row.find((val) =>
                    val.toLowerCase().startsWith(searchText.toLowerCase())
                  )) &&
                routes &&
                routes.length > 0 && (
                  <tr
                    className={styles.tr}
                    key={row[0] + ind}
                    onClick={() => router.push(routes[ind])}
                  >
                    {row.map((cell) => (
                      <td key={cell} className={styles.td}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                )
            )}

            {tableData?.map(
              (row, ind) =>
                (searchText === "" ||
                  row.find((val) =>
                    val.toLowerCase().startsWith(searchText.toLowerCase())
                  )) &&
                (!routes || routes.length === 0) && (
                  <tr className={styles.tr} key={row[0] + ind}>
                    {row.map((cell) => (
                      <td key={cell} className={styles.td}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
