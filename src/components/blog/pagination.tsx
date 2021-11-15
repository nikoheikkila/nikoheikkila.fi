import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "gatsby";
import React, { FunctionComponent } from "react";
import * as styles from "./pagination.module.scss";

interface PaginationProps {
    readonly currentPage: number;
    readonly numberOfPages: number;
}

const Pagination: FunctionComponent<PaginationProps> = ({
    currentPage,
    numberOfPages,
}) => {
    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === numberOfPages;
    const previousPage = currentPage - 1 === 1 ? "/" : `/${currentPage - 1}`;
    const nextPage = `/${currentPage + 1}`;

    return (
        <ul className={styles.pagination}>
            {!isFirstPage && (
                <li>
                    <Link to={previousPage} rel="prev">
                        <FontAwesomeIcon
                            icon={faArrowLeft}
                            className={styles.previous}
                        />
                        Previous Page ({currentPage - 1}/{numberOfPages})
                    </Link>
                </li>
            )}
            {!isLastPage && (
                <li>
                    <Link to={nextPage} rel="next">
                        Next Page ({currentPage + 1}/{numberOfPages})
                        <FontAwesomeIcon
                            icon={faArrowRight}
                            className={styles.next}
                        />
                    </Link>
                </li>
            )}
        </ul>
    );
};

export default Pagination;
